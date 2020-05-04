import * as PIXI from 'pixi.js';
import {
    Desktop,
    Test,
    Test2
} from 'stages';


// Set up renderer
const app = new PIXI.Application({resizeTo: window});
app.renderer.view.style.position = "absolute";
app.renderer.view.style.display = "block";
// app.renderer.autoDensity = true;
// app.renderer.resize(window.innerWidth, window.innerHeight);


// Initialize empty desktop
const desktop = new Desktop(app);

// Initialize and keep track of games
const games = {
    'game1': new Test(app, desktop),
    'game2': new Test2(app, desktop),
    'game3': new Test(app, desktop)
};
desktop.addGames(games);

desktop.stage();



export {
    app
};
