import hoistNonReactStatic from "hoist-non-react-statics";
import React from "react";
import styled from "styled-components/native";

import withBackHandler, { BackHandlerProps } from "src/hocs/withBackHandler";
import { identity, isEmpty } from "@shared/utils/common";

type States = {
  PopupComponent: JSX.Element | null;
  closeOverlay: boolean;
  closeCallback: () => void;
};

export type PopupProps = {
  popupProps: {
    showPopup: (
      PopupComponent: JSX.Element | null,
      closeOverlay?: boolean
    ) => void;
    setClosePopupCallback: (closeCallback: () => void) => void;
  };
};

const Container = styled.View`
  width: 100%;
  flex: 1;
`;

const PopupContainer = styled.View`
  position: absolute;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 99;
`;

const PopupTouchableOverlay = styled.TouchableOpacity.attrs({
  activeOpacity: 1
})`
  position: absolute;
  width: 100%;
  height: 100%;
`;

const withPopup = <P extends PopupProps>(
  TargetComponent: React.ComponentType<P>
): any => {
  const WithPopup = class WithPopupAnonymous extends React.PureComponent<
    Subtract<P, PopupProps>,
    States
  > {
    constructor(props: Subtract<P, PopupProps>) {
      super(props);

      this.state = {
        PopupComponent: null,
        closeCallback: identity,
        closeOverlay: true
      };
    }

    public render() {
      const Popup = this.Popup;
      return (
        <Container>
          <TargetComponent
            {...(this.props as P)}
            popupProps={this.popupProps}
          />
          {this.isShow ? <Popup /> : null}
        </Container>
      );
    }

    private get popupProps() {
      return {
        showPopup: this.showPopup,
        setClosePopupCallback: this.setCloseCallback
      };
    }

    private showPopup = (
      PopupComponent: JSX.Element | null,
      closeOverlay = true
    ) => {
      this.setState({
        PopupComponent,
        closeOverlay
      });
    };

    private setCloseCallback = (closeCallback: () => void) => {
      this.setState({
        closeCallback
      });
    };

    private onBackgroundPress = () => {
      this.setState(
        {
          PopupComponent: null
        },
        () => {
          const { closeCallback } = this.state;
          if (closeCallback) {
            closeCallback();
          }
        }
      );
      return true;
    };

    private get isShow() {
      const { PopupComponent } = this.state;
      return !isEmpty(PopupComponent);
    }

    private get Popup() {
      const { closeOverlay } = this.state;
      if (!closeOverlay) {
        return () => (
          <PopupContainer>
            <PopupTouchableOverlay />
            {this.state.PopupComponent}
          </PopupContainer>
        );
      }
      return withBackHandler(
        (props: React.PropsWithChildren<BackHandlerProps>) => {
          const { backHandlerProps } = props;
          if (backHandlerProps?.addBackButtonListener) {
            backHandlerProps.addBackButtonListener(this.onBackgroundPress);
          }
          return (
            <PopupContainer>
              <PopupTouchableOverlay onPress={this.onBackgroundPress} />
              {this.state.PopupComponent}
            </PopupContainer>
          );
        }
      );
    }
  };

  return hoistNonReactStatic(WithPopup, TargetComponent);
};

export default withPopup;
