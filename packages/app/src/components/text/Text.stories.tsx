import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react-native";
import React from "react";
import styled from "styled-components/native";

import {
  Bold8,
  Bold10,
  Bold12,
  Bold13,
  Bold14,
  Regular12
} from "@shared/components/text/Typographies";
import colors from "@shared/styles/colors";

const Container = styled.View`
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const BodyText = styled(Regular12)`
  color: ${colors.gray700};
`;

storiesOf("Text", module)
  .add("Typographies", () => {
    return (
      <Container>
        <Bold8>Bold8</Bold8>
        <Bold10>Bold10</Bold10>
        <Bold12>Bold12</Bold12>
        <Bold13>Bold13</Bold13>
        <Bold14>Bold14</Bold14>
      </Container>
    );
  })
  .add("ReadMoreText", () => {
    return (
      <BodyText>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facilis
        numquam assumenda repudiandae porro quisquam dolorum, itaque est, fuga
        hic aspernatur architecto excepturi aliquid suscipit odit officiis,
        quaerat magni voluptates consectetur!
      </BodyText>
    );
  });
