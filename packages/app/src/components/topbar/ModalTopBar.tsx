import React from "react";

import TopBar, { ITopBarProps } from "src/components/topbar/TopBar";

export default class ModalTopBar extends React.Component<
  Omit<ITopBarProps, "iconName">
> {
  public render() {
    return <TopBar {...this.props} iconName="close" />;
  }
}
