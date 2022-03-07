const app = new PIXI.Application({
    width: 1500,
    height: 1500,
    backgroundColor: 0x1099bb,
    antialias: true
})
document.body.appendChild(app.view);

// set interactive true
app.stage.interactive = true;

// grabbing the image
const bg = PIXI.Sprite.from('assets/assets/bg_rotate.jpg');

// Setting rotation Anchor point.
bg.anchor.set(0.5);

// setting the location of the image.
bg.x = app.screen.width / 2;
bg.y = app.screen.height / 2;

// add the BG object.
app.stage.addChild(bg);

// Making an object/Container to allow for adding of other objects.
const container = new PIXI.Container();
container.x = app.screen.width / 2;
container.y = app.screen.height / 2;

// add a bunch of sprites
const bgFront = PIXI.Sprite.from('assets/assets/bg_scene_rotate.jpg');
bgFront.anchor.set(0.5);

const light2 = PIXI.Sprite.from('assets/assets/light_rotate_2.png');
light2.anchor.set(0.5);

const light1 = PIXI.Sprite.from('assets/assets/light_rotate_1.png');
light1.anchor.set(0.5);

const panda = PIXI.Sprite.from('assets/assets/panda.png');
panda.anchor.set(0.5);

container.addChild(bgFront, light2, light1, panda);
// adding container to the app.
app.stage.addChild(container);

// let's create a moving shape
const thing = new PIXI.Graphics();
app.stage.addChild(thing);
thing.x = app.screen.width / 2;
thing.y = app.screen.height / 2;
thing.lineStyle(1);

container.mask = thing;

// toggling the masking.
app.stage.on('pointertap', () => {
    if (!container.mask) {
        container.mask = thing;
    } else {
        container.mask = null;
    }
});

//adding some text to the stage.
const help = new PIXI.Text('Click or tap to turn masking on / off.', {
    fontFamily: 'Arial',
    fontSize: 12,
    fontWeight: 'bold',
    fill: 'white',
});
help.y = app.screen.height - 26;
help.x = 10;
app.stage.addChild(help);

// loop for the elements inside.
let count = 0;
app.ticker.add(() => {
    bg.rotation += 0.01;
    bgFront.rotation -= 0.01;

    light1.rotation += 0.02;
    light2.rotation += 0.01;

    // using sin and cos to make the image go bigger and smaller
    // increase 0.04 to increase the magnitude.
    panda.scale.x = 1 + Math.sin(count) * 0.04;
    panda.scale.y = 1 + Math.cos(count) * 0.04;

    count += 0.1;

    thing.clear();

    thing.beginFill(0x8bc5ff, 0.4);
    thing.moveTo(-120 + Math.sin(count) * 20, -100 + Math.cos(count) * 20);
    thing.lineTo(120 + Math.cos(count) * 20, -100 + Math.sin(count) * 20);
    thing.lineTo(120 + Math.sin(count) * 20, 100 + Math.cos(count) * 20);
    thing.lineTo(-120 + Math.cos(count) * 20, 100 + Math.sin(count) * 20);
    thing.rotation = count * 0.1;
});