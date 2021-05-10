import { flow, types } from "mobx-state-tree";
import codePush from "react-native-code-push";

import { firebaseRemoteConfig } from "src/configs/remoteConfig";
import { storage } from "src/configs/storage";
import { uniqueID, os, version } from "src/configs/device";
import { isEmpty, getValue } from "@shared/utils/common";

interface ICodePushData {
  codePushBuild: number;
  updateNote: string;
  deviceIds: string[];
}

const INITIAL_CODE_PUSH_DATA: ICodePushData = {
  codePushBuild: 0,
  updateNote: "",
  deviceIds: []
};

const CodePushStore = types
  .model("CodePushStore", {
    codePushKey: types.optional(
      types.string,
      `CODE_PUSH_${os.toUpperCase()}_${version.split(".").join("")}`
    ),
    currentCodePushData: types.optional(
      types.frozen<ICodePushData>(),
      INITIAL_CODE_PUSH_DATA
    ),
    isCodePush: types.optional(types.boolean, false),
    newCodePushData: types.optional(
      types.frozen<ICodePushData>(),
      INITIAL_CODE_PUSH_DATA
    )
  })
  .views(self => {
    return {
      get description() {
        return self.newCodePushData.updateNote;
      }
    };
  })
  .actions(self => {
    const getCurrentCodePushData = flow(function*() {
      return yield storage().getJSONWithDefault<ICodePushData>(
        self.codePushKey as any,
        INITIAL_CODE_PUSH_DATA
      );
    });

    const initialize = flow(function*() {
      try {
        const targetDeviceID = uniqueID;
        self.currentCodePushData = yield getCurrentCodePushData();
        self.newCodePushData = yield firebaseRemoteConfig().getJSONWithDefault<
          ICodePushData
        >(self.codePushKey as any, INITIAL_CODE_PUSH_DATA);
        const { deviceIds: userIDs } = self.newCodePushData;

        if (__DEV__) {
          self.isCodePush = false;
          return;
        }
        if (
          (userIDs ?? []).includes(targetDeviceID) &&
          self.currentCodePushData.codePushBuild !==
            self.newCodePushData.codePushBuild
        ) {
          self.isCodePush = true;
          return;
        }
        if (
          isEmpty(userIDs) &&
          self.currentCodePushData.codePushBuild !==
            self.newCodePushData.codePushBuild
        ) {
          self.isCodePush = true;
          return;
        }
        self.isCodePush = false;
      } catch (error) {
        self.isCodePush = false;
        return;
      }
    });

    const checkCodePushAvailability = flow(function*() {
      if (!self.isCodePush) {
        return false;
      }
      try {
        const update = yield codePush.checkForUpdate();
        if (update) {
          return true;
        }
        return false;
      } catch (error) {
        return false;
      }
    });

    const updateCodePush = flow(function*() {
      yield updateCodePushData();
      codePush.sync({ installMode: codePush.InstallMode.IMMEDIATE });
    });

    const updateCodePushData = flow(function*() {
      self.currentCodePushData = self.newCodePushData;
      yield storage().setItem(
        self.codePushKey,
        JSON.stringify(self.newCodePushData)
      );
    });

    const notifyAppReady = flow(function*() {
      yield codePush.notifyAppReady();
    });

    return {
      getCurrentCodePushData,
      checkCodePushAvailability,
      initialize,
      notifyAppReady,
      updateCodePush
    };
  });

export const getCodePushStore = (stores: any): ICodePushStore =>
  getValue(() => stores.store.codePushStore, {});

export type ICodePushStore = typeof CodePushStore.Type;
export default CodePushStore;
