import _ from "lodash";
import { SecretItem } from "src/interfaces/secret";

export const mockSecretItems: SecretItem[] = _.times(100, index => {
  return {
    id: `${index}`,
    createdAt: String(new Date().valueOf()),
    content: `학생때는 주변사람들과 오래 접촉할 시간이나 사람을 깊게 알아갈 시간도 많기도 하고 주변 풀에서 만날 수 있는 자만추가 상대적으로 가능했지만`,
    commentCount: 0,
    comments: []
  };
});
