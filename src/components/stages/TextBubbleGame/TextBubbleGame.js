import * as PIXI from 'pixi.js';
import { Game } from '../Game';

import { GOODTEXTS, BADTEXTS } from './texts.js';
import ICON from './icon.png';
import BUBBLE from './bub.png';

const bubbleIcon = PIXI.Texture.from(BUBBLE);
const GRAVITY = 0.07;

class Bubble {
    constructor(parent) {
        this.parent = parent;

        this.isBad = Math.random() < 0.4;

        // pick random text from appropriate text array
        const textArray = this.isBad ? BADTEXTS : GOODTEXTS;
        const txt = textArray[Math.floor(Math.random() * textArray.length)];
        const text = new PIXI.Text(txt, {
            fontFamily: 'Tahoma',
            fontSize: 40,
            leading: -10,
            fill: 'white',
            wordWrap: true,
            wordWrapWidth: 350
        });
        text.y = -30;
        text.x = -15;

        this.sprite = new PIXI.Sprite(bubbleIcon);
        this.sprite.position.set(
            Math.random() * window.innerWidth,
            window.innerHeight + 10
        );
        this.sprite.width = 200;
        this.sprite.height = 100;
        this.sprite.on('pointerover', (event) => { this.sprite.tint = 0x4fb6f7; });
        this.sprite.on('pointerout', (event) => { this.sprite.tint = 0xffffff; });

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
        } else {
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

        this.setBgColor(0xffffff);
        this.setIcon(PIXI.Texture.from(ICON));
        this.setLabel('Chat');
        this.setWinText('Salacious chat history unlocked!');

        this.bubbles = [];

        this.playingGame = false; // used to reset state after gameover
        this.wonGame = false; // used to maintain state after win
        this.init();

        this.scoreText = this.addLabel('Score', this.score, 0, 70);
        this.livesText = this.addLabel('Lives', this.lives, 120, 70);

        this.initObjects();
    }

    // return text
    addLabel(label, val, x, y) {
        let text = new PIXI.Text(label + ': ' + val);
        text.position.set(x, y);
        this.objects.push(text);
        return text;
    }

    init() {
        if (this.wonGame) { super.winDialog(); }
        if (this.playingGame || this.wonGame) { return; }
        this.playingGame = true;
        this.score = 0;
        this.lives = 3;
        // this.lives = 1; // debug
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
        object.tint = 0xffffff;
    }

    initBubble() {
        let bub = new Bubble(this);

        this.bubbles.push(bub);
        //this.objects.push(bub.sprite);
        this.parent.stage.addChild(bub.sprite);
    }

    // util: is bubble still on screen AND not popped
    isAlive(bubble) {
        let inSight = bubble.sprite.position.y < window.innerHeight + 11;

        // if (!inSight) {
        //   this.parent.stage.removeChild(bubble.sprite);
        // }
        return inSight && !bubble.popped;
    }

    update(timeStamp) {
        if (this.wonGame) { return; }
        this.scoreText.text = 'Score: ' + this.score;
        this.livesText.text = 'Lives: ' + this.lives;

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
            this.playingGame = false;
            super.gameOver();
        }
        if (this.score >= 10) {
        // if (this.score >= 1) { // debug
            this.win();
        }
    }

    win() {
        this.playingGame = false;
        this.wonGame = true;
        super.win();
    }
}

export { TextBubbleGame };
