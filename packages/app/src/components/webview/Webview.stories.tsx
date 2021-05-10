import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react-native";
import React from "react";
import styled from "styled-components/native";

import HelloWorldWebview from "src/components/webview/RNWebview";
import { IWebviewProps, IOnWebviewProps } from "@shared/webviews/helloworld";
import { identity } from "@shared/utils/common";

const CenterView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

storiesOf("Webview", module)
  .addDecorator((getStory: any) => <CenterView>{getStory()}</CenterView>)
  .add("HelloWorldWebview", () => {
    return (
      <HelloWorldWebview<IWebviewProps, IOnWebviewProps>
        webviewProps={{ name: "test" }}
        onWebviewProps={{ onHelloWorld: identity }}
      />
    );
  });
