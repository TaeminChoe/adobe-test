import axios from "axios";

// const SERVER_URL = "https://web-part-manager.herokuapp.com";
// const SERVER_URL = "http://localhost:9500";
const SERVER_URL = "https://adobe-cutout-test.herokuapp.com";

/** 사용자 조회 API 요청 */
function getUserList() {
  return axios.get(`${SERVER_URL}/user`);
}

/** 이미지 업로드 API 요청*/
// function createUploadImage(param) {
//   return axios.post(`${SERVER_URL}/single/upload`, param, {
//     headers: {
//       "Content-Type": `multipart/form-data; `,
//     },
//   });
// }

function createCutoutImage(value, adobe_api_key, adobe_auth, dropbox_token) {
  const url = `${SERVER_URL}/cutout`;
  const param = {
    url: value,
    adobe_api_key,
    adobe_auth,
    dropbox_token,
  };
  console.log("Request-API : createCutoutImage - url ", url);
  console.log("Request-API : createCutoutImage - param ", param);

  return axios.post(url, param);
}

function createEditImage(
  value,
  adobe_api_key,
  adobe_auth,
  dropbox_token,
  options
) {
  const url = `${SERVER_URL}/edit`;
  const param = {
    url: value,
    adobe_api_key,
    adobe_auth,
    dropbox_token,
    options,
  };
  console.log("Request-API : createEditImage - url ", url);
  console.log("Request-API : createEditImage - param ", param);
  console.log("api data", param);
  return axios.post(url, param);
}

export { getUserList, createCutoutImage, createEditImage };
