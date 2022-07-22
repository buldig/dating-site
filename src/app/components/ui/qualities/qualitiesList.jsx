import React from "react";
import PropTypes from "prop-types";
import Qualitie from "./qualitie";
import { useQualities } from "../../../hooks/useQualities";

const QualitiesList = ({ qualitiesList }) => {
  const { isLoading, getQuality } = useQualities();

  const arr = qualitiesList.map((quality) => getQuality(quality));
  if (!isLoading) {
    return arr.map((qual) => <Qualitie key={qual._id} {...qual} />);
  } else return "Loadng...";
};

QualitiesList.propTypes = {
  qualitiesList: PropTypes.array.isRequired
};
export default QualitiesList;
