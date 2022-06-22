import React from "react";
import PropTypes from "prop-types";

const InputSearch = ({ onChangeName, value }) => {
  return (
    <input
      type="text"
      placeholder="Search..."
      value={value}
      onChange={onChangeName}
    ></input>
  );
};

InputSearch.propTypes = {
  onChangeName: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired
};

export default InputSearch;
