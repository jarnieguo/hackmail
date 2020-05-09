import * as PIXI from 'pixi.js';
import { Game } from '../Game';

import ICON from './icon.png';

class Slider extends Game {
    constructor(parent, desktop) {
        super(parent, desktop);

        this.setBgColor(0xFFFFFF);
        this.setIcon(PIXI.Texture.from(ICON));
        this.setLabel("Slider");

        this.initObjects();
    }

    initObjects() {
        super.initObjects();
    }
}

export { Slider };