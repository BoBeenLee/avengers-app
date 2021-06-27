import LottieView from "lottie-react-native";
import { inject, observer } from "mobx-react";
import React from "react";
import styled from "styled-components/native";

import XEIcon from "src/components/icon/XEIcon";
import { Bold12, Bold20 } from "src/components/text/Typographies";
import images from "src/images";
import ScaleableButton from "src/components/button/ScaleableButton";
import { IStore } from "src/stores/Store";
import ContainerWithStatusBar from "src/components/ContainerWithStatusBar";
import colors from "src/styles/colors";
import TopBar from "src/components/topbar/TopBar";
import IconButton from "src/components/button/IconButton";

type Inject = {
  store: IStore;
};

const Container = styled(ContainerWithStatusBar)`
  background-color: ${colors.primary};
`;

const ChatButton = styled(IconButton)`
  width: 20px;
  height: 20px;
`;

const Name = styled(Bold20)`
  color: #000;
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
        <ScaleableButton>
          <Name>Hello</Name>
        </ScaleableButton>
      </Container>
    );
  }
}

export default MainScreen;
