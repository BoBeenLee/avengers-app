import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react-native";
import React from "react";
import styled from "styled-components/native";

import SecretCard from "src/components/card/SecretCard";
import SecretDetailCard from "src/components/card/SecretDetailCard";
import SecretCommentCard from "src/components/card/SecretCommentCard";

const ContainerBlack = styled.View`
  flex: 1;
  height: 100%;
  background-color: #000;
`;

storiesOf("Card", module)
  .add("SecretCard", () => {
    return (
      <ContainerBlack>
        <SecretCard
          createdAt={String(new Date().valueOf())}
          commentCount={111}
          content={"testtest"}
        />
      </ContainerBlack>
    );
  })
  .add("SecretDetailCard", () => {
    return (
      <ContainerBlack>
        <SecretDetailCard
          createdAt={String(new Date().valueOf())}
          content={`학생때는 주변사람들과 오래 접촉할 시간이나 사람을 깊게 알아갈 시간도 많기도 하고 주변 풀에서 만날 수 있는 자만추가 상대적으로 가능했지만

직장인이 되고서는 회사와 집만 반복되는 루틴으로 인해 자연스럽게는(?) 새로운 사람 만날 방법이 한정적이고 더군다나 코로나의 영향으로 법적 다수모임금지나 제약사항이 많아지면서 힘들더라구
          
결국 지인소개나 소모임 등으로라도 적극적으로 내가 나서야 인연을 찾을 수 있을것 같은데
          
인만추는 모르는 상대방에 대한 믿음을 모르기 때문에 연애가 참 어려운 거 같아.`}
        />
      </ContainerBlack>
    );
  })
  .add("SecretCommentCard", () => {
    return (
      <ContainerBlack>
        <SecretCommentCard
          createdAt={String(new Date().valueOf())}
          content={`나도 27살에 대학생,군대에서 모은돈 부모님께 2천만원 드리고 0에서 시작했고 지금 35살에 와이프,아들이랑 행복하게 잘 살고 있음 닉넴처럼 힘내고 화이팅 하자`}
        />
      </ContainerBlack>
    );
  });
