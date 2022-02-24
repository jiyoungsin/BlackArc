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
        console.log(data[i].shapeType)
        switch(data[i].shapeType) {
            case "Rectangle":
                console.log("@@@@@@")
                data[i].points
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

});
