import { useEffect } from "react";
import Prism from "prismjs";
import PropTypes from "prop-types";
// eslint-disable-next-line
const CodeBlock = ({ className = "lang-js", children }) => {
  const language = className.replace("lang-", "");

  useEffect(() => {
    if (typeof window !== "undefined") {
      Prism.highlightAll();
    }
  }, []);
  return (
    <pre>
      <code className={`language-${language}`}>{children}</code>
    </pre>
  );
};

CodeBlock.propTypes = {
  className: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default CodeBlock;
