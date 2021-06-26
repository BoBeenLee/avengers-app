import React from "react";
import styled from "styled-components/native";

import { Bold16, Medium14 } from "src/components/text/Typographies";
import { fromNow } from "src/utils/datetime";

type Props = {
  createdAt: string;
  commentCount: number;
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
  margin-bottom: 8px;
`;

const Date = styled(Bold16)`
  color: #333333;
  margin-left: 5px;
  margin-right: 5px;
`;

const Dot = styled(Bold16)`
  color: #ccc;
`;

const CommentCount = styled(Bold16)`
  color: #926ed8;
`;

const Content = styled(Medium14)`
  color: #666666;
`;

const SecretCard = (props: Props) => {
  const { createdAt, commentCount, content } = props;
  return (
    <Container>
      <Header>
        <Date>{fromNow(Number(createdAt))}</Date>
        <Dot>*</Dot>
        <CommentCount>{`${commentCount}`}</CommentCount>
      </Header>
      <Content>{content}</Content>
    </Container>
  );
};

export default SecretCard;
