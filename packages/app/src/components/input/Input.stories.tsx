import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react-native";
import React from "react";
import styled from "styled-components/native";

import RNTextInput from "src/components/input/RNTextInput";

const CenterView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding-horizontal: 30px;
`;

storiesOf("Input", module)
  .addDecorator((getStory: any) => <CenterView>{getStory()}</CenterView>)
  .add("RNTextInput", () => {
    return <RNTextInput />;
  });
