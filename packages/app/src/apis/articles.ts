import {
  Class04APIV1ApiFactory,
  ArticleWriteRequest,
  Pageable
} from "__generate__/api";
import { requestAPI } from "src/configs/requestAPI";

const articleControllerApi = () =>
  Class04APIV1ApiFactory(undefined, "", requestAPI());

export const articleWrite = async (request: ArticleWriteRequest) => {
  const response = await articleControllerApi().articleWrite(request);
  return response.data;
};

export const findArticleList = async (pageable: Pageable) => {
  const response = await articleControllerApi().findArticleList(pageable);
  return response.data;
};
