const app = new PIXI.Application();
document.body.appendChild(app.view);

// setting interactive true
app.stage.interactive = true;

// getting the background 
const bg = PIXI.Sprite.from('assets/assets/bg_rotate.jpg');
// set the anchor to the middle
bg.anchor.set(0.5);
// set the location of the anchor
bg.x = app.screen.width / 2;
bg.y = app.screen.height / 2;

// creating a color matrix
const filter = new PIXI.filters.ColorMatrixFilter();

// creating a container
const container = new PIXI.Container();
// containers contain objects. 
// specifying position of container.
container.x = app.screen.width / 2;
container.y = app.screen.height / 2;

const bgFront = PIXI.Sprite.from('assets/assets/bg_scene_rotate.jpg');
// adding the anchor to the middle of the image.
bgFront.anchor.set(0.5);
// adding the image to the container
container.addChild(bgFront);

const light2 = PIXI.Sprite.from('assets/assets/light_rotate_2.png');
// adding the anchor to the middle of the image.
light2.anchor.set(0.5);
// adding the image to the container
container.addChild(light2);

const light1 = PIXI.Sprite.from('assets/assets/light_rotate_1.png');
// adding the anchor to the middle of the image.
light1.anchor.set(0.5);
// adding the image to the container
container.addChild(light1);

const panda = PIXI.Sprite.from('assets/assets/panda.png');
// adding the anchor to the middle of the image.
panda.anchor.set(0.5);
// adding the image to the container
container.addChild(panda);

app.stage.addChild(container);

// adding the filter to the entire Stage.
app.stage.filters = [filter];

let count = 0;
let enabled = true;

// toggling the ColorMatrixFilter.
app.stage.on('pointertap', () => {
    enabled = !enabled;
    app.stage.filters = enabled ? [filter] : null;
});

// Pixi Text. 
const help = new PIXI.Text('Click or tap to turn filters on / off.', {
    fontFamily: 'Arial',
    fontSize: 12,
    fontWeight: 'bold',
    fill: 'white',
});
// setting position.
help.y = app.screen.height - 25;
help.x = 10;
// adding the text.
app.stage.addChild(help);
// const { matrix } = filter;
console.log(filter.matrix);
app.ticker.add((delta) => {
    bg.rotation += 0.001;
    bgFront.rotation -= 0.001;
    light1.rotation += 0.002;
    light2.rotation += 0.001;

    panda.scale.x = 1 + Math.sin(count) * 0.004;
    panda.scale.y = 1 + Math.cos(count) * 0.004;

    count += 0.1;

    // this matrix should be responsible for this filter.
    const { matrix } = filter;
    // console.log(matrix);
    matrix[1] = Math.sin(count) * 3;
    matrix[2] = Math.cos(count);
    matrix[3] = Math.cos(count) * 1.5;
    matrix[4] = Math.sin(count / 3) * 2;
    matrix[5] = Math.sin(count / 2);
    matrix[6] = Math.sin(count / 4);
});
