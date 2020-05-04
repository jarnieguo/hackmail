import * as PIXI from 'pixi.js';
import IMAGE from './ex.png';

//
// Games should extend this class.
//

class Game {
    constructor(parent, desktop) {
        this.parent = parent;
        this.desktop = desktop;
        this.objects = [];

        this.bgColor = 0x000000;
        this.icon = PIXI.Texture.from(IMAGE);
        this.label = "Game Label";

        this.initObjects();
    }

    setBgColor(bgcolor) {
        this.bgColor = bgcolor;
    }

    setIcon(iconTexture) {
        this.icon = iconTexture;
    }

    setLabel(label) {
        this.label = label;
    }

    stage() {
        this.parent.renderer.backgroundColor = this.bgColor;
        this.parent.stage.addChild(...this.objects);
    }

    exit() {
        this.parent.stage.removeChildren();
        this.desktop.stage();
    }

    initObjects() {
    }

}





export {
    Game
};
