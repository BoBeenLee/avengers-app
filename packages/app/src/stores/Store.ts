import { flow, types } from "mobx-state-tree";
import { AppState, AppStateStatus } from "react-native";

import { isDevelopment } from "src/configs/env";
import CodePushStore from "src/stores/CodePushStore";
import { initialize as initializeAnalytics } from "src/configs/analytics";
import TodoStore from "@shared/stores/TodoStore";
import ToastStore from "@shared/stores/ToastStore";
import { initialize as initializeRequestAPI } from "@shared/apis/requestAPI";
import { initialize as initializeServer } from "@shared/apis/__mocks__/server";
import env from "src/configs/env";

const Store = types
  .model({
    appStateStatus: types.frozen<AppStateStatus>(AppState.currentState),
    codePushStore: types.optional(CodePushStore, {}),
    todoStore: types.optional(TodoStore, {}),
    toastStore: types.optional(ToastStore, {})
  })
  .actions(self => {
    const setAppStateStatus = (appState: AppStateStatus) => {
      self.appStateStatus = appState;
    };

    const initializeApp = flow(function*() {
      if (isDevelopment()) {
        initializeServer();
      }
      initializeRequestAPI(env.API_URL);
      yield self.codePushStore.initialize();
      initializeAnalytics();
    });

    return {
      setAppStateStatus,
      initializeApp
    };
  });

export type IStore = typeof Store.Type;

let store: IStore | null = null;
const getRootStore = (): IStore => {
  if (store === null) {
    store = Store.create({
      appStateStatus: AppState.currentState
    });
  }
  return store;
};

export default Store;
export { getRootStore };
