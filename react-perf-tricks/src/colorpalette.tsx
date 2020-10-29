import React from "react";
import Color from "./typings/color";

const ColorPalette: React.FunctionComponent<Color> = ({ id, data }: Color) => {
  const style: React.CSSProperties = { backgroundColor: data };
  return (
    <div id={id} style={style} className="grid-item">
      {data}
    </div>
  );
};

export default ColorPalette;
