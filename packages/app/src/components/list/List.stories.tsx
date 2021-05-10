import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react-native";
import React, { useState } from "react";
import { ListRenderItemInfo } from "react-native";
import styled from "styled-components/native";

import InfiniteList from "src/components/list/InfiniteList";
import { delay, times } from "@shared/utils/common";

const Container = styled.View``;

const List = styled(InfiniteList)``;

const InfiniteItem = styled.Text`
  width: 100%;
  height: 70px;
  background-color: #eee;
  margin-bottom: 5px;
`;

const renderInfiniteItem = ({ item, index }: ListRenderItemInfo<any>) => {
  return <InfiniteItem>{`${item}`}</InfiniteItem>;
};

const infiniteKeyExtractor = (item: any) => `${item}`;

const InfiniteListView = () => {
  const [size, setSize] = useState(50);
  const items = times(size, index => "" + index);

  const onMore = async () => {
    await delay(5000);
    setSize(size + 50);
  };

  return (
    <List
      data={items}
      keyExtractor={infiniteKeyExtractor}
      renderItem={renderInfiniteItem}
      onEndReached={onMore}
    />
  );
};

storiesOf("List", module).add("InfiniteList", () => {
  return (
    <Container>
      <InfiniteListView />
    </Container>
  );
});
