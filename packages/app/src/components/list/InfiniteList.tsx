import React from "react";
import { FlatList, FlatListProps } from "react-native";

import ListLoading from "@shared/components/loading/ListLoading";

export interface IFooterSpinnerList<T>
  extends Omit<FlatListProps<T>, "ListFooterComponent"> {
  LoadingComponent?: React.ReactElement;
}

interface IState {
  refreshing: boolean;
  showFooterSpinner: boolean;
}

class InfiniteList<T> extends React.PureComponent<
  IFooterSpinnerList<T>,
  IState
> {
  constructor(props: IFooterSpinnerList<T>) {
    super(props);

    this.state = {
      refreshing: false,
      showFooterSpinner: false
    };
  }

  public render() {
    const { onRefresh, ...props } = this.props;
    return (
      <FlatList
        {...props}
        refreshing={this.state.refreshing}
        ListFooterComponent={this.renderLoading}
        onEndReached={this.hookEndReached}
        onRefresh={onRefresh ? this.hookOnRefresh : null}
      />
    );
  }

  private hookOnRefresh = async () => {
    const { onRefresh } = this.props;
    if (!onRefresh) {
      return;
    }

    this.setState({ refreshing: true }, async () => {
      try {
        await onRefresh();
      } finally {
        this.setState({ refreshing: false });
      }
    });
  };

  private hookEndReached = async (info: { distanceFromEnd: number }) => {
    const { onEndReached } = this.props;
    const { showFooterSpinner } = this.state;
    if (!onEndReached) {
      return;
    } else if (showFooterSpinner) {
      onEndReached(info);
      return;
    }

    this.setState({ showFooterSpinner: true }, async () => {
      try {
        await onEndReached(info);
      } finally {
        this.setState({ showFooterSpinner: false });
      }
    });
  };

  private get renderLoading() {
    const { showFooterSpinner } = this.state;
    const { LoadingComponent = ListLoading } = this.props;
    if (!showFooterSpinner) {
      return null;
    }
    return LoadingComponent;
  }
}
export default InfiniteList;
