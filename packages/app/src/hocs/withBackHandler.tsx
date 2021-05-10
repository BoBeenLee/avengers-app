import hoistNonReactStatics from "hoist-non-react-statics";
import React from "react";
import { BackHandler, NativeEventSubscription } from "react-native";

export type BackHandlerProps = {
  backHandlerProps: {
    addBackButtonListener: (callback: () => boolean) => void;
  };
};

const withBackHandler = <P extends BackHandlerProps>(
  TargetComponent: React.ComponentType<P>
) => {
  class WithBackHandler extends React.Component<
    Subtract<P, BackHandlerProps> & { innerRef: any }
  > {
    public backHandler: NativeEventSubscription | null = null;

    public componentWillUnmount() {
      this.backHandler?.remove();
    }

    public render() {
      const { innerRef, ...rest } = this.props;
      return (
        <TargetComponent
          {...(rest as any)}
          ref={innerRef}
          backHandlerProps={this.backHandlerProps}
        />
      );
    }

    public get backHandlerProps() {
      return {
        addBackButtonListener: this.addBackButtonListener
      };
    }

    public addBackButtonListener = (callback: () => boolean) => {
      this.backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        callback
      );
    };
  }

  const WithBackHandlerFowardRef = React.forwardRef(
    (props: Subtract<P, BackHandlerProps>, ref: any) => {
      return <WithBackHandler innerRef={ref} {...props} />;
    }
  );

  return hoistNonReactStatics(WithBackHandlerFowardRef, TargetComponent);
};

export default withBackHandler;
