import React from "react";
import { ViewProps } from "react-native";
import styled from "styled-components/native";

import IconButton from "./IconButton";
import images from "src/images";

type Props = {
  style?: ViewProps["style"];
  onPress?: () => void;
};

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  background-color: #926ed9;
  border-radius: 28px;
  shadow-offset: 0px 0px;
  shadow-opacity: 0.4;
  shadow-radius: 5px;
  elevation: 3;
`;

const Content = styled(IconButton)`
  width: 24px;
  height: 24px;
`;

const RegisterSecretButton = (props: Props) => {
  const { style, onPress } = props;
  return (
    <Container style={style}>
      <Content source={images.icEdit} onPress={onPress} />
    </Container>
  );
};

export default RegisterSecretButton;
