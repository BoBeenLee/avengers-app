import { getSnapshot } from "mobx-state-tree";
import iid from "@react-native-firebase/iid";
import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { Alert } from "react-native";
import Clipboard from "@react-native-community/clipboard";
import styled from "styled-components/native";

import ContainerWithStatusBar from "src/components/ContainerWithStatusBar";
import {
  Bold12,
  Bold14,
  Bold18,
  Regular15,
  Medium15
} from "@shared/components/text/Typographies";
import { IStore } from "src/stores/Store";
import { IToastStore } from "@shared/stores/ToastStore";
import { SCREEN_IDS } from "src/screens/constant";
import { pop, showStackModal, dismissAllModals } from "src/utils/navigator";
import colors from "src/styles/colors";
import { ICodePushStore } from "src/stores/CodePushStore";
import { PopupProps } from "src/hocs/withPopup";
import { storage } from "src/configs/storage";
import { buildNumber, version, uniqueID } from "src/configs/device";

interface IInject {
  store: IStore;
  codePushStore: ICodePushStore;
  toastStore: IToastStore;
}

interface IParams {
  componentId: string;
}

interface IProps extends IInject, PopupProps {
  componentId: string;
}

interface IStates {
  storages: string;
  iid: string;
  storeSnapshot: string;
}

const Container = styled(ContainerWithStatusBar)`
  flex: 1;
  flex-direction: column;
`;

const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const HeaderTitle = styled(Bold18)`
  flex: 1;
  text-align: center;
`;

const BackButton = styled.TouchableOpacity``;

const BackButtonText = styled(Regular15)``;

const Content = styled.ScrollView`
  flex: 1;
  padding: 40px;
`;

const Title = styled(Bold18)`
  color: ${colors.black50};
`;

const DevelopInfoText = styled(Regular15)`
  color: ${colors.black50};
  margin-bottom: 8px;
`;

@inject(
  ({ store }: { store: IStore }): IInject => ({
    store,
    codePushStore: store.codePushStore,
    toastStore: store.toastStore
  })
)
@observer
class DeveloperScreen extends Component<IProps, IStates> {
  public static open() {
    return showStackModal({
      componentId: SCREEN_IDS.DeveloperScreen
    });
  }

  constructor(props: IProps) {
    super(props);

    this.state = {
      iid: "",
      storages: "",
      storeSnapshot: ""
    };
  }

  public async componentDidMount() {
    this.fetchStoreSnapshot();
    this.fetchAllStorage();
    this.fetchIID();
  }

  public render() {
    const { codePushKey, currentCodePushData } = this.props.codePushStore;
    const deviceId = uniqueID;
    const { storages, iid, storeSnapshot } = this.state;
    const versionAndBuildNumber = `${version} / ${buildNumber}`;
    const codePushAndBuildNumber = `${codePushKey} / ${currentCodePushData.codePushBuild}`;
    return (
      <Container>
        <Header>
          <HeaderTitle>개발자 모드</HeaderTitle>
          <BackButton onPress={this.back}>
            <BackButtonText>뒤로가기</BackButtonText>
          </BackButton>
        </Header>
        <Content>
          <Title>version / buildNumber</Title>
          <DevelopInfoText
            onPress={() => this.setContent(versionAndBuildNumber)}
          >
            {versionAndBuildNumber}
          </DevelopInfoText>
          <Title>codepush / codepushBuildNumber</Title>
          <DevelopInfoText
            onPress={() => this.setContent(codePushAndBuildNumber)}
          >
            {codePushAndBuildNumber}
          </DevelopInfoText>
          <Title>firebase Instance ID</Title>
          <DevelopInfoText onPress={() => this.setContent(iid)}>
            {iid}
          </DevelopInfoText>
          <Title>deviceId</Title>
          <DevelopInfoText onPress={() => this.setContent(deviceId || "")}>
            {deviceId || ""}
          </DevelopInfoText>
          <Title>asyncStorage</Title>
          <DevelopInfoText onPress={() => this.setContent(storages)}>
            {storages}
          </DevelopInfoText>
          <Title>storeSnapshot</Title>
          <DevelopInfoText onPress={() => this.setContent(storeSnapshot)}>
            Copy Stores
          </DevelopInfoText>
        </Content>
      </Container>
    );
  }

  private fetchStoreSnapshot = () => {
    const storeSnapshot = JSON.stringify(
      getSnapshot(this.props.store),
      undefined,
      2
    );
    this.setState({
      storeSnapshot
    });
  };

  private fetchAllStorage = async () => {
    const { getCurrentCodePushData } = this.props.codePushStore;
    const [codePushData] = await Promise.all([getCurrentCodePushData()]);
    this.setState({
      storages: JSON.stringify({
        codePushData
      })
    });
  };

  private fetchIID = async () => {
    const instanceId = await iid().get();
    this.setState({
      iid: instanceId
    });
  };

  private setContent = (content: string) => {
    const { showToast } = this.props.toastStore;
    Clipboard.setString(content);
    showToast("클립보드 복사 완료");
  };

  private back = () => {
    dismissAllModals();
  };
}

export default DeveloperScreen;
