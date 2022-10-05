import React, { useEffect, useRef, useState } from "react";
import { MdFindInPage } from "react-icons/md";
import Form from "react-bootstrap/Form";
import { createEditImage } from "../service-api";

const EditImage = ({ showLoading, getTokenData }) => {
  const urlRef = useRef(null);
  const [previewImg, setPreviewImg] = useState(null);
  const [resultImg, setResultImg] = useState(null);
  const [editData, setEditData] = useState(null);
  useEffect(() => {
    if (!editData) {
      setEditData({
        Saturation: 0,
        Contrast: 0,
        Highlights: 0,
        Shadows: 0,
        Blacks: 0,
        Texture: 0,
      });
    } else {
      const { value } = urlRef.current;
      const { adobeApiKey, adobeAuth, dropboxToken } = getTokenData();
      if (urlRef.current.value) {
        createEditImage(value, adobeApiKey, adobeAuth, dropboxToken, editData)
          .then((res) => {
            console.log("response - API : createEditImage - res", res);
            const link = res?.data?.result?.link ?? null;
            setResultImg(link);
            showLoading(false);
          })
          .catch((error) => {
            console.log(
              "Error Response - API : createEditImage - error",
              error
            );
            showLoading(false);
            alert("에러발생");
          });
      }
    }
  }, [editData]);

  /** 테스트링크 요청 */
  const getTestLink = () => {
    urlRef.current.value =
      "https://cdn.pixabay.com/photo/2016/01/05/17/51/maltese-1123016__480.jpg";
  };

  /**업로드 이미지 미리보기 */
  const showImg = () => {
    setPreviewImg(urlRef.current.value);
  };

  /** 토큰 확인 */
  const handleUrlSubmit = (e) => {
    const editName = e.target.name;
    const editValue = e.target.value;

    showLoading(true);
    setEditData((editData) => {
      return { ...editData, [editName]: Number(editValue) };
    });
  };

  return (
    <React.Fragment>
      <div className="link_box">
        <input type="text" ref={urlRef} placeholder="image link" />
        <button onClick={getTestLink}>TEST LINK</button>
        <MdFindInPage onClick={showImg} className="icon_style" />
      </div>
      <div className="edit_layout">
        <div className="img_box">
          <img id="preview" src={resultImg ? resultImg : previewImg} />
        </div>
        {previewImg && (
          <div className="submit_box">
            <div className="edit_box">
              <Form.Label className="edit_text">Saturation</Form.Label>
              <Form.Range
                name="Saturation"
                onClick={handleUrlSubmit}
                min={-100}
                max={100}
              />
            </div>
            <div className="edit_box">
              <Form.Label className="edit_text">Contrast</Form.Label>
              <Form.Range
                name="Contrast"
                onClick={handleUrlSubmit}
                min={-100}
                max={100}
              />
            </div>
            <div className="edit_box">
              <Form.Label className="edit_text">Highlights</Form.Label>
              <Form.Range
                name="Highlights"
                onClick={handleUrlSubmit}
                min={-100}
                max={100}
              />
            </div>
            <div className="edit_box">
              <Form.Label className="edit_text">Shadows</Form.Label>
              <Form.Range
                name="Shadows"
                onClick={handleUrlSubmit}
                min={-100}
                max={100}
              />
            </div>
            <div className="edit_box">
              <Form.Label className="edit_text">Blacks</Form.Label>
              <Form.Range
                name="Blacks"
                onClick={handleUrlSubmit}
                min={-100}
                max={100}
              />
            </div>
            <div className="edit_box">
              <Form.Label className="edit_text">Texture</Form.Label>
              <Form.Range
                name="Texture"
                onClick={handleUrlSubmit}
                min={-100}
                max={100}
              />
            </div>
            {resultImg && <a href={resultImg}>DOWNLOAD</a>}
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default EditImage;
