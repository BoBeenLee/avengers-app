import { Dimensions, Platform, StatusBar } from "react-native";
import DeviceInfo from "react-native-device-info";

const dimen = Dimensions.get("window");

export const os = Platform.OS;

export const isAndroid = Platform.OS === "android";

export const isIOS = Platform.OS === "ios";

export const isIphoneX =
  Platform.OS === "ios" &&
  (dimen.height === 812 ||
    dimen.width === 812 ||
    dimen.height === 896 ||
    dimen.width === 896);

export const ifIphoneX = (iphoneXStyle: any, regularStyle: any) => {
  if (isIphoneX) {
    return iphoneXStyle;
  }
  return regularStyle;
};

export const androidStatusBarHeight = (() => {
  if (isAndroid) {
    return StatusBar.currentHeight;
  }
  return 0;
})();

export const iosStatusBarHeight = (safe: boolean) => {
  if (isIOS) {
    return ifIphoneX(safe ? 44 : 30, 20);
  }
  return 0;
};

export const getStatusBarHeight = (safe: boolean) => {
  return Platform.select({
    android: androidStatusBarHeight,
    ios: iosStatusBarHeight(safe)
  });
};

export const getBottomSpace = isIphoneX ? 34 : 0;

export const deviceWidth = Dimensions.get("window").width;

export const deviceHeight = Dimensions.get("window").height;

export const version = DeviceInfo.getVersion();

export const buildNumber = DeviceInfo.getBuildNumber();

export const uniqueID = DeviceInfo.getUniqueId();

export const conditionHeight = (
  androidHeight: number,
  iosHeight: number,
  iphoneXHeight: number
) => {
  if (isIphoneX) {
    return iphoneXHeight;
  }
  if (isIOS) {
    return iosHeight;
  }
  return androidHeight;
};
