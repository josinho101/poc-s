import * as PIXI from "pixi.js";
import { useRef, useEffect, useState } from "react";
import { IconButton, Tooltip } from "@material-ui/core";
import { TabUnselectedRounded, ZoomIn, ZoomOut } from "@material-ui/icons";

function App() {
  const rootRef = useRef();
  const renderer = useRef();
  const stage = useRef();
  const stagePos = useRef({});
  const panStartPosition = useRef({ x: 0, y: 0 });

  const [panStarted, setPanStarted] = useState(false);
  const [enableDraw, setEnableDraw] = useState(false);
  const canvasSize = 500;

  const mouseDownPosition = useRef(null);
  const rectGraphics = useRef(new PIXI.Graphics());

  const draw = () => {
    stage.current = new PIXI.Container();
    const graphics = new PIXI.Graphics();
    const centerX = canvasSize / 2;
    const centerY = canvasSize / 2;
    const circleRadius = 200;
    const otherCircleOffset = 100;

    graphics.beginFill(0xff0000);
    graphics.drawCircle(centerX, centerY, circleRadius);
    graphics.endFill(0xff0000);

    graphics.beginFill(0x00ff00);
    graphics.drawCircle(centerX, centerY + otherCircleOffset, 10);
    graphics.endFill(0xff0000);

    graphics.beginFill(0x00ff00);
    graphics.drawCircle(centerX + otherCircleOffset, centerY, 10);
    graphics.endFill(0xff0000);

    graphics.beginFill(0x00ff00);
    graphics.drawCircle(centerX, centerY - otherCircleOffset, 10);
    graphics.endFill(0xff0000);

    graphics.beginFill(0x00ff00);
    graphics.drawCircle(centerX - otherCircleOffset, centerY, 10);
    graphics.endFill(0xff0000);

    graphics.beginFill(0x0000ff);
    graphics.drawCircle(centerX, centerY, 5);
    graphics.endFill();

    stage.current.pivot.set(centerX, centerY);
    stage.current.position.set(centerX, centerY);

    stage.current.addChild(graphics);
  };

  useEffect(() => {
    renderer.current = PIXI.autoDetectRenderer(canvasSize, canvasSize, {
      antialias: true,
      backgroundColor: 0x000000,
    });

    draw();
    rootRef.current.appendChild(renderer.current.view);
    stage.current.interactive = true;
    stage.current.addChild(rectGraphics.current);
    requestAnimationFrame(animate);

    return () => {
      renderer.current.destroy(true);
      renderer.current = null;
    };
  }, []);

  const animate = () => {
    requestAnimationFrame(animate);
    renderer.current.render(stage.current);
  };

  const onMouseDown = (e) => {
    const { offsetX, offsetY } = e.nativeEvent;
    panStartPosition.current.x = offsetX;
    panStartPosition.current.y = offsetY;
    setPanStarted(true);
    stagePos.current.x = stage.current.x;
    stagePos.current.y = stage.current.y;
    mouseDownPosition.current = { x: offsetX, y: offsetY };
  };

  const onMouseMove = (e) => {
    if (enableDraw && mouseDownPosition.current !== null) {
      const { offsetX, offsetY } = e.nativeEvent;
      const startPosition = mouseDownPosition.current;
      const scale = stage.current.scale;
      const stageBounds = stage.current.getBounds();
      const stageLocalBounds = stage.current.getLocalBounds();

      const stageOffsetX = stageLocalBounds.x * scale.x;
      const stageOffsetY = stageLocalBounds.x * scale.y;

      const x = (startPosition.x - stageBounds.x + stageOffsetX) / scale.x;
      const y = (startPosition.y - stageBounds.y + stageOffsetY) / scale.y;
      const width = (offsetX - startPosition.x) / scale.x;
      const height = (offsetY - startPosition.y) / scale.y;

      rectGraphics.current.clear();
      rectGraphics.current.lineStyle(1, 0xffffff);
      rectGraphics.current.drawRect(x, y, width, height);
      rectGraphics.current.endFill();
    } else {
      if (panStarted === true) {
        const { offsetX, offsetY } = e.nativeEvent;
        const dx = offsetX - panStartPosition.current.x;
        const dy = offsetY - panStartPosition.current.y;

        stage.current.x = stagePos.current.x + dx;
        stage.current.y = stagePos.current.y + dy;
      }
    }
  };

  const onMouseUp = (e) => {
    setPanStarted(false);
    panStartPosition.current = {};
    stagePos.current = {};
    mouseDownPosition.current = null;
  };

  const onWheel = (e) => {
    const { deltaY, offsetX, offsetY } = e.nativeEvent;
    zoom(-deltaY, offsetX, offsetY);
  };

  const onZoomClick = (direction) => {
    const centerX = canvasSize / 2;
    const centerY = canvasSize / 2;
    zoom(direction === "+" ? 1 : -1, centerX, centerY);
  };

  const zoom = (s, x, y) => {
    s = s > 0 ? 2 : 0.5;
    const pixiStage = stage.current;
    var worldPos = {
      x: (x - pixiStage.x) / pixiStage.scale.x,
      y: (y - pixiStage.y) / pixiStage.scale.y,
    };
    var newScale = { x: pixiStage.scale.x * s, y: pixiStage.scale.y * s };

    var newScreenPos = {
      x: worldPos.x * newScale.x + pixiStage.x,
      y: worldPos.y * newScale.y + pixiStage.y,
    };

    pixiStage.x -= newScreenPos.x - x;
    pixiStage.y -= newScreenPos.y - y;
    pixiStage.scale.x = newScale.x;
    pixiStage.scale.y = newScale.y;
  };

  const enableDrawClick = () => {
    setEnableDraw((s) => !s);
  };

  return (
    <div
      style={{
        display: "flex",
        width: canvasSize,
        cursor: enableDraw
          ? "crosshair"
          : panStarted === true
          ? "grabbing"
          : "grab",
      }}
    >
      <div
        ref={rootRef}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseOut={onMouseUp}
        onWheel={onWheel}
      />
      <div style={{ paddingLeft: 10, float: "right" }}>
        <Tooltip title="Draw rect" placement="bottom">
          <IconButton
            style={{
              width: 40,
              height: 40,
              marginBottom: 10,
              border: "1px solid grey",
              color: enableDraw ? "black" : "grey",
            }}
            onClick={enableDrawClick}
          >
            <TabUnselectedRounded />
          </IconButton>
        </Tooltip>
        <Tooltip title="Zoom out" placement="bottom">
          <IconButton
            style={{
              width: 40,
              height: 40,
              marginBottom: 10,
              border: "1px solid grey",
              color: "black",
            }}
            onClick={() => onZoomClick("-")}
          >
            <ZoomOut />
          </IconButton>
        </Tooltip>
        <Tooltip title="Zoom in" placement="bottom">
          <IconButton
            style={{
              width: 40,
              height: 40,
              marginBottom: 10,
              border: "1px solid grey",
              color: "black",
            }}
            onClick={() => onZoomClick("+")}
          >
            <ZoomIn />
          </IconButton>
        </Tooltip>
      </div>
    </div>
  );
}

export default App;
