import _ from "lodash";
import {
  login as kakaoLogin,
  logout as kakaoLogout,
  getProfile as getKakaoProfile
} from "@react-native-seoul/kakao-login";
import { flow, types } from "mobx-state-tree";
import appleAuth from "@invertase/react-native-apple-authentication";

import { storage } from "src/configs/storage";
import { login, signup as apiSignup } from "src/apis/users";
import { uniqueID } from "src/configs/device";
import User from "src/stores/model/User";
import { LoginResponse } from "__generate__/api";

export type AUTH_PROVIDER = "APPLE" | "KAKAO" | "NONE";

const AuthStore = types
  .model("AuthStore", {
    provider: types.frozen<AUTH_PROVIDER>("NONE"),
    accessId: types.optional(types.string, ""),
    accessToken: types.optional(types.string, ""),
    refreshToken: types.optional(types.string, ""),
    user: types.optional(types.maybeNull(User), null)
  })
  .views(self => {
    return {
      get isGuest() {
        return self.provider === "NONE";
      },
      get socialType() {
        const byType: Record<AUTH_PROVIDER, string> = {
          APPLE: "애플 연동됨",
          KAKAO: "카카오 연동됨",
          NONE: ""
        };
        return byType[self.provider];
      }
    };
  })
  .actions(self => {
    const clear = () => {
      self.provider = "NONE";
      self.accessId = "";
      self.accessToken = "";
      self.refreshToken = "";
      self.user = null;
    };

    const clearIfProviderExpiredToken = flow(function*() {
      switch (self.provider) {
        case "KAKAO":
          return;
      }
    });

    const makeUserIfProviderExists = () => {
      self.user = User.create({
        accessId: self.accessId,
        nickname: ""
      });
    };

    const initialize = flow(function*() {
      const {
        provider,
        accessId,
        accessToken,
        refreshToken
      } = yield storage().getToken();

      self.provider = provider;
      self.accessId = accessId;
      self.accessToken = accessToken;
      self.refreshToken = refreshToken;
      yield clearIfProviderExpiredToken();
      if (self.provider === "NONE") {
        return;
      }
      makeUserIfProviderExists();
      try {
        yield signIn();
      } catch (error) {
        // NOTHING
        clear();
      }
    });

    const kakaoSignIn = flow(function*() {
      try {
        const tokenResponse: RetrieveAsyncFunc<typeof kakaoLogin> = yield kakaoLogin();
        const profileResponse: RetrieveAsyncFunc<typeof getKakaoProfile> = yield getKakaoProfile();

        self.accessId = profileResponse.id;
        self.accessToken = tokenResponse.accessToken;
        self.provider = "KAKAO";
        self.user = User.create({
          accessId: self.accessId
        });
        yield signIn();
        return true;
      } catch (error) {
        console.log(error);
        if (error.code === "E_CANCELLED_OPERATION") {
          return false;
        }
        throw error;
      }
    });

    const appleSignIn = flow(function*() {
      const appleAuthRequestResponse: RetrieveAsyncFunc<typeof appleAuth.performRequest> = yield appleAuth.performRequest(
        {
          requestedOperation: appleAuth.Operation.LOGIN,
          requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME]
        }
      );
      const {
        user,
        email,
        nonce,
        identityToken,
        realUserStatus /* etc */
      } = appleAuthRequestResponse;
      const credentialStateResponse: RetrieveAsyncFunc<typeof appleAuth.getCredentialStateForUser> = yield appleAuth.getCredentialStateForUser(
        user
      );
      if (!identityToken) {
        throw new Error("not exists identityToken");
      }
      if (credentialStateResponse !== appleAuth.State.AUTHORIZED) {
        throw new Error("not AUTHORIZED");
      }
      self.accessId = user;
      self.accessToken = identityToken;
      self.provider = "APPLE";
      self.user = User.create({
        accessId: self.accessId
      });
      yield signIn();
      return true;
    });

    const signIn = flow(function*() {
      const signInResponse: RetrieveAsyncFunc<typeof login> = yield login({
        deviceId: uniqueID,
        appId: self.accessId
      });
      updateUserAccessToken(signInResponse);
      updateAuthInfo();
    });

    const signUp = flow(function*() {
      yield apiSignup({
        appId: self.accessId,
        deviceId: uniqueID,
        token: self.accessToken
      });
      const signInResponse: RetrieveAsyncFunc<typeof login> = yield login({
        deviceId: uniqueID,
        appId: self.accessToken
      });
      updateUserAccessToken(signInResponse);
      updateAuthInfo();
    });

    const updateUserAccessToken = (signInResponse: LoginResponse | null) => {
      if (!signInResponse?.token) {
        throw new Error("sign in Error!");
      }
      self.user?.setUserAccessToken(signInResponse.token);
    };

    const updateAuthInfo = () => {
      storage().saveToken({
        provider: self.provider,
        accessId: self.accessId,
        accessToken: self.accessToken,
        refreshToken: ""
      });
    };

    const signOut = () => {
      clear();
      updateAuthInfo();
    };

    return {
      initialize,
      appleSignIn,
      kakaoSignIn,
      signOut,
      signUp
    };
  });

export type IAuthStore = typeof AuthStore.Type;
export default AuthStore;
