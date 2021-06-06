import { Class03ApiFactory } from "__generate__/api";
import { requestAPI } from "src/configs/requestAPI";

const faqControllerApi = () => Class03ApiFactory(undefined, "", requestAPI());

export const findFaqList = async () => {
  const response = await faqControllerApi().findFaqList();
  return response.data;
};
