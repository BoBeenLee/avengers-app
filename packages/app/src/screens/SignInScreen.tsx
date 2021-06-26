import _ from "lodash";
import React, { Component } from "react";
import { Platform } from "react-native";
import { inject, observer } from "mobx-react";
import styled from "styled-components/native";
import appleAuth, {
  AppleButton
} from "@invertase/react-native-apple-authentication";

import ContainerWithStatusBar from "src/components/ContainerWithStatusBar";
import { Bold12, Bold14 } from "src/components/text/Typographies";
import { IStore } from "src/stores/Store";
import { IAuthStore } from "src/stores/AuthStore";
import { IToastStore } from "src/stores/ToastStore";
import { SCREEN_IDS } from "src/screens/constant";
import { setRoot } from "src/utils/navigator";
// import { MainScreenStatic } from "src/screens/MainScreen";
import colors from "src/styles/colors";
import { ErrorCode } from "src/configs/error";
import images from "src/images";
import IconButton from "src/components/button/IconButton";

interface IInject {
  authStore: IAuthStore;
  toastStore: IToastStore;
}

interface IProps extends IInject {
  componentId: string;
}

const Container = styled(ContainerWithStatusBar)`
  flex: 1;
  flex-direction: column;
`;

const Content = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: center;
`;

const Description = styled(Bold12)`
  color: ${colors.white};
  text-align: center;
  margin-bottom: 43px;
`;

const ButtonGroup = styled.View`
  flex-direction: column;
  justify-content: center;
`;

const SignInButton = styled(IconButton)`
  height: 49px;
  margin-bottom: 9px;
`;

const AppleSignIn = styled.View`
  width: 100%;
  height: 49px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 9px;
`;

const AppleSignInButton = styled(AppleButton)`
  width: 326px;
  height: 49px;
`;

@inject(
  ({ store }: { store: IStore }): IInject => ({
    authStore: store.authStore,
    toastStore: store.toastStore
  })
)
@observer
class SignInScreen extends Component<IProps> {
  public static open() {
    setRoot({
      nextComponentId: SCREEN_IDS.SignInScreen
    });
  }

  constructor(props: IProps) {
    super(props);

    const enhancedLoginFlow = _.flow([
      this.enhancedErrorIfSignInError,
      this.enhancedIfSignIn
    ]);
    this.kakaoSignIn = enhancedLoginFlow(this.kakaoSignIn);
    this.appleSignIn = enhancedLoginFlow(this.appleSignIn);
  }

  public render() {
    return (
      <Container>
        <Content>
          <Description>Hello World!</Description>
          {appleAuth.isSupported ? (
            <AppleSignIn>
              <AppleSignInButton
                cornerRadius={10}
                buttonStyle={AppleButton.Style.WHITE_OUTLINE}
                buttonType={AppleButton.Type.SIGN_IN}
                onPress={this.appleSignIn}
              />
            </AppleSignIn>
          ) : null}
          <ButtonGroup>
            <SignInButton source={images.btnKakao} onPress={this.kakaoSignIn} />
          </ButtonGroup>
        </Content>
      </Container>
    );
  }

  private enhancedIfSignIn = (func: any) => async (...args: any[]) => {
    try {
      await func(...args);
    } catch (error) {
      const { showToast } = this.props.toastStore;
      showToast(error.message);
    }
  };

  private enhancedErrorIfSignInError = (func: any) => async (
    ...args: any[]
  ) => {
    try {
      return await func(...args);
    } catch (error) {
      const { componentId } = this.props;

      if (
        [ErrorCode.NOT_FOUND, ErrorCode.FORBIDDEN_ERROR].some(
          status => status === error.status
        )
      ) {
        // TODO
        return;
      }
      throw error;
    }
  };

  private kakaoSignIn = async () => {
    const { kakaoSignIn } = this.props.authStore;
    const isSignIn = await kakaoSignIn();
    if (!isSignIn) {
      return;
    }
    // MainScreenStatic.open();
  };

  private appleSignIn = async () => {
    const { appleSignIn } = this.props.authStore;
    const isSignIn = await appleSignIn();
    console.log(isSignIn);
    if (!isSignIn) {
      return;
    }
    // MainScreenStatic.open();
  };
}

export default SignInScreen;
