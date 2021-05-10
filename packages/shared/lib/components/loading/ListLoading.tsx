import React from "react";
import { Dimensions } from "react-native";
import styled from "styled-components/native";

import images from "@shared/images";
import { media } from "@shared/utils/media";

const Container = styled.View`
  flex-direction: row;
  flex: 1;
  height: 72px;
  padding-top: 12px;
  justify-content: center;
  align-content: center;
  ${media.mobile(Dimensions.get("window").width)`
    background-color: red;
  `}
`;

function ListLoading() {
  const Loading = images.listLoading;
  return (
    <Container>
      <Loading width={40} height={40} />
    </Container>
  );
}

export default ListLoading;
