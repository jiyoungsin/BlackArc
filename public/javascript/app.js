// PIXI
const Application = PIXI.Application;

const app = new Application({
    width: 1500,
    height: 1500,
    backgroundColor: 0x1099bb,
    antialias: true
})

document.body.appendChild(app.view);


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

    const realPath = new PIXI.Graphics();

    realPath.lineStyle(2, 0xFFFFFF, 1);
    realPath.moveTo(700, 100);
    realPath.lineTo(800, 200);
    realPath.lineTo(1000, 200);
    realPath.lineTo(1050, 50);

    realPath.position.x = 50;
    realPath.position.y = 50;

    app.stage.addChild(realPath);
    const bezier = new PIXI.Graphics();

    bezier.lineStyle(5, 0xAA0000, 1);
    bezier.moveTo(700, 100);
    bezier.bezierCurveTo(800, 200, 1000, 200, 1050, 50);

    bezier.position.x = 50;
    bezier.position.y = 50;

    app.stage.addChild(bezier);

    // // BEZIER CURVE 2 ////
    const realPath2 = new PIXI.Graphics();

    realPath2.lineStyle(2, 0xFFFFFF, 1);
    realPath2.moveTo(500, 500);
    realPath2.lineTo(500, 400);
    realPath2.lineTo(650, 650);
    realPath2.lineTo(640, 500);

    realPath2.position.x = 320;
    realPath2.position.y = 150;

    app.stage.addChild(realPath2);

    const bezier2 = new PIXI.Graphics();

    bezier2.lineStyle(5, 0xAA0000, 1);
    bezier2.moveTo(500, 500);
    bezier2.bezierCurveTo(500, 400, 650, 650, 640, 500);

    bezier2.position.x = 320;
    bezier2.position.y = 150;

    app.stage.addChild(bezier2);

    // // ARC ////
    const arc = new PIXI.Graphics();

    arc.lineStyle(5, 0xAA00BB, 1);
    arc.arc(1200, 1000, 50, Math.PI, 2 * Math.PI);

    app.stage.addChild(arc);

    // // ARC 2 ////
    const arc2 = new PIXI.Graphics();

    arc2.lineStyle(6, 0x3333DD, 1);
    arc2.arc(650, 270, 60, 2 * Math.PI, 3 * Math.PI / 2);

    app.stage.addChild(arc2);

    const arc3 = new PIXI.Graphics();

    // arc3.lineTextureStyle({ width: 20, texture: sprite.texture });
    arc3.lineStyle(20, 0x3333DD, 1);
    arc3.arc(650, 420, 60, 2 * Math.PI, 2.5 * Math.PI / 2);

    app.stage.addChild(arc3);


    // / Hole ////
    const rectAndHole = new PIXI.Graphics();

    rectAndHole.beginFill(0x00FF00);
    rectAndHole.drawRect(350, 975, 150, 150);
    rectAndHole.beginHole();
    rectAndHole.drawCircle(375, 1025, 25);
    rectAndHole.drawCircle(425, 1050, 25);
    rectAndHole.drawCircle(475, 1075, 25);
    rectAndHole.endHole();
    rectAndHole.endFill();

    app.stage.addChild(rectAndHole);

    // // // Line Texture Style ////
    // const beautifulRect = new PIXI.Graphics();

    // beautifulRect.lineTextureStyle({ width: 20, texture: sprite.texture });
    // beautifulRect.beginFill(0xFF0000);
    // beautifulRect.drawRect(80, 350, 150, 150);
    // beautifulRect.endFill();

    // app.stage.addChild(beautifulRect);
});
