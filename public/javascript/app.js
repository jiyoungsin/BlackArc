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
let arrayOfPolygons = [];
const Graphics = PIXI.Graphics;
const polygon = new Graphics();

// use fetch to get the /points. 
fetch('/points', ).then(function(res){ 
    return res.json() 
}).then(function(data){ 
    polygon.beginFill(data.color);
    polygon.drawPolygon(data.points);
    polygon.endFill();
    app.stage.addChild(polygon);
});
