import React from "react";
import { TextProps } from "react-native";
import styled, { css } from "styled-components/native";

import colors from "@shared/styles/colors";
import { isWeb } from "@shared/utils/media";

type FontType = "BOLD" | "MEDIUM" | "REGULAR";

export interface ITextProps extends TextProps {
  fontType?: FontType;
  children: React.ReactNode;
}

const fontTypeToFont: { [key in FontType]: string } = {
  BOLD: "NotoSansKR-Bold",
  MEDIUM: "NotoSansKR-Medium",
  REGULAR: "NotoSansKR-Regular"
};

const Text = styled.Text<{ fontType: FontType }>`
  font-family: ${({ fontType }) => fontTypeToFont[fontType]};
  letter-spacing: -0.5px;
  color: ${colors.gray900};
  ${isWeb()
    ? css``
    : css`
        include-font-padding: false;
      `}
`;

function RNText({ fontType = "REGULAR", ...props }: ITextProps) {
  return <Text fontType={fontType} {...props} />;
}

export default RNText;
