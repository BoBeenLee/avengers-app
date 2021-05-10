import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react-native";
import React from "react";
import styled from "styled-components/native";

import ListLoading from "@shared/components/loading/ListLoading";

const Container = styled.View`
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

storiesOf("Loading", module).add("ListLoading", () => {
  return <ListLoading />;
});
