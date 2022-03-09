const app = new PIXI.Application({
    width: 1250,
    height: 1250,
    backgroundColor: 0x1099bb,
    antialias: true
})
document.body.appendChild(app.view);

// Setting the constants
// Inner radius of the circle
const radius = 100;

// The blur amount
const blurSize = 32;
// adding to loader object
app.loader.add('grass', 'assets/assets/bg_grass.jpg');
// linking the loader with the callback function setup
app.loader.load(setup);

function setup(loader, resources) {
    // using resource object to create background sprite
    const background = new PIXI.Sprite(resources.grass.texture);
    app.stage.addChild(background);
    background.width = app.screen.width;
    background.height = app.screen.height;

    // drawing of circle
    const circle = new PIXI.Graphics()
        .beginFill(0xFF0000)
        .drawCircle(radius + blurSize, radius + blurSize, radius)
        .endFill();
    // adding blur effect
    circle.filters = [new PIXI.filters.BlurFilter(blurSize)];

    // creating a rectangle
    const bounds = new PIXI.Rectangle(0, 0, (radius + blurSize) * 2, (radius + blurSize) * 2);
    // creating texture for the circle
    // LINEAR Smooth scaling
    // NEAREST Pixelating scaling
    const texture = app.renderer.generateTexture(circle, PIXI.SCALE_MODES.LINEAR, 1, bounds);
    // adding the texture to the sprite.
    const focus = new PIXI.Sprite(texture);
    
    // adding the focus to the stage
    app.stage.addChild(focus);
    // adding the focus mask to the background.
    background.mask = focus;

    // setting interactive to true.
    app.stage.interactive = true;
    // creating an event listener on mousemove
    app.stage.on('mousemove', pointerMove);

    // getting the mouse X and Y 
    // moving the focus/Mask to the cursors position.
    function pointerMove(event) {
        focus.position.x = event.data.global.x - focus.width / 2;
        focus.position.y = event.data.global.y - focus.height / 2;
    }
}