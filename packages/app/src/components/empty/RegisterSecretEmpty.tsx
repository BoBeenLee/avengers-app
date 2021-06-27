import React from "react";
import { ViewProps } from "react-native";
import styled from "styled-components/native";

import { Bold20, Medium16 } from "src/components/text/Typographies";
import RegisterSecretButton from "src/components/button/RegisterSecretButton";
import images from "src/images";

type Props = {
  style?: ViewProps["style"];
  onRegister: () => void;
};

const Container = styled.View`
  flex-direction: column;
  align-items: center;
`;

const EmptyHeader = styled.Image`
  width: 160px;
  height: 130px;
  margin-bottom: 32px;
`;

const Title = styled(Bold20)`
  color: #333333;
  margin-bottom: 12px;
`;

const Description = styled(Medium16)`
  color: #666666;
  text-align: center;
  margin-bottom: 24px;
`;

const RegisterSecretEmpty = (props: Props) => {
  const { style, onRegister } = props;
  return (
    <Container style={style}>
      <EmptyHeader source={images.bgEmpty} />
      <Title>{`당신의 비밀을 들어줄게요.`}</Title>
      <Description>{`털어놓고 싶은 고민이나 비밀이 있다면 
여기에 작성해봐요.`}</Description>
      <RegisterSecretButton onPress={onRegister} />
    </Container>
  );
};

export default RegisterSecretEmpty;
