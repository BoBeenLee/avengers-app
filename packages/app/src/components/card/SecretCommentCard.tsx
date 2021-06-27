import React from "react";
import { ViewProps } from "react-native";
import styled from "styled-components/native";

import { Bold16, Medium15, Medium14 } from "src/components/text/Typographies";
import { fromNow } from "src/utils/datetime";
import images from "src/images";

type Props = {
  style?: ViewProps["style"];
  createdAt: string;
  content: string;
};

const Container = styled.View`
  flex-direction: row;
  padding-horizontal: 16px;
  padding-vertical: 12px;
  background-color: #fff;
  border-radius: 12px;
`;

const LeftGroup = styled.View`
  margin-right: 16px;
`;

const Profile = styled.Image`
  width: 32px;
  height: 32px;
`;

const RightGroup = styled.View`
  flex: 1;
  flex-direction: column;
`;

const Content = styled(Medium15)`
  color: #333333;
  margin-bottom: 6px;
`;

const Date = styled(Medium14)`
  color: #999999;
`;

const SecretCommentCard = (props: Props) => {
  const { style, createdAt, content } = props;
  return (
    <Container style={style}>
      <LeftGroup>
        <Profile source={images.icMockProfile} />
      </LeftGroup>
      <RightGroup>
        <Content>{content}</Content>
        <Date>{fromNow(Number(createdAt))}</Date>
      </RightGroup>
    </Container>
  );
};

export default SecretCommentCard;
