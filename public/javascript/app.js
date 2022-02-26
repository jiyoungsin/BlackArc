// PIXI
const Application = PIXI.Application;

const app = new Application({
    width: 1500,
    height: 1500,
    backgroundColor: 0x1099bb,
    antialias: true
})

document.body.appendChild(app.view);

app.stage.interactive = true;

// VARIABLES
const Graphics = PIXI.Graphics;

// use fetch to get the /points. 
fetch('/points', ).then(function(res){ 
    return res.json() 
}).then(function(data){ 
    const arrayOfData = data;
    for(let i=0; i< arrayOfData.length; i++){
        const graphicsObject = new Graphics();
        switch(data[i].shapeType) {
            case "Rectangle":
                graphicsObject.beginFill(data[i].color);
                graphicsObject.drawRect(data[i].points[0], data[i].points[1], data[i].points[2], data[i].points[3]);
                graphicsObject.endFill();
                app.stage.addChild(graphicsObject);
                break;
            case "Polygon":
                graphicsObject.beginFill(data[i].color);
                graphicsObject.drawPolygon(data[i].points);
                graphicsObject.endFill();
                app.stage.addChild(graphicsObject);
                break;
            default:
              continue;
        }
    }
    // Scale mode for all textures, will retain pixelation
    PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

    const sprite = PIXI.Sprite.from('assets/javascript/bunny.png');
    console.log(sprite);
    // Set the initial position
    sprite.anchor.set(0.5);
    sprite.x = app.screen.width / 2;
    sprite.y = app.screen.height / 2;
    // Opt-in to interactivity
    sprite.interactive = true;

    // Shows hand cursor
    sprite.buttonMode = true;

    // Pointers normalize touch and mouse
    sprite.on('pointerdown', onClick);

    // // Alternatively, use the mouse & touch events:
    // // sprite.on('click', onClick); // mouse-only
    // // sprite.on('tap', onClick); // touch-only

    app.stage.addChild(sprite);

    function onClick() {
        sprite.scale.x *= 1.25;
        sprite.scale.y *= 1.25;
    }


});
