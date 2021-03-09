import * as PIXI from "pixi.js";
import { Grid, Slider, Box } from "@material-ui/core";
import { useRef, useEffect, useState } from "react";

function App() {
  const rootRef = useRef();
  const renderer = useRef();
  const stage = useRef();
  const canvasSize = 600;

  const width = 100;
  const height = 50;
  const x = canvasSize / 2 - width / 2;
  const y = canvasSize / 2 - height / 2;
  const dx = x + width / 2;
  const dy = y + height / 2;

  const [rotateAngle, setRotateAngle] = useState(0);
  const [zoomScale, setZoomScale] = useState(3);
  const [pivotX, setPivotX] = useState(dx);
  const [pivotY, setPivotY] = useState(dy);

  const angleToRad = (angle) => +((angle * Math.PI) / 180).toFixed(5);

  const handleRotateChange = (event, value) => {
    setRotateAngle(value);
  };

  const handleZoomChange = (event, value) => {
    setZoomScale(value);
  };

  const handlePivotXChange = (event, value) => {
    setPivotX(value);
  };

  const handlePivotYChange = (event, value) => {
    setPivotY(value);
  };

  useEffect(() => {
    renderer.current = PIXI.autoDetectRenderer(canvasSize, canvasSize, {
      transparent: true,
      antialias: true,
    });

    rootRef.current.appendChild(renderer.current.view);

    return () => {
      renderer.current.destroy(true);
      renderer.current = null;
    };
  }, []);

  useEffect(() => {
    draw(rotateAngle, zoomScale, pivotX, pivotY);
  }, [rotateAngle, zoomScale, pivotX, pivotY]);

  const draw = (angle, zoomScale, pivotX, pivotY) => {
    // initialize stage
    stage.current = new PIXI.Container(0x000000, true);

    /**
     * Applying pivot, position to graphics and stage are same.
     * See sample in StageRotator.js file.
     */

    // rect object
    const rectGraphics = new PIXI.Graphics();
    rectGraphics.lineStyle(1, 0xff0000);
    rectGraphics.drawRect(x, y, width, height);
    rectGraphics.endFill();
    rectGraphics.scale.set(zoomScale);
    rectGraphics.position.set(pivotX, pivotY);
    rectGraphics.pivot.set(pivotX, pivotY);
    rectGraphics.rotation = angleToRad(angle);
    stage.current.addChild(rectGraphics);

    // center
    const centerPointGraphics = new PIXI.Graphics();
    centerPointGraphics.beginFill(0x00ff00);
    centerPointGraphics.drawCircle(dx, dy, 2);
    centerPointGraphics.endFill();
    centerPointGraphics.scale.set(zoomScale);
    centerPointGraphics.position.set(pivotX, pivotY);
    centerPointGraphics.pivot.set(pivotX, pivotY);
    stage.current.addChild(centerPointGraphics);

    // pivot
    const pivotGraphics = new PIXI.Graphics();
    pivotGraphics.beginFill(0x0000ff);
    pivotGraphics.drawCircle(dx, dy, 2);
    pivotGraphics.endFill();
    pivotGraphics.scale.set(zoomScale);
    pivotGraphics.position.set(dx, dy);
    pivotGraphics.pivot.set(dx, dy);
    stage.current.addChild(pivotGraphics);

    //render stage
    renderer.current.render(stage.current);
  };

  return (
    <Grid container spacing={2}>
      <Grid item lg={5} style={{ display: "flex", placeContent: "center" }}>
        <div
          ref={rootRef}
          style={{
            width: canvasSize,
            height: canvasSize,
            border: "1px solid grey",
          }}
        />
      </Grid>
      <Grid item lg={2}>
        Rotate angle: {rotateAngle}
        <Slider
          value={rotateAngle}
          max={360}
          onChange={handleRotateChange}
          aria-labelledby="continuous-slider"
        />
        Zoom scale: {zoomScale}
        <Slider
          max={5}
          min={1}
          step={0.5}
          value={zoomScale}
          onChange={handleZoomChange}
          aria-labelledby="continuous-slider"
        />
        Pivot-X point: {pivotX}
        <Slider
          max={canvasSize}
          min={0}
          step={0.1}
          value={pivotX}
          onChange={handlePivotXChange}
          aria-labelledby="continuous-slider"
        />
        Pivot-Y point: {pivotY}
        <Slider
          max={canvasSize}
          min={0}
          step={0.1}
          value={pivotY}
          onChange={handlePivotYChange}
          aria-labelledby="continuous-slider"
        />
      </Grid>
      <Grid item lg={12}>
        <Box>
          <b>
            Note:{" "}
            <i>
              Blue dot is center and green dot is pivot of rect. Any
              rotation/scaling added to graphics will be applied with respect to
              that point. So if they are same, then rotation/scaling will happen
              from rect center.
            </i>
          </b>
        </Box>
      </Grid>
    </Grid>
  );
}

export default App;
