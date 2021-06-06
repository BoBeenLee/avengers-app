import { Class02APIApiFactory } from "__generate__/api";
import { requestAPI } from "src/configs/requestAPI";

const authenticationControllerApi = () =>
  Class02APIApiFactory(undefined, "", requestAPI());

export const findTodayAuthorizeCount = async (deviceId: string) => {
  const response = await authenticationControllerApi().findTodayAuthorizeCount(
    deviceId
  );
  return response.data;
};

export const tryAuthentication = async (deviceId: string) => {
  const response = await authenticationControllerApi().tryAuthentication(
    deviceId
  );
  return response.data;
};
