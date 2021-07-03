import LottieView from "lottie-react-native";
import { inject, observer } from "mobx-react";
import React from "react";
import styled from "styled-components/native";

import XEIcon from "src/components/icon/XEIcon";
import { Bold12, Bold20 } from "src/components/text/Typographies";
import images from "src/images";
import { IStore } from "src/stores/Store";
import ContainerWithStatusBar from "src/components/ContainerWithStatusBar";
import colors from "src/styles/colors";
import TopBar from "src/components/topbar/TopBar";
import IconButton from "src/components/button/IconButton";
import RegisterSecretEmpty from "src/components/empty/RegisterSecretEmpty";

type Inject = {
  store: IStore;
};

const Container = styled(ContainerWithStatusBar)`
  background-color: ${colors.primary};
`;

const Content = styled.View`
  display: flex;
  flex: 1;
`;

const ChatButton = styled(IconButton)`
  width: 20px;
  height: 20px;
`;

const RegisterSecretEmptyView = styled(RegisterSecretEmpty)`
  margin-top: 64px;
`;

@inject(
  ({ store }: { store: IStore }): Inject => ({
    store
  })
)
@observer
class MainScreen extends React.PureComponent<Inject> {
  constructor(props: Inject) {
    super(props);
  }

  public render() {
    return (
      <Container>
        <TopBar
          title={"    "}
          titleStyle={{
            flex: 1
          }}
          RightComponent={<ChatButton source={images.icChat} />}
        />
        <Content>
          <RegisterSecretEmptyView onRegister={this.onRegister} />
        </Content>
      </Container>
    );
  }

  private onRegister = () => {
    // TODO
  };
}

export default MainScreen;
