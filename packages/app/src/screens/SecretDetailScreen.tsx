import { inject, observer } from "mobx-react";
import React from "react";
import styled, { css } from "styled-components/native";

import { Bold15, Bold20 } from "src/components/text/Typographies";
import images from "src/images";
import { IStore } from "src/stores/Store";
import ContainerWithStatusBar from "src/components/ContainerWithStatusBar";
import colors from "src/styles/colors";
import ModalTopBar from "src/components/topbar/ModalTopBar";
import { SCREEN_IDS } from "src/screens/constant";
import { push } from "src/utils/navigator";
import { SecretItem } from "src/interfaces/secret";
import SecretDetailCard from "src/components/card/SecretDetailCard";

type Params = {
  componentId: string;
  secretItem: SecretItem;
};

type Inject = {
  store: IStore;
};

type Props = Inject & Params;

type States = {
  content: string;
};

const Container = styled(ContainerWithStatusBar)`
  background-color: ${colors.primary};
`;

const Content = styled.View``;

@inject(
  ({ store }: { store: IStore }): Inject => ({
    store
  })
)
@observer
class SecretDetailScreen extends React.PureComponent<Props, States> {
  public static open(params: Params) {
    const { componentId, ...restParams } = params;
    return push({
      componentId,
      nextComponentId: SCREEN_IDS.SecretDetailScreen,
      params: restParams
    });
  }

  constructor(props: Props) {
    super(props);
  }

  public render() {
    const { createdAt, content } = this.props.secretItem;
    return (
      <Container>
        <ModalTopBar
          title={" "}
          titleStyle={{
            flex: 1
          }}
          onBackPress={this.onBackPress}
        />
        <Content>
          <SecretDetailCard createdAt={createdAt} content={content} />
        </Content>
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

export default SecretDetailScreen;
