import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react-native";
import React from "react";
import styled from "styled-components/native";

import SecretCard from "src/components/card/SecretCard";
import colors from "src/styles/colors";

storiesOf("Card", module).add("SecretCard", () => {
  return (
    <SecretCard
      createdAt={String(new Date().valueOf())}
      commentCount={111}
      content={"testtest"}
    />
  );
});
