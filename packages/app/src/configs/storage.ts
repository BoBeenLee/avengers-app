import AsyncStorage from "@react-native-community/async-storage";

import { once, isJSON, isEmpty, defaultNumber } from "src/utils/common";
import { AUTH_PROVIDER } from "src/stores/AuthStore";

export type StorageType =
  | "ACCESS_ID"
  | "ACCESS_TOKEN"
  | "PROVIDER_TYPE"
  | "SHARED_ACCESS_ID";

function storageFactory(
  setItem: (key: string, value: string) => Promise<any>,
  getItem: (key: string) => Promise<string>,
  clear: () => void
) {
  const setStorageItem = (key: StorageType, value: string) => {
    return setItem(key, value);
  };

  const getStringWithDefault = async (
    key: StorageType,
    defaultItem: string
  ): Promise<string> => {
    try {
      const itemString = await getItem(key);
      return isEmpty(itemString) ? defaultItem : itemString;
    } catch (error) {
      return defaultItem;
    }
  };

  const getBooleanWithDefault = async (
    key: StorageType,
    defaultItem: boolean
  ): Promise<boolean> => {
    try {
      const itemString = await getItem(key);
      return isEmpty(itemString) ? defaultItem : itemString === "true";
    } catch (error) {
      return defaultItem;
    }
  };

  const getNumberWithDefault = async (
    key: StorageType,
    defaultItem: number
  ): Promise<number> => {
    try {
      const itemString = await getItem(key);
      return defaultNumber(itemString, defaultItem);
    } catch (error) {
      return defaultItem;
    }
  };

  const getJSONWithDefault = async <T>(
    key: StorageType,
    defaultItem: T
  ): Promise<T> => {
    try {
      const itemJSON = await getItem(key);
      if (!isJSON(itemJSON)) {
        return defaultItem;
      }
      return JSON.parse(itemJSON) as T;
    } catch (error) {
      // NOTHING
    }
    return defaultItem;
  };

  const setStorages = {
    saveToken: async ({
      provider,
      accessId,
      accessToken,
      refreshToken
    }: {
      provider: AUTH_PROVIDER;
      accessId: string;
      accessToken: string;
      refreshToken: string;
    }) => {
      await Promise.all([
        setStorageItem("PROVIDER_TYPE", provider),
        setStorageItem("ACCESS_ID", accessId),
        setStorageItem("ACCESS_TOKEN", accessToken)
      ]);
    }
  };

  const getStorages = {
    getToken: async () => {
      const [provider, accessId, accessToken] = await Promise.all([
        getStringWithDefault("PROVIDER_TYPE", "NONE"),
        getStringWithDefault("ACCESS_ID", ""),
        getStringWithDefault("ACCESS_TOKEN", "")
      ]);
      return {
        provider,
        accessId,
        accessToken
      };
    }
  };

  return {
    ...setStorages,
    ...getStorages,
    setItem,
    getStringWithDefault,
    getBooleanWithDefault,
    getNumberWithDefault,
    getJSONWithDefault,
    clear
  };
}

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
