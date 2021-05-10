import React, { ComponentClass } from "react";
import { ViewProps } from "react-native";
import styled from "styled-components/native";

import RNWebview, {
  IProps as IRNWebviewProps
} from "src/components/webview/RNWebview";
import { IWebviewProps, IOnWebviewProps } from "@shared/webviews/helloworld";
import { routes } from "src/configs/webview";

interface IProps extends IWebviewProps, IOnWebviewProps {
  style?: ViewProps["style"];
}

const Container = styled<
  ComponentClass<IRNWebviewProps<IWebviewProps, IOnWebviewProps>>
>(RNWebview)`
  width: 100px;
  height: 50px;
`;

function HelloworldButton(props: IProps) {
  const { style, name, onHelloWorld } = props;
  return (
    <Container
      style={style}
      webviewProps={{ name }}
      onWebviewProps={{ onHelloWorld }}
      source={{ uri: routes.helloworld }}
    />
  );
}

export default HelloworldButton;
