import hoistNonReactStatic from "hoist-non-react-statics";
import React from "react";
import { Navigation } from "react-native-navigation";

import { setCurrentComponent } from "src/utils/navigator";
import { firebaseAnalytics } from "src/configs/analytics";

type Props = {
  componentId: string;
};

const withNavigator = <P extends object>(
  TargetComponent: React.ComponentType<P>
): any => {
  const WithNavigator = class WithNavigatorAnonymous extends React.PureComponent<
    P & Props
  > {
    constructor(props: P & Props) {
      super(props);
      Navigation.events().bindComponent(this);
    }

    public componentDidAppear({ componentName }: { componentName: string }) {
      const { componentId } = this.props;
      setCurrentComponent(componentId, componentName);
      firebaseAnalytics().setCurrentScreen(componentName);
    }

    public render() {
      return <TargetComponent {...this.props} />;
    }
  };
  hoistNonReactStatic(WithNavigator, TargetComponent as any);
  return WithNavigator;
};

export default withNavigator;
