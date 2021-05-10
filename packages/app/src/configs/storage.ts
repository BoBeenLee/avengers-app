import AsyncStorage from "@react-native-community/async-storage";

import { storageFactory } from "@shared/configs/storage";
import { once, isEmpty, filterNull } from "@shared/utils/common";

export const storage = once(() => {
  const setItem = async (key: string, value: string) => {
    AsyncStorage.setItem(key, value);
  };

  const getItem = async (key: string): Promise<string> => {
    const response = await AsyncStorage.getItem(key);
    return response ?? "";
  };

  const clear = () => {
    return AsyncStorage.clear();
  };
  return storageFactory(setItem, getItem, clear);
});
