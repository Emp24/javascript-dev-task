import * as URL from "./URLs";

import { axiosFn, handleError } from "./Axios";

export async function getQuestions() {
  return await axiosFn("get", `${URL.QUESTIONS}`)
    .then((res) => {
      return {
        res: res.data,
        err: null,
        status: res?.status,
      };
    })
    .catch(handleError);
}
export async function getQuestionsAPI() {
  let { err, res, status } = await getQuestions();

  return { err, res, status };
}
