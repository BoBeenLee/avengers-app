import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react-native";
import React from "react";
import styled from "styled-components/native";

import { Regular12 } from "@shared/components/text/Typographies";
import colors from "@shared/styles/colors";
import ErrorBoundary from "src/components/ErrorBoundary";
import BuggyCounter from "src/components/__mocks__/BuggyCounter";

const BodyText = styled(Regular12)`
  color: ${colors.gray700};
`;

const renderFallback = () => {
  return <Regular12>Fallback</Regular12>;
};

storiesOf("Component", module).add("ErrorBoundary", () => {
  return (
    <ErrorBoundary renderFallback={renderFallback}>
      <BuggyCounter />
    </ErrorBoundary>
  );
});
