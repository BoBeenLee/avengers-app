import React from "react";
import { ImageProps, TouchableOpacityProps } from "react-native";
import styled from "styled-components/native";

export interface Props extends TouchableOpacityProps {
  source: ImageProps["source"];
  iconStyle?: ImageProps["style"];
}

const Container = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
`;

const Icon = styled.Image`
  width: 100%;
  height: 100%;
  resize-mode: contain;
`;

export default function IconButton({ source, iconStyle, ...props }: Props) {
  return (
    <Container {...props}>
      <Icon source={source} style={iconStyle} />
    </Container>
  );
}
