import React from "react";
import styled from "styled-components/native";

import { Bold16, Medium16 } from "src/components/text/Typographies";
import { fromNow } from "src/utils/datetime";
import { ViewProps } from "react-native";

type Props = {
  style?: ViewProps["style"];
  createdAt: string;
  content: string;
};

const Container = styled.View`
  flex-direction: column;
  padding: 24px;
  background-color: #fff;
  border-radius: 12px;
`;

const Header = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 16px;
`;

const Date = styled(Bold16)`
  color: #333333;
`;

const Content = styled(Medium16)`
  color: #666666;
`;

const SecretDetailCard = (props: Props) => {
  const { style, createdAt, content } = props;
  return (
    <Container style={style}>
      <Header>
        <Date>{fromNow(Number(createdAt))}</Date>
      </Header>
      <Content>{content}</Content>
    </Container>
  );
};

export default SecretDetailCard;
