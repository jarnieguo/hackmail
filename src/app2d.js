import * as PIXI from 'pixi.js';
import {
    Desktop,
    Test,
    Test2,
    TextBubbleGame,
    Hangman
} from 'stages';
import { Slider } from './components/stages';


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
    // 'game1': new Test(app, desktop),
    // 'game2': new Test2(app, desktop),
    // 'game3': new Test(app, desktop),
    'textbubblegame': new TextBubbleGame(app, desktop),
    'hangman': new Hangman(app, desktop),
    'slider': new Slider(app, desktop)
};
desktop.addGames(games);

desktop.stage();

// Render loop
const onAnimationFrameHandler = (timeStamp) => {

    for (let gameName in games) {
      if (games[gameName].active) {
        games[gameName].update(timeStamp);
      }
    }
};



export {
    app,
    onAnimationFrameHandler
};
