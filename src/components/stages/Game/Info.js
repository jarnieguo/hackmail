import * as PIXI from 'pixi.js';

class Info {
    constructor(app) {
        const container = new PIXI.Container();

        // Move container to the center
        container.x = app.screen.width / 2;
        container.y = app.screen.height / 2;

        // Center in container
        // container.pivot.x = container.width / 2;
        // container.pivot.y = container.height / 2;
    }
}

export {
    Info
};
