import { BASE_URL } from "./URLs";
import axios from "axios";

// import { DeviceUUID } from "device-uuid";

export function axiosFn(
  method,
  url,
  recivedData,
  contentType = "application/json"
) {
  let data = {
    ...recivedData,
  };
  return axios({
    method,
    url: BASE_URL + url,
    data,
  });
}

export function handleError(err) {
  let errMsg = "Something went wrong!";

  // if (err.response) errMsg = err.response.data.message;
  if (err.response) errMsg = err.response.data.error;
  return {
    res: null,
    err: errMsg,
  };
}

export function defaultRes(res) {
  console.log(res);
  return {
    res: res.data.data,
    err: null,
  };
}
