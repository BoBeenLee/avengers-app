import { Class03ApiFactory } from "__generate__/api";
import { requestAPI } from "src/configs/requestAPI";

const noticeControllerApi = () =>
  Class03ApiFactory(undefined, "", requestAPI());

export const findNoticeList = async () => {
  const response = await noticeControllerApi().findNoticeList();
  return response.data;
};
