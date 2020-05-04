import * as PIXI from 'pixi.js';
import {
    Test,
    Desktop
} from 'stages';

// https://pixijs.io/examples/#/interaction/custom-hitarea.js


// Set up renderer
const app = new PIXI.Application();
app.renderer.view.style.position = "absolute";
app.renderer.view.style.display = "block";
app.renderer.autoDensity = true;
app.renderer.resize(window.innerWidth, window.innerHeight);


// Initialize empty desktop
const desktop = new Desktop(app);

// Initialize and keep track of games
const games = {
    'test': new Test(app, desktop)
};
desktop.addGames(games);

desktop.stage();



export {
    app
};
