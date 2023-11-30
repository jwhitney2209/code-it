import CodeSvg from "../assets/code.svg?react";
import PropTypes from "prop-types";

const IconSvg = ({options}) => {
  return <CodeSvg className={options} />;
};

IconSvg.propTypes = {
  options: PropTypes.string.isRequired,
};

export default IconSvg;
