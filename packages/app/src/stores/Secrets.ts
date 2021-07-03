import _ from "lodash";
import { flow, types } from "mobx-state-tree";

import { SecretItem } from "src/interfaces/secret";
import { mockSecretItems } from "src/__mocks__/data";

interface IVariables {
  q: string;
}

const Secrets = types
  .model("Secrets", {
    isRefresh: types.optional(types.boolean, false),
    data: types.optional(types.array(types.frozen<SecretItem>()), []),
    variables: types.optional(types.frozen<IVariables>(), {
      q: ""
    })
  })
  .views(self => {
    return {
      get secretItemViews() {
        return Array.from(self.data);
      },
      get isEmpty() {
        return this.secretItemViews.length === 0;
      }
    };
  })
  .actions(self => {
    const clear = () => {
      self.isRefresh = false;
      self.data.clear();
    };

    const fetch = () => {
      self.data.replace(mockSecretItems);
    };

    const initialize = (variables: IVariables) => {
      self.variables = variables;
      clear();
      fetch();
    };

    const refresh = () => {
      if (self.isRefresh) {
        return;
      }
      self.isRefresh = true;
      clear();
      fetch();
      self.isRefresh = false;
    };

    return {
      clear,
      initialize,
      refresh
    };
  });

export type ISecrets = typeof Secrets.Type;

export default Secrets;
