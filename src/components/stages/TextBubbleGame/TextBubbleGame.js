import * as PIXI from 'pixi.js';
import { Game } from '../Game';

import ICON from './icon.png';
import IMAGE from './ex.png';
import BUBBLE from './bubble.png';

// https://pixijs.io/examples/#/interaction/custom-hitarea.js
const bubbleIcon = PIXI.Texture.from(BUBBLE);
const GRAVITY = 0.4;

class Bubble {
  constructor(parent) {
    this.parent = parent;

    this.sprite = new PIXI.Sprite(bubbleIcon);

    this.sprite.position.set(Math.random() * window.innerWidth, window.innerHeight + 10);

    this.xVel = (Math.random() - 0.5) * 4;
    this.yVel = -1 * Math.random() * 30;

    this.sprite.buttonMode = true;
    this.sprite.interactive = true;

    this.popped = false;

    this.sprite.on('pointerdown', (event) => this.onClick(this.sprite));
  }

  // pop
  onClick(object) {
      object.tint = 0x333333;
      this.popped = true;

      this.parent.score += 1;
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
        this.score = 0;

        this.scoreText = new PIXI.Text(('Score: ' + this.score));
        //  {fontFamily : 'Arial', fontSize: 20, fill : 0x, align : 'center'}
        this.scoreText.position.set(0, 70);

        this.objects.push(this.scoreText);

        this.initObjects();
    }

    init() {
      this.score = 0;
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
      let bub = new Bubble(this);

      this.bubbles.push(bub);
      //this.objects.push(bub.sprite);
      this.parent.stage.addChild(bub.sprite);
    }

    // util: is bubble still on screen AND not popped
    isAlive(bubble) {
      let inSight = (bubble.sprite.position.y < window.innerHeight + 11);

      // if (!inSight) {
      //   this.parent.stage.removeChild(bubble.sprite);
      // }
      return (inSight && !bubble.popped);
    }

    update(timeStamp) {

      this.scoreText.text = ('Score: ' + this.score);

      let numBubs = this.bubbles.length;

      for (let i = 0; i < numBubs; i++) {
        this.bubbles[i].update();

        // remove out of screen bubbles from screen
        if (!this.isAlive(this.bubbles[i])) {
          this.parent.stage.removeChild(this.bubbles[i].sprite);
        }
      }
      // remove out of screen bubbles from array
      this.bubbles = this.bubbles.filter(this.isAlive);

      if (Math.random() < 0.2) {
        this.initBubble();
      }

    }

}

export {
    TextBubbleGame
};
