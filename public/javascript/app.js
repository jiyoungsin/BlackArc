const app = new PIXI.Application({
    width: 1250,
    height: 1250,
    backgroundColor: 0x1099bb,
    antialias: true
})
document.body.appendChild(app.view);

// set interactive to true
app.stage.interactive = true;

// creating a container 
const container = new PIXI.Container();
// adding container to stage.
app.stage.addChild(container);

// setting some constants
const padding = 100;
// creating a rectangle ( bounds )
const bounds = new PIXI.Rectangle(
    -padding,
    -padding,
    app.screen.width + padding * 2,
    app.screen.height + padding * 2,
);
// creating maggots array
const maggots = [];

// creating 20 maggots
for (let i = 0; i < 20; i++) {
    const maggot = PIXI.Sprite.from('assets/assets/maggot.png');
    // set the anchor to the center
    maggot.anchor.set(0.5);
    // adding the maggot to the container
    container.addChild(maggot);

    // seting the direction, speed, and turning speed.
    maggot.direction = Math.random() * Math.PI * 2;
    // setting the speed
    maggot.speed = 1;
    // setting the turn speed.
    maggot.turnSpeed = Math.random() - 0.8;

    // setting the bounds for each maggot
    maggot.x = Math.random() * bounds.width;
    maggot.y = Math.random() * bounds.height;

    // making some maggots bigger and smaller
    maggot.scale.set(1 + Math.random() * 0.3);
    // creating an original point for the maggots
    maggot.original = new PIXI.Point();
    maggot.original.copyFrom(maggot.scale);
    // push the maggot to the array
    maggots.push(maggot);
}

// creating a displacement sprite
const displacementSprite = PIXI.Sprite.from('assets/assets/pixi-filters/displace.png');
// adding a sprite to the filter
const displacementFilter = new PIXI.filters.DisplacementFilter(displacementSprite);

app.stage.addChild(displacementSprite);
// adding the filter to the container.
container.filters = [displacementFilter];

displacementFilter.scale.x = 110;
displacementFilter.scale.y = 110;
displacementSprite.anchor.set(0.5);

const ring = PIXI.Sprite.from('assets/assets/pixi-filters/ring.png');

ring.anchor.set(0.5);

ring.visible = false;

app.stage.addChild(ring);

// adding the grass background.
const bg = PIXI.Sprite.from('assets/assets/bg_grass.jpg');
bg.width = app.screen.width;
bg.height = app.screen.height;

// setting the alpha
bg.alpha = 0.4;

// adding the bg to the container
container.addChild(bg);

app.stage
    .on('mousemove', onPointerMove)
    .on('touchmove', onPointerMove);

// when the cursor moves handler
function onPointerMove(eventData) {
    ring.visible = true;

    displacementSprite.position.set(eventData.data.global.x - 25, eventData.data.global.y);
    ring.position.copyFrom(displacementSprite.position);
}

let count = 0;

app.ticker.add(() => {
    count += 0.05;

    for (let i = 0; i < maggots.length; i++) {
        const maggot = maggots[i];

        maggot.direction += maggot.turnSpeed * 0.01;
        maggot.x += Math.sin(maggot.direction) * maggot.speed;
        maggot.y += Math.cos(maggot.direction) * maggot.speed;

        maggot.rotation = -maggot.direction - Math.PI / 2;
        maggot.scale.x = maggot.original.x + Math.sin(count) * 0.2;

        // wrap the maggots around as the crawl
        if (maggot.x < bounds.x) {
            maggot.x += bounds.width;
        } else if (maggot.x > bounds.x + bounds.width) {
            maggot.x -= bounds.width;
        }

        if (maggot.y < bounds.y) {
            maggot.y += bounds.height;
        } else if (maggot.y > bounds.y + bounds.height) {
            maggot.y -= bounds.height;
        }
    }
});