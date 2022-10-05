import axios from "axios";

// const SERVER_URL = "https://web-part-manager.herokuapp.com";
// const SERVER_URL = "http://localhost:9500";
const SERVER_URL = "https://adobe-temm.herokuapp.com/";

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

function createCutoutImage(value, adobeApiKey, adobeAuth, dropboxToken) {
  const url = `${SERVER_URL}/cutout`;
  const param = {
    url: value,
    adobeApiKey,
    adobeAuth,
    dropboxToken,
  };
  console.log("Request-API : createCutoutImage - url ", url);
  console.log("Request-API : createCutoutImage - param ", param);

  return axios.post(url, param);
}

function createFilterImage(
  value,
  adobeApiKey,
  adobeAuth,
  dropboxToken,
  options
) {
  const url = `${SERVER_URL}/filter`;
  const param = {
    url: value,
    adobeApiKey,
    adobeAuth,
    dropboxToken,
    options,
  };
  console.log("Request-API : createFilterImage - url ", url);
  console.log("Request-API : createFilterImage - param ", param);
  console.log("api data", param);
  return axios.post(url, param);
}

export { getUserList, createCutoutImage, createFilterImage };
