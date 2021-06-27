import LottieView from "lottie-react-native";
import { inject, observer } from "mobx-react";
import React from "react";
import styled, { css } from "styled-components/native";

import { Bold15, Bold20 } from "src/components/text/Typographies";
import images from "src/images";
import { IStore } from "src/stores/Store";
import ContainerWithStatusBar from "src/components/ContainerWithStatusBar";
import colors from "src/styles/colors";
import ModalTopBar from "src/components/topbar/ModalTopBar";
import RNTextInput from "src/components/input/RNTextInput";

type Inject = {
  store: IStore;
};

type States = {
  content: string;
};

const Container = styled(ContainerWithStatusBar)`
  background-color: ${colors.primary};
`;

const CompleteButton = styled.TouchableOpacity``;

const CompleteButtonText = styled(Bold15)<{ $disabled: boolean }>`
  ${({ $disabled }) =>
    $disabled
      ? css`
          color: #ccc;
        `
      : css`
          color: #666;
        `}
`;

const Content = styled(RNTextInput)`
  padding-left: 16px;
  padding-right: 16px;
  margin-top: 24px;
`;

@inject(
  ({ store }: { store: IStore }): Inject => ({
    store
  })
)
@observer
class RegisterSecretScreen extends React.PureComponent<Inject, States> {
  constructor(props: Inject) {
    super(props);

    this.state = {
      content: ""
    };
  }

  public render() {
    const { content } = this.state;
    return (
      <Container>
        <ModalTopBar
          title={" "}
          titleStyle={{
            flex: 1
          }}
          RightComponent={
            <CompleteButton>
              <CompleteButtonText $disabled={!Boolean(content)}>
                완료
              </CompleteButtonText>
            </CompleteButton>
          }
          onBackPress={this.onBackPress}
        />
        <Content
          placeholder={"무엇이든 너의 생각을 들려줘."}
          value={content}
          onChangeText={this.onChangeText}
        />
      </Container>
    );
  }

  private onChangeText = (text: string) => {
    this.setState({
      content: text
    });
  };

  private onBackPress = () => {
    // TODO
  };
}

export default RegisterSecretScreen;
