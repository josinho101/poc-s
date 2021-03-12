import * as PIXI from "pixi.js";
import { useRef, useEffect } from "react";

const App = () => {
  const rootRef = useRef();
  const app = useRef();
  const rect = useRef();
  const keys = useRef({});

  useEffect(() => {
    app.current = new PIXI.Application({
      width: 600,
      height: 400,
      backgroundColor: 0xaaaaaa,
    });

    app.current.loader.onError.add((...args) => console.error(args));
    rootRef.current.appendChild(app.current.view);

    window.addEventListener("keydown", keydown);
    window.addEventListener("keyup", keyup);

    rect.current = new PIXI.Sprite.from("assets/rect.png");
    rect.current.anchor.set(0.5);
    rect.current.x = app.current.view.width / 2;
    rect.current.y = app.current.view.height / 2;
    app.current.stage.addChild(rect.current);

    app.current.ticker.add((delta) => gameLoop(delta));

    return () => {
      app.current.destroy(app.current.view);
    };
  }, []);

  const gameLoop = () => {
    const moveOffset = 3;
    if (keys.current["37"]) {
      // left arrow
      rect.current.x -= moveOffset;
    }

    // up arrow
    if (keys.current["38"]) {
      rect.current.y -= moveOffset;
    }

    // right arrow
    if (keys.current["39"]) {
      rect.current.x += moveOffset;
    }

    // down arrow
    if (keys.current["40"]) {
      rect.current.y += moveOffset;
    }
  };

  const keydown = (e) => {
    keys.current[e.keyCode] = true;
  };

  const keyup = (e) => {
    keys.current[e.keyCode] = false;
  };

  return <div ref={rootRef} />;
};

export default App;
