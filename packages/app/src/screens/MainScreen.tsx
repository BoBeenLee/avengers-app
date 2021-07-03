import LottieView from "lottie-react-native";
import { inject, observer } from "mobx-react";
import React, { ComponentClass } from "react";
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
import { FlatList, FlatListProps, ListRenderItem } from "react-native";
import { SecretItem } from "src/interfaces/secret";
import { mockSecretItems } from "src/__mocks__/data";
import SecretCard from "src/components/card/SecretCard";
import Secrets from "src/stores/Secrets";
import { push, pop } from "src/utils/navigator";
import { SCREEN_IDS } from "src/screens/constant";

type Params = {
  componentId: string;
};

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

const SecretView = styled.View`
  flex: 1;
`;

const SecretHeader = styled.View`
  flex-direction: column;
  align-items: center;
  height: 81px;
`;

const SecretBg = styled.Image`
  width: 160px;
  height: 130px;
  margin-bottom: 32px;
`;

const SecretList = styled<ComponentClass<FlatListProps<SecretItem>>>(
  FlatList
).attrs({
  contentContainerStyle: {
    paddingLeft: 24,
    paddingRight: 24
  }
})`
  flex: 1;
  width: 100%;
  padding-top: 24px;
`;

const SecretSeperator = styled.View`
  width: 100%;
  height: 12px;
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
  public static open(params: Params) {
    return push({
      componentId: params.componentId,
      nextComponentId: SCREEN_IDS.MainScreen
    });
  }

  public secrets = Secrets.create();

  constructor(props: any) {
    super(props);
    this.secrets.initialize({ q: "" });
  }

  public render() {
    const { isRefresh, refresh, isEmpty, secretItemViews } = this.secrets;
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
          {isEmpty ? (
            <RegisterSecretEmptyView onRegister={this.onRegister} />
          ) : (
            <SecretView>
              <SecretList
                ListHeaderComponent={
                  <SecretHeader>
                    <SecretBg source={images.bgEmpty} />
                  </SecretHeader>
                }
                data={secretItemViews}
                renderItem={this.renderSecretItem}
                keyExtractor={this.secretKeyExtreactor}
                refreshing={isRefresh}
                onRefresh={refresh}
                ItemSeparatorComponent={SecretSeperator}
              />
            </SecretView>
          )}
        </Content>
      </Container>
    );
  }

  private secretKeyExtreactor = (item: SecretItem, index: number) => {
    return `${index}`;
  };

  private renderSecretItem: ListRenderItem<SecretItem> = ({ item, index }) => {
    const { createdAt, commentCount, content } = item;
    return (
      <SecretCard
        createdAt={String(createdAt)}
        commentCount={commentCount}
        content={content}
      />
    );
  };

  private onRegister = () => {
    // TODO
  };
}

export default MainScreen;
