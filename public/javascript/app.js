const app = new PIXI.Application({
    width: 1250,
    height: 1250,
    backgroundColor: 0x1099bb,
    antialias: true
})
document.body.appendChild(app.view);

app.stage.interactive = true;

const container = new PIXI.Container();
app.stage.addChild(container);

const flag = PIXI.Sprite.from('assets/assets/pixi-filters/flag.png');
container.addChild(flag);
flag.x = 100;
flag.y = 100;

// grabbing a graphics noise 
const displacementSprite = PIXI.Sprite.from('assets/assets/pixi-filters/displacement_map_repeat.jpg');
// Make sure the sprite is wrapping.
displacementSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;
const displacementFilter = new PIXI.filters.DisplacementFilter(displacementSprite);
displacementFilter.padding = 10;

// set both displacement and flag at the same position.
displacementSprite.position = flag.position;

app.stage.addChild(displacementSprite);

// set the filter with the DisplacementFilter
flag.filters = [displacementFilter];

// the scale of distortion 
displacementFilter.scale.x = 100;
displacementFilter.scale.y = 150;

// use ticker since it is predictable.
app.ticker.add(() => {
    // Offset the sprite position to make vFilterCoord update to larger value. 
    // Repeat wrapping makes sure there's still pixels on the coordinates.
    displacementSprite.x++;
    // Reset x to 0 when it's over width to keep values from going to very huge numbers.
    // Repeat the process from the beginning.
    if (displacementSprite.x > displacementSprite.width) { 
        displacementSprite.x = 0; 
    }
});
