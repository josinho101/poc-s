import * as PIXI from "pixi.js";
import { useRef, useEffect } from "react";

function StageRotator() {
  const rootRef = useRef();
  const renderer = useRef();
  const stage = useRef();
  const canvasSize = 600;

  const angleToRad = (angle) => +((angle * Math.PI) / 180).toFixed(5);

  useEffect(() => {
    renderer.current = PIXI.autoDetectRenderer(canvasSize, canvasSize, {
      transparent: true,
      antialias: true,
    });

    draw();
    rootRef.current.appendChild(renderer.current.view);

    return () => {
      renderer.current.destroy(true);
      renderer.current = null;
    };
  }, []);

  const draw = () => {
    const width = 100;
    const height = 50;
    const x = canvasSize / 2 - width / 2;
    const y = canvasSize / 2 - height / 2;
    const dx = x + width / 2;
    const dy = y + height / 2;
    const rotationAngle = 0;
    const zoomScale = 1;

    // initialize stage
    stage.current = new PIXI.Container(0x000000, true);

    // rect object
    const rectGraphics = new PIXI.Graphics();
    rectGraphics.lineStyle(1, 0xff0000);
    rectGraphics.drawRect(x, y, width, height);
    rectGraphics.endFill();

    stage.current.addChild(rectGraphics);
    stage.current.scale.set(zoomScale);
    stage.current.position.set(dx, dy);
    stage.current.pivot.set(dx, dy);
    stage.current.rotation = angleToRad(rotationAngle);

    // render stage
    renderer.current.render(stage.current);
  };

  return (
    <div
      ref={rootRef}
      style={{
        width: canvasSize,
        height: canvasSize,
        border: "1px solid grey",
      }}
    />
  );
}

export default StageRotator;
