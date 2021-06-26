import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react-native";
import React from "react";
import styled from "styled-components/native";

import colors from "src/styles/colors";
import XEIcon from "src/components/icon/XEIcon";

const CenterView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

storiesOf("Icon", module)
  .addDecorator((getStory: any) => <CenterView>{getStory()}</CenterView>)
  .add("XEIcon", () => {
    return <XEIcon name="close" size={20} color={colors.gray500} />;
  });
