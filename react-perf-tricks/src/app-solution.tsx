import * as enums from "./enums";
import Color from "./typings/color";
import json from "./data/index.json";
import ColorPalette from "./colorpalette";
import React, { useState, useEffect, useCallback } from "react";

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

  // useCallback to get a memoized version of callback
  const handleClose = useCallback((id: string) => {
    setColors((c) => c.filter((i) => i.id !== id));
  }, []);

  const getColorPalettes = () => {
    return colors.map((color, index) => {
      // Adding key that won't change will help you improve preformance
      // by not rendering unwanted items in a list of components
      return (
        <ColorPalette key={color.id} color={color} onClose={handleClose} />
      );
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
