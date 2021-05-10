import rnFirebaseRemoteConfig from "@react-native-firebase/remote-config";

import { remoteConfigFactory } from "@shared/configs/remoteConfig";
import { once } from "@shared/utils/common";

const buildRemoteConfig = once(async () => {
  const remoteConfig = rnFirebaseRemoteConfig();
  remoteConfig.setDefaults({});
  await remoteConfig.fetch(0);
  remoteConfig.fetchAndActivate();
  return remoteConfig;
});

export const firebaseRemoteConfig = once(() => {
  const getStringValue = async (key: string) => {
    const remoteConfig = await buildRemoteConfig();
    const value = await remoteConfig.getValue(key);
    return value.asString();
  };
  const getBooleanValue = async (key: string) => {
    const remoteConfig = await buildRemoteConfig();
    const value = await remoteConfig.getValue(key);
    return value.asBoolean();
  };
  return remoteConfigFactory(getStringValue, getBooleanValue);
});
