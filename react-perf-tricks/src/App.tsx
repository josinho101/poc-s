import * as enums from "./enums";
import Color from "./typings/color";
import json from "./data/index.json";
import ColorPalette from "./colorpalette";
import React, { useState, useEffect } from "react";

const App = () => {
  const [colors, setColors] = useState<Color[]>([]);

  useEffect(() => {
    setColors(getColors());
  }, []);

  const getColors = () => {
    let colors: Color[] = JSON.parse(JSON.stringify(json));
    colors = colors.filter((i) => i.status === enums.status.active);
    return colors;
  };

  const onColorPaletteCloseClick = (id: string) => {
    const color = colors.filter(
      (i) => i.id === id && i.status === enums.status.active
    )[0];

    if (color) {
      color.status = enums.status.deleted;
      const newColors = colors.filter((i) => i.status === enums.status.active);
      setColors(newColors);
    }
  };

  const getColorPalettes = () => {
    return colors.map((color, index) => {
      return <ColorPalette color={color} onClose={onColorPaletteCloseClick} />;
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
