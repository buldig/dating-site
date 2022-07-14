import React from "react";
import { useHistory } from "react-router-dom";

const BackButton = () => {
  const history = useHistory();
  return (
    <>
      <button className="btn btn-primary" onClick={() => history.goBack()}>
        <i className="bi bi-caret-left"></i>
        назад
      </button>
    </>
  );
};

export default BackButton;
