import * as URL from "./URLs";

import { axiosFn, handleError } from "./Axios";

export async function postScore(score) {
  const data = {
    score: score,
  };
  return await axiosFn("post", `${URL.SCORES}`, data)
    .then((res) => {
      return {
        res: res.data,
        err: null,
        status: res?.status,
      };
    })
    .catch(handleError);
}
export async function postScoreAPI(score) {
  let { err, res, status } = await postScore(score);

  return { err, res, status };
}
