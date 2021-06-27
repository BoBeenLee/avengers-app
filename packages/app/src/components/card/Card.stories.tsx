import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react-native";
import React from "react";
import styled from "styled-components/native";

import SecretCard from "src/components/card/SecretCard";
import SecretDetailCard from "src/components/card/SecretDetailCard";

const ContainerBlack = styled.View`
  flex: 1;
  height: 100%;
  background-color: #000;
`;

storiesOf("Card", module)
  .add("SecretCard", () => {
    return (
      <ContainerBlack>
        <SecretCard
          createdAt={String(new Date().valueOf())}
          commentCount={111}
          content={"testtest"}
        />
      </ContainerBlack>
    );
  })
  .add("SecretDetailCard", () => {
    return (
      <ContainerBlack>
        <SecretDetailCard
          createdAt={String(new Date().valueOf())}
          content={"testtest"}
        />
      </ContainerBlack>
    );
  });
