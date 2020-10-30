import React from "react";
import Color from "./typings/color";
import json from "./data/index.json";
import ColorPalette from "./colorpalette";

const App = () => {
  let colors: Color[] = JSON.parse(JSON.stringify(json));

  const onColorPaletteClicked = (id: string) => {};

  const getColorPalettes = () => {
    return colors.map((color, index) => {
      return <ColorPalette color={color} onClick={onColorPaletteClicked} />;
    });
  };

  return (
    <React.Fragment>
      <div className="grid-title">Total color palettes : {colors.length}</div>
      <div className="grid-container">{getColorPalettes()}</div>
    </React.Fragment>
  );
};

export default App;
