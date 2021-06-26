/* eslint-disable @typescript-eslint/camelcase */
import rnFirebaseAnalytics from "@react-native-firebase/analytics";

import { createInjectDecorator } from "src/decorators/createInjectDecorator";
import { once } from "src/utils/common";
import { traverseObjectKeys, traverseObjectSliceStr } from "src/utils/string";
import { omit } from "src/utils/common";

const EVENT_TYPE_MAX_LENGTH = 40;

export type EventType = "test";

export interface IEventResult {
  eventType: EventType;
  [key: string]: any;
}

function firebaseAnalyticsFactory(
  funcAnalytics: (eventName: string, params: object) => void,
  setUserId: (userId: string) => void,
  setCurrentScreen: (screenName: string) => void
) {
  function firebaseLogEvent(eventData: IEventResult) {
    const { eventType } = eventData;

    if (!eventType) {
      throw new Error("eventType is not provided!");
    }

    if (eventType.length > EVENT_TYPE_MAX_LENGTH) {
      throw new Error(
        `${eventType} has over ${EVENT_TYPE_MAX_LENGTH} characters!`
      );
    }

    const isAllKeysUnderLength40 = traverseObjectKeys(
      omit(eventData, "eventType"),
      (key: string) => key.length <= EVENT_TYPE_MAX_LENGTH
    );

    if (!isAllKeysUnderLength40) {
      return;
    }

    const parameters = traverseObjectSliceStr(
      omit(eventData, "eventType"),
      100
    );
    funcAnalytics(eventData.eventType, parameters);
  }
  return {
    setUserId: (userId: string) => {
      setUserId(userId);
    },
    setCurrentScreen: (screenName: string) => {
      setCurrentScreen(screenName);
    },
    test: () => {
      firebaseLogEvent({
        eventType: "test"
      });
    }
  };
}

export function initialize() {
  rnFirebaseAnalytics().setAnalyticsCollectionEnabled(true);
}

export const firebaseAnalytics = once(() => {
  const logEvent = (eventName: string, params: object) => {
    rnFirebaseAnalytics().logEvent(eventName, params);
  };
  const setUserId = (userId: string) => {
    rnFirebaseAnalytics().setUserId(userId);
  };
  const setCurrentScreen = (screenName: string) => {
    rnFirebaseAnalytics().logScreenView({
      screen_name: screenName,
      screen_class: screenName
    });
  };
  return firebaseAnalyticsFactory(logEvent, setUserId, setCurrentScreen);
});

export function firebaseTracking<IProps, IStates>(
  trackingConsumer: (
    props: IProps,
    state: IStates,
    event: typeof firebaseAnalytics,
    args: any[]
  ) => void
): any {
  const func = async (props: IProps, state: IStates, args: any[]) => {
    trackingConsumer(props, state, firebaseAnalytics, args);
  };
  return createInjectDecorator(func);
}
