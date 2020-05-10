import * as PIXI from 'pixi.js';
import { Game } from '../Game';

import { GOODTEXTS, BADTEXTS } from './texts.js';
import BUBBLE from './bubble.png';

// https://pixijs.io/examples/#/interaction/custom-hitarea.js
const bubbleIcon = PIXI.Texture.from(BUBBLE);
const GRAVITY = 0.07;

class Bubble {
  constructor(parent) {
    this.parent = parent;

    this.isBad = (Math.random() < 0.4);

    // pick random text from appropriate text array
    let textArray = this.isBad ? BADTEXTS : GOODTEXTS;
    let txt = textArray[Math.floor(Math.random()*textArray.length)];
    let text = new PIXI.Text(txt, {fontFamily : 'Arial', fontSize: 14});
    text.y = -1

    this.sprite = new PIXI.Sprite(bubbleIcon);
    this.sprite.position.set(Math.random() * window.innerWidth, window.innerHeight + 10);

    this.sprite.anchor.x = this.sprite.anchor.y = 0.5;
    text.anchor.x = text.anchor.y = 0.5;

    this.sprite.addChild(text);



    this.xVel = (Math.random() - 0.5) * 4;
    this.yVel = -1 * (Math.random() * 5 + 7);

    this.sprite.buttonMode = true;
    this.sprite.interactive = true;

    this.popped = false;

    this.sprite.on('pointerdown', (event) => this.onClick(this.sprite));

  }

  // pop
  onClick(object) {
      object.tint = 0x333333;
      this.popped = true;

      if (this.isBad) {
        this.parent.lives -= 1;
      }
      else {
        this.parent.score += 1;
      }
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
        this.setIcon(bubbleIcon);
        this.setLabel("Text Bubbles");

        this.bubbles = [];

        this.init()

        this.scoreText = this.addLabel("Score", this.score, 0, 70)
        this.livesText = this.addLabel("Lives", this.lives, 120, 70)

        this.initObjects();
    }

    // return text
    addLabel(label, val, x, y) {
      let text = new PIXI.Text((label + ': ' + val));
      text.position.set(x, y);
      this.objects.push(text);
      return text;
    }

    init() {
      this.score = 0;
      this.lives = 3;
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
      this.livesText.text = ('Lives: ' + this.lives);

      let numBubs = this.bubbles.length;

      // update each bubble
      for (let i = 0; i < numBubs; i++) {
        this.bubbles[i].update();

        // remove out of screen bubbles from screen
        if (!this.isAlive(this.bubbles[i])) {
          this.parent.stage.removeChild(this.bubbles[i].sprite);
        }
      }
      // remove out of screen bubbles from array
      this.bubbles = this.bubbles.filter(this.isAlive);

      // create a bubble with some probability
      if (Math.random() < 0.02) {
        this.initBubble();
      }

      if (this.lives <= 0) {
        super.gameOver();
      }
      if (this.score >= 10) {
        super.win();
      }

    }

}

export {
    TextBubbleGame
};
