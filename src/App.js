import "./App.css";
import "./dist/custom.css";
import logo from "./dist/logo.png";
import React, { useRef, useState } from "react";
import CutoutImage from "./components/CutoutImage";
import FilterImage from "./components/FilterImage";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [openCategory, setOpenCategory] = useState(null);
  const adobeApiKey = useRef(null);
  const adobeAuth = useRef(null);
  const dropboxToken = useRef(null);

  /** 카테고리 별 페이지 open */
  const handleOpenCategory = (e) => {
    switch (e.target.name) {
      case "cutout":
        setOpenCategory("cutout");
        break;
      case "filter":
        setOpenCategory("filter");
        break;
    }
  };

  const showLoading = (boolean) => {
    setIsLoading(boolean);
  };

  /** ref를 통하여 인증값들을 반환한다 */
  const getTokenData = () => {
    return {
      adobeApiKey: adobeApiKey.current.value,
      adobeAuth: adobeAuth.current.value,
      dropboxToken: dropboxToken.current.value,
    };
  };

  return (
    <div className="App ">
      {isLoading && (
        <div className="loading_box">
          <div className="header_text">LOADING</div>
          <div id="loading"></div>
        </div>
      )}
      <div className="main_box">
        <img className="adobe_logo" src={logo} />
        <div className="header_text">TOKEN</div>
        <div className="token_box">
          <input
            type="text"
            placeholder="adobe api key"
            ref={adobeApiKey}
            name="adobe_api_key"
          />
          <input
            type="text"
            placeholder="adobe auth"
            ref={adobeAuth}
            name="adobe_auth"
          />
          <input
            type="text"
            placeholder="dropbox token"
            ref={dropboxToken}
            name="dropbox_token"
          />
        </div>
        <div>
          <div className="header_text">IMAGE CONVERT</div>
          <button
            className="header_text"
            name="cutout"
            onClick={handleOpenCategory}
          >
            CUT IMAGE
          </button>
          <button
            className="header_text"
            name="filter"
            onClick={handleOpenCategory}
          >
            FILTER
          </button>
        </div>
        {openCategory == "cutout" && (
          <CutoutImage showLoading={showLoading} getTokenData={getTokenData} />
        )}
        {openCategory == "filter" && (
          <FilterImage getTokenData={getTokenData} showLoading={showLoading} />
        )}
      </div>
    </div>
  );
}

export default App;
