import { flow, types } from "mobx-state-tree";
import { AppState, AppStateStatus } from "react-native";

import { isDevelopment } from "src/configs/env";
import CodePushStore from "src/stores/CodePushStore";
import { initialize as initializeAnalytics } from "src/configs/analytics";
import TodoStore from "src/stores/TodoStore";
import ToastStore from "src/stores/ToastStore";
import AuthStore from "src/stores/AuthStore";
import env from "src/configs/env";

const Store = types
  .model({
    appStateStatus: types.frozen<AppStateStatus>(AppState.currentState),
    authStore: types.optional(AuthStore, {}),
    codePushStore: types.optional(CodePushStore, {}),
    todoStore: types.optional(TodoStore, {}),
    toastStore: types.optional(ToastStore, {})
  })
  .actions(self => {
    const setAppStateStatus = (appState: AppStateStatus) => {
      self.appStateStatus = appState;
    };

    const initializeApp = flow(function*() {
      yield Promise.all([
        self.codePushStore.initialize(),
        self.authStore.initialize()
      ]);
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
