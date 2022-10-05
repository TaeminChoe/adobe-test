import React, { useRef, useState } from "react";
import { MdFindInPage } from "react-icons/md";
import { createCutoutImage } from "../service-api";

const CutoutImage = ({ showLoading, getTokenData }) => {
  const urlRef = useRef(null);
  const [previewImg, setPreviewImg] = useState(null);
  const [resultImg, setResultImg] = useState(null);

  /** 테스트링크 요청 */
  const getTestLink = () => {
    urlRef.current.value =
      "https://cdn.pixabay.com/photo/2014/04/13/20/49/cat-323262__480.jpg";
  };

  /**업로드 이미지 미리보기 */
  const showImg = () => {
    setPreviewImg(urlRef.current.value);
  };

  /** 토큰 확인 */
  const handleUrlSubmit = (e) => {
    const { value } = urlRef.current;
    const { adobeApiKey, adobeAuth, dropboxToken } = getTokenData();
    getCutoutImage(value, adobeApiKey, adobeAuth, dropboxToken);
  };

  /** Cutout API 요청 */
  const getCutoutImage = (value, adobe_api_key, adobe_auth, dropbox_token) => {
    showLoading(true);

    createCutoutImage(value, adobe_api_key, adobe_auth, dropbox_token)
      .then((res) => {
        console.log("response - API : createCutoutImage - res", res);
        const link = res?.data?.result?.link ?? null;
        setResultImg(link);
        showLoading(false);
      })
      .catch((error) => {
        console.log("Error Response - API : createCutoutImage - error", error);
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
            <button onClick={handleUrlSubmit}>CUT IMAGE</button>
          )}
        </div>
      )}
    </React.Fragment>
  );
};

export default CutoutImage;
