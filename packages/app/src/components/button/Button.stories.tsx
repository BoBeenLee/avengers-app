import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react-native";
import React from "react";
import styled from "styled-components/native";

import ScaleableButton from "src/components/button/ScaleableButton";
import RegisterSecretButton from "src/components/button/RegisterSecretButton";
import { Bold12 } from "src/components/text/Typographies";

const CenterView = styled.View`
  justify-content: center;
  align-items: center;
`;

storiesOf("Button", module)
  .addDecorator((getStory: any) => <CenterView>{getStory()}</CenterView>)
  .add("ScaleableButton", () => {
    return (
      <ScaleableButton>
        <Bold12>Hello World</Bold12>
      </ScaleableButton>
    );
  })
  .add("RegisterSecretButton", () => {
    return <RegisterSecretButton />;
  });
