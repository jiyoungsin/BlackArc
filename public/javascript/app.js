const app = new PIXI.Application();
document.body.appendChild(app.view);

const bg = PIXI.Sprite.from('assets/assets/pixi-filters/bg_depth_blur.jpg');
bg.width = app.screen.width;
bg.height = app.screen.height;
app.stage.addChild(bg);

const littleDudes = PIXI.Sprite.from('assets/assets/pixi-filters/depth_blur_dudes.jpg');
littleDudes.x = (app.screen.width / 2) - 315;
littleDudes.y = 200;
app.stage.addChild(littleDudes);

const littleRobot = PIXI.Sprite.from('assets/assets/pixi-filters/depth_blur_moby.jpg');
littleRobot.x = (app.screen.width / 2) - 200;
littleRobot.y = 100;
app.stage.addChild(littleRobot);

// creating blur filters
const blurFilter1 = new PIXI.filters.BlurFilter();
const blurFilter2 = new PIXI.filters.BlurFilter();

// adding the filters via reference
littleDudes.filters = [blurFilter1];
littleRobot.filters = [blurFilter2];

let count = 0;

// anything that is predictable uses the ticker.
app.ticker.add(() => {
    count += 0.05;
    // interesting way to blur images.
    // sin and cos are opposites.
    const blurAmount = Math.cos(count);
    const blurAmount2 = Math.sin(count);

    // Calling the blur using the object.
    littleDudes.filters[0].blur = 20 * (blurAmount);
    // using reference to change the blurFilter.
    blurFilter2.blur = 20 * (blurAmount2);
});