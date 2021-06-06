import {
  Class01APIV1ApiFactory,
  LoginRequest,
  SignupRequest
} from "__generate__/api";
import { requestAPI } from "src/configs/requestAPI";

const userControllerApi = () =>
  Class01APIV1ApiFactory(undefined, "", requestAPI());

export const login = async (request: LoginRequest) => {
  const response = await userControllerApi().login(request);
  return response.data;
};

export const signup = async (request: SignupRequest) => {
  const response = await userControllerApi().signup(request);
  return response.data;
};
