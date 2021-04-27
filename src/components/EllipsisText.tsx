import React, { useEffect } from "react";
import { useState } from "react";

type myProps = {
  text: string;
  length: number;
  tail: string;
  tailClassName: string;
};
const EllipsisText: React.FC<myProps> = (props) => {
  let { text, length, tail, tailClassName, ...others } = props;
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    if (length - tail.length <= 0) {
      setDisplayText("");
    } else {
      setDisplayText(text.slice(0, length - tail.length));
    }
  }, []);
  if (text.length <= props.length || props.length < 0) {
    return <span {...others}>{props.text}</span>;
  } else {
    const tailStyle = {
      cursor: "auto",
    };

    return (
      <span title={props.text} {...others}>
        {displayText}
        <span style={tailStyle} className={tailClassName}>
          <button onClick={() => setDisplayText(text)}>
            {displayText.length !== text.length ? tail : ""}
          </button>
        </span>
      </span>
    );
  }
};
EllipsisText.defaultProps = { tail: "...", tailClassName: "more" };
export default EllipsisText;
