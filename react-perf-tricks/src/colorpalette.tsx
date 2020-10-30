import Color from "./typings/color";
import React, { useState } from "react";

interface Props {
  color: Color;
  onClick: (id: string) => void;
}

const ColorPalette: React.FunctionComponent<Props> = (props) => {
  const { color, onClick } = props;
  const [classList, setCssClass] = useState("close hide");
  const style: React.CSSProperties = { backgroundColor: color.data };

  const onMouseOver = () => {
    setCssClass("close");
  };

  const onMouseOut = () => {
    setCssClass("close hide");
  };

  return (
    <div
      id={color.id}
      style={style}
      className="grid-item"
      onMouseOut={onMouseOut}
      onMouseOver={onMouseOver}
    >
      {color.data}
      <span
        onClick={() => {
          onClick(color.id);
        }}
        className={classList}
        title="Close"
      >
        &times;
      </span>
    </div>
  );
};

export default ColorPalette;
