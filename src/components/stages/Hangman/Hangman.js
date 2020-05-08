import * as PIXI from 'pixi.js';
import { Game } from '../Game';

// TODO: make real icon
import ICON from './icon2.png';
import PWBLOCK from './pwblock2.png'
import { PASSWORDS } from './passwords.js';

const pwBlock = PIXI.Texture.from(PWBLOCK);

//  The blocks that comprise the password
class PasswordBlock {
    constructor(parent, letter, x, y) {
        this.parent = parent;

        this.letter = letter; 

        let sprite = new PIXI.Sprite(pwBlock);
        sprite.width = 60;
        sprite.height = 60;
        sprite.position.y = y;
        sprite.position.x = x;
        sprite.anchor.x = sprite.anchor.y = 0.5;
        this.sprite = sprite;

        this.sprite.interactive = true;
    
        this.revealed = false;

        this.sprite.on('pointerdown', (event) => this.onClick(this.sprite));
    }

    revealLetter() {
        this.revealed = true;

        let text = new PIXI.Text(this.letter.toUpperCase(), {fontFamily : 'Arial', fontSize: 100});
        text.anchor.x = text.anchor.y = 0.5;
        this.sprite.addChild(text);

        this.sprite.tint = 0xb3f5b8;
    }

    onClick(object) {
        this.revealLetter(object);
    }
}

//  The blocks that reveal letters
class LetterBlock {
    constructor(parent, letter, x, y) {
        this.parent = parent;

        this.letter = letter;

        let sprite = new PIXI.Sprite(pwBlock);
        sprite.width = 60;
        sprite.height = 60;
        sprite.position.y = y;
        sprite.position.x = x;
        sprite.anchor.x = sprite.anchor.y = 0.5;

        let text = new PIXI.Text(letter.toUpperCase(), {fontFamily : 'Arial', fontSize: 100});
        text.anchor.x = text.anchor.y = 0.5;
        sprite.addChild(text);

        sprite.interactive = true;
        sprite.on('pointerdown', (event) => this.onClick(this));

        this.sprite = sprite;
        this.isAlive = true;
    }

    onClick(object) {
        this.parent.checkLetter(object);
    }

    update() {
        if (this.sprite.alpha <= 0) {
            this.parent.removeBlock(this);
            return;
        }
        this.sprite.alpha -= .01;
    }
}

class Hangman extends Game {
    constructor(parent, desktop) {
        super(parent, desktop);

        this.setBgColor(0xFFFFFF);
        this.setIcon(PIXI.Texture.from(ICON));
        this.setLabel("Hangman");

        let rand = Math.floor(Math.random() * PASSWORDS.length);
        if (rand >= PASSWORDS.length) {
            rand = PASSWORDS.length - 1;
        }
        this.password = PASSWORDS[rand];
        this.letterBlocks = [];
        this.gameWon = false;
        this.timer = 10;

        this.initObjects();
    }

    //  TODO: Put proper win reward
    winGame() {
        this.gameWon = true;

        //  Destroy all letter blocks
        for (let i = 0; i < this.letterBlocks.length; i++) {
            this.removeBlock(this.letterBlocks[i]);
        }
    }

    //  Check if this letterBlock corresponds to a letter in the password
    checkLetter(letterBlock) {
        const letter = letterBlock.letter;
        const password = this.password;
        let revealedLetters = 0;
        for (let i = 0; i < password.length; i++) {
            if (this.passwordBlocks[i].revealed) {
                revealedLetters++;
                continue;
            }

            if (password[i].toUpperCase() == letter.toUpperCase()) {
                this.passwordBlocks[i].revealLetter();
                revealedLetters++;
            }
        }

        if (revealedLetters == password.length) {
            this.winGame();
            return;
        }

        this.removeBlock(letterBlock);
    }

    initObjects() {
        super.initObjects();
        this.initPasswordContainer();
    }

    //  Create the passwordBlocks
    initPasswordContainer() {
        this.passwordContainer = new PIXI.Container();
        this.passwordBlocks = [];

        for (let i = 0; i < this.password.length; i++) {
            const block = new PasswordBlock(this, this.password[i], 50 + i * 65, window.innerHeight - 50);
            this.passwordContainer.addChild(block.sprite);
            this.passwordBlocks.push(block);
        }

        this.objects.push(this.passwordContainer);
    }

    //  pick random char from string
    pickRandomLetter(str) {
        const rand = Math.floor(Math.random() * str.length);
        if (rand >= str.length) {
            rand = str.length - 1;
        }
        return str[rand];
    }

    //  Create a letter block
    initLetterBlock() {
        //  x range: 50 -> innerWidth - 50
        //  y range: 120 -> innerHeight - 150
        let x = 50 + Math.random() * (window.innerWidth - 100);
        let y = 120 + Math.random() * (window.innerHeight - 270);

        //  Pick letter
        let letter;
        if (Math.random() < .5) {
            //  Pick a letter that's definitely in the password
            letter = this.pickRandomLetter(this.password);
        } else {
            //  Pick any random letter
            const alpha = "abcdefghijklmnopqrstuvwxyz0123456789";
            letter = this.pickRandomLetter(alpha);
        }

        let block = new LetterBlock(this, letter, x, y);
    
        this.parent.stage.addChild(block.sprite);
        this.letterBlocks.push(block);
    }

    removeBlock(block) {
        this.parent.stage.removeChild(block.sprite);
    }

    isAlive(block) {
        return block.isAlive;
    }

    update(timestamp) {
        if (this.gameWon) {
            return;
        }

        if (this.timer == 0) {
            this.timer = 30;
            this.initLetterBlock();
        }
        this.timer--;

        for (let i = 0; i < this.letterBlocks.length; i++) {
            this.letterBlocks[i].update();
        }

        this.letterBlocks = this.letterBlocks.filter(this.isAlive);
    }
}

export { Hangman };