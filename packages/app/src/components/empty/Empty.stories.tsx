import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react-native";
import React from "react";
import styled from "styled-components/native";

import RegisterSecretEmpty from "src/components/empty/RegisterSecretEmpty";

const ContainerBlack = styled.View`
  flex: 1;
  height: 100%;
  background-color: #fff;
`;

storiesOf("Empty", module).add("RegisterSecretEmpty", () => {
  return (
    <ContainerBlack>
      <RegisterSecretEmpty onRegister={action("onRegister")} />
    </ContainerBlack>
  );
});
