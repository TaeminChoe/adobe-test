import axios from "axios";

// const SERVER_URL = "https://web-part-manager.herokuapp.com";
// const SERVER_URL = "http://localhost:9500";
const SERVER_URL = "https://taeminchoe.github.io/adobe-test/";

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

function getImage(filename) {
  const url = `${SERVER_URL}/image`;
  const param = {
    filename,
    test: "test",
  };
  console.log("Request-API : getImage - url ", url);
  console.log("Request-API : getImage - param ", param);
  return axios({
    method: "GET",
    url: url,
    params: param,
    responseType: "blob",
  });
  // return axios.get(url, { params: param });
}

/** 요청한 API의 응답 이미지가 서버에 적재 되었는지 확인 요청 API*/
function getImageStatus(value, adobe_api_key, adobe_auth) {
  const url = `${SERVER_URL}/image/status`;
  const param = {
    url: value,
    adobe_api_key,
    adobe_auth,
  };
  console.log("Request-API : createCutoutImage - url ", url);
  console.log("Request-API : createCutoutImage - param ", param);

  return axios.post(url, param);
}

/** 일정 시간(1초)마다 적재된 이미지 상태값 확인 */
function checkImageStatus(href, adobe_api_key, adobe_auth) {
  return new Promise((resolve, reject) => {
    const inter = setInterval(() => {
      getImageStatus(href, adobe_api_key, adobe_auth)
        .then((statusRes) => {
          const { status } = JSON.parse(statusRes.data.result);
          console.log("ytw status ", status);
          if (status !== "running") {
            clearInterval(inter);
            resolve(status);
          }
        })
        .catch((err) => {
          console.log("ytw err", err);
          clearInterval(inter);
          reject(err);
        });
    }, 1000);
  });
}

/** 배경 지우기 기능 API 요청 */
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

function createCropImage(
  value,
  adobe_api_key,
  adobe_auth,
  dropbox_token,
  options
) {
  const url = `${SERVER_URL}/productCrop`;
  const param = {
    url: value,
    adobe_api_key,
    adobe_auth,
    dropbox_token,
    options,
  };
  console.log("Request-API : createCropImage - url ", url);
  console.log("Request-API : createCropImage - param ", param);

  return axios.post(url, param);
}

export {
  getImageStatus,
  getImage,
  checkImageStatus,
  getUserList,
  createCutoutImage,
  createEditImage,
  createCropImage,
};
