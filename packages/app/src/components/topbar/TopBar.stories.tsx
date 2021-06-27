import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react-native";
import styled from "styled-components/native";
import React from "react";

import BackTopBar from "src/components/topbar/BackTopBar";
import ModalTopBar from "src/components/topbar/ModalTopBar";
import colors from "src/styles/colors";

const ContainerBlack = styled.View`
  flex: 1;
  height: 100%;
  background-color: #000;
`;

storiesOf("TopBar", module)
  .add("ModalTopBar", () => (
    <ContainerBlack>
      <ModalTopBar title="Hello World" onBackPress={action("onBackPress")} />
    </ContainerBlack>
  ))
  .add("BackTopBar", () => (
    <ContainerBlack>
      <BackTopBar title="Hello World" onBackPress={action("onBackPress")} />
    </ContainerBlack>
  ));
