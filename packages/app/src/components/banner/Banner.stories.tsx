import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react-native";
import React from "react";
import styled from "styled-components/native";

import RegisterSecretBanner from "src/components/banner/RegisterSecretBanner";

const ContainerBlack = styled.View`
  flex: 1;
  height: 100%;
  background-color: #000;
`;

storiesOf("Banner", module).add("RegisterSecretBanner", () => {
  return (
    <ContainerBlack>
      <RegisterSecretBanner remainAt={"1"} />
    </ContainerBlack>
  );
});
