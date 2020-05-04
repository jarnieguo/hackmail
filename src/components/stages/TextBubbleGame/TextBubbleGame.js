import * as PIXI from 'pixi.js';
import { Game } from '../Game';

import ICON from './icon.png';
import IMAGE from './ex.png';
import BUBBLE from './bubble.png';

// https://pixijs.io/examples/#/interaction/custom-hitarea.js
const bubbleIcon = PIXI.Texture.from(BUBBLE);
const GRAVITY = 0.6;

class Bubble {
  constructor() {
    this.sprite = new PIXI.Sprite(bubbleIcon);

    this.sprite.position.set(Math.random() * window.innerWidth, window.innerHeight - 100);

    this.xVel = (Math.random() - 0.5) * 4;
    this.yVel = -1 * Math.random() * 40;
  }

  update() {
    this.sprite.position.x += this.xVel;
    this.sprite.position.y += this.yVel;

    this.yVel += GRAVITY;
  }
}

class TextBubbleGame extends Game {
    constructor(parent, desktop) {
        super(parent, desktop);

        this.setBgColor(0xFFFFFF);
        this.setIcon(PIXI.Texture.from(ICON));
        this.setLabel("text bubble game");

        this.bubbles = [];

        this.initObjects();
    }


    initObjects() {
        super.initObjects();
    }

    onClick(object) {
        object.tint = 0x333333;
    }

    onPointerOver(object) {
        object.tint = 0x666666;
    }

    onPointerOut(object) {
        object.tint = 0xFFFFFF;
    }

    initBubble() {
      let bub = new Bubble();

      this.bubbles.push(bub);
      //this.objects.push(bub.sprite);
      this.parent.stage.addChild(bub.sprite);
    }

    update(timeStamp) {
      let numBubs = this.bubbles.length;

      for (let i = 0; i < numBubs; i++) {
        this.bubbles[i].update();
      }

      if (Math.random() < 0.2) {
        this.initBubble();
      }
    }

}





export {
    TextBubbleGame
};
