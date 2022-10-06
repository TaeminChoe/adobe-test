import React, { useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import { MdFindInPage } from "react-icons/md";
import { createCropImage } from "../service-api";

const CropImage = ({ showLoading, getTokenData }) => {
  const urlRef = useRef(null);
  const [unitRadio, setUnitRadio] = useState("Pixel");
  const widthRef = useRef(null);
  const heightRef = useRef(null);
  const [previewImg, setPreviewImg] = useState(null);
  const [resultImg, setResultImg] = useState(null);

  /** 테스트링크 요청 */
  const getTestLink = () => {
    urlRef.current.value =
      "https://media.istockphoto.com/photos/rabbit-picture-id1384771258?b=1&k=20&m=1384771258&s=170667a&w=0&h=WqwuiJ7_r-VP-gxbkEKtXW-O0pOeblFpO218M3YQJrc=";
  };

  /** 업로드 이미지 미리보기 */
  const showImg = () => {
    setPreviewImg(urlRef.current.value);
  };

  /** 라디오 값 핸들링*/
  const handleRadio = (e) => {
    setUnitRadio(e.target.id);
  };

  /** 토큰 확인 */
  const handleUrlSubmit = (e) => {
    const { value } = urlRef.current;
    const { adobeApiKey, adobeAuth, dropboxToken } = getTokenData();
    let width = Number(widthRef.current.value) || 100;
    let height = Number(heightRef.current.value) || 100;
    let options = { unit: unitRadio, width: width, height: height };

    getCropImage(value, adobeApiKey, adobeAuth, dropboxToken, options);
  };

  /** Crop API 요청 */
  const getCropImage = (
    value,
    adobe_api_key,
    adobe_auth,
    dropbox_token,
    options
  ) => {
    showLoading(true);

    createCropImage(value, adobe_api_key, adobe_auth, dropbox_token, options)
      .then((res) => {
        console.log("response - API : createCropImage - res", res);
        const link = res?.data?.result?.link ?? null;
        setResultImg(link);
        showLoading(false);
      })
      .catch((error) => {
        console.log("Error Response - API : createCropImage - error", error);
        showLoading(false);
        alert("에러발생");
      });
  };

  return (
    <React.Fragment>
      <div className="link_box">
        <input type="text" ref={urlRef} placeholder="image link" />
        <button onClick={getTestLink}>TEST LINK</button>
        <MdFindInPage onClick={showImg} className="icon_style" />
      </div>
      <div className="img_box">
        <img id="preview" src={resultImg ? resultImg : previewImg} />
      </div>
      {previewImg && (
        <div className="submit_box">
          {resultImg ? (
            <a href={resultImg}>DOWNLOAD</a>
          ) : (
            <div className="crop_box">
              <Form>
                <Form.Check
                  inline
                  id="pixel"
                  label="pixel"
                  name="unit"
                  type="radio"
                  defaultChecked
                  onClick={handleRadio}
                />
                <Form.Check
                  inline
                  id="percent"
                  label="percent"
                  name="unit"
                  type="radio"
                  onClick={handleRadio}
                />
              </Form>
              <div>Width :</div>
              <input
                type="text"
                placeholder="100"
                ref={widthRef}
                className="input-box"
              />
              <div>Height :</div>
              <input
                type="text"
                placeholder="100"
                ref={heightRef}
                className="input-box"
              />
              <button onClick={handleUrlSubmit}>CROP IMAGE</button>
            </div>
          )}
        </div>
      )}
    </React.Fragment>
  );
};

export default CropImage;
