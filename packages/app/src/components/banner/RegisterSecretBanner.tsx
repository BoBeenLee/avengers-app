import React from "react";
import styled from "styled-components/native";

import { Medium13 } from "src/components/text/Typographies";

type Props = {
  remainAt: string;
};

const Container = styled.View`
  width: 100%;
  height: 31px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: #faedce;
`;

const Content = styled(Medium13)`
  color: #666666;
`;

const HighlightText = styled(Medium13)`
  color: #926ed9;
`;

const RegisterSecretBanner = (props: Props) => {
  const { remainAt } = props;
  return (
    <Container>
      <Content>
        {`작성권 생성까지 `}
        <HighlightText>{`00:00:00 `}</HighlightText>
        {` 남음`}
      </Content>
    </Container>
  );
};

export default RegisterSecretBanner;
