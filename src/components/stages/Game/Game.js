import * as PIXI from 'pixi.js';
import IMAGE from './ex.png';
import DIALOG from './dialog.png';
import GAMEOVER from './gameover.png';
import EXIT from './exit.png';

//
// Games should extend this class.
//

class Game {
    constructor(parent, desktop) {
        this.parent = parent;
        this.desktop = desktop;
        this.objects = [];

        // Default bg color, icon, label if not specified
        this.bgColor = 0x000000;
        this.icon = PIXI.Texture.from(IMAGE);
        this.label = 'Game Label';
        this.textStyle = new PIXI.TextStyle({ fill: '#000000' });

        this.active = false;

        // this.initObjects();
    }

    // called for every instance of the game
    // to be overridden
    init() {}

    setBgColor(bgcolor) {
        this.bgColor = bgcolor;
    }

    setIcon(iconTexture) {
        this.icon = iconTexture;
    }

    setLabel(label) {
        this.label = label;
    }

    // Don't override
    stage() {
        this.parent.renderer.backgroundColor = this.bgColor;
        this.parent.stage.addChild(...this.objects);
        this.active = true;
        this.init();
    }
    // Don't override
    exit() {
        this.parent.stage.removeChildren();
        this.desktop.stage();
        this.active = false;
    }

    // Hm
    initObjects() {
        this.initTopBar();
    }

    initTopBar() {
        // Top bar
        const topBar = new PIXI.Graphics();
        topBar.beginFill(0xc8eaf7);
        topBar.drawRect(0, 0, window.innerWidth, 70);
        topBar.endFill();
        this.objects.push(topBar);

        // Exit button
        const exitButton = new PIXI.Sprite(PIXI.Texture.from(EXIT));
        exitButton.width = 50;
        exitButton.height = 50;
        exitButton.position.set(window.innerWidth - 60, 10);
        exitButton.buttonMode = true;
        exitButton.interactive = true;
        exitButton.on('pointerdown', (event) => this.exit());
        this.objects.push(exitButton);

        // Show label on top bar idk
        const barLabel = new PIXI.Text(
            this.label + '   games won: ' + this.desktop.gamesWon,
            this.textStyle
        );
        barLabel.x = 10;
        barLabel.y = 15;
        this.objects.push(barLabel);
    }

    infoBox(header, text, imgName) {
        const rect = new PIXI.Graphics();
        // rect.anchor.set(0.5, 0.5);
        // Rectangle
        // rect.beginFill(0xc8eaf7);
        // rect.drawRect(0, 0, 500, 300);
        // rect.endFill();
        rect.x = window.innerWidth / 2;
        rect.y = window.innerHeight / 2;

        const headerTxt = new PIXI.Text(header);
        const bodyTxt = new PIXI.Text(text);

        headerTxt.position.x = bodyTxt.position.x = rect.width / 2;
        headerTxt.position.y = rect.height * 0.1;
        bodyTxt.position.y = rect.height * 0.3;

        headerTxt.anchor.x = bodyTxt.anchor.x = 0.5;
        headerTxt.anchor.y = bodyTxt.anchor.y = 0.5;

        const dia = new PIXI.Sprite(PIXI.Texture.from(DIALOG));
        dia.anchor.set(0.5, 0.5);
        rect.addChild(dia);

        if (imgName !== undefined) {
            const img = new PIXI.Sprite(PIXI.Texture.from(imgName));
            img.anchor.set(0.5, 0.5);
            rect.addChild(img);
        }

        rect.addChild(headerTxt);
        rect.addChild(bodyTxt);

        this.parent.stage.addChild(rect);
    }

    gameOver() {
        this.infoBox('', '', GAMEOVER);
        this.active = false;
    }

    win() {
        this.infoBox('YOU WIN', '');
        this.active = false;
        this.desktop.gamesWon++;
    }
}

export { Game };
