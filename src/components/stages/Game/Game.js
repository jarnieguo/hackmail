import * as PIXI from 'pixi.js';
import IMAGE from './ex.png';
import DIALOG from './dialog.png';
import GAMEOVER from './gameover.png';
import ERROR from './err.png';
import OK from './ok.png';
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
        this.winText = 'Evidence collected!';

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

    setWinText(winText) {
        this.winText = winText;
    }

    // Don't override
    stage() {
        this.parent.renderer.backgroundColor = this.bgColor;
        this.active = true;
        this.parent.stage.addChild(...this.objects);
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
        topBar.beginFill(0x1B70DC);
        topBar.drawRect(0, 0, window.innerWidth, 40);
        topBar.endFill();
        this.objects.push(topBar);

        // Exit button
        const exitButton = new PIXI.Sprite(PIXI.Texture.from(EXIT));
        exitButton.width = 30;
        exitButton.height = 30;
        exitButton.position.set(window.innerWidth - 35, 5);
        exitButton.buttonMode = true;
        exitButton.interactive = true;
        exitButton.on('pointerdown', (event) => this.exit());
        exitButton.on('pointerover', (event) => this.desktop.onPointerOver(exitButton));
        exitButton.on('pointerout', (event) => this.desktop.onPointerOut(exitButton));
        this.objects.push(exitButton);

        // icon
        const icon = new PIXI.Sprite(this.icon);
        icon.width = 30;
        icon.height = 30;
        icon.position.set(10, 5);
        this.objects.push(icon);

        // Show label on top bar idk
        const barLabel = new PIXI.Text(
            this.label,
            this.desktop.textStyle
        );
        barLabel.x = 50;
        barLabel.y = 5;
        this.objects.push(barLabel);
    }

    infoBox(header, text, imgName) {
        const w = 500;
        const h = 300;

        const rect = new PIXI.Graphics();
        rect.beginFill(0x1B70DC);
        rect.drawRoundedRect(0, 0, w, h, 10);
        rect.endFill();
        rect.x = (window.innerWidth - w) / 2;
        rect.y = (window.innerHeight - h) / 2;

        const innerRect = new PIXI.Graphics();
        innerRect.beginFill(0xffffff);
        innerRect.drawRoundedRect(5, 40, w-10, h-45, 10);
        innerRect.endFill();

        const btn = new PIXI.Graphics();
        btn.beginFill(0xeeeeee);
        btn.drawRoundedRect((w-150)/2, h-60, 150, 40, 10);
        btn.endFill();
        btn.buttonMode = true;
        btn.interactive = true;
        btn.on('pointerdown', (event) => {
            this.exit();
        });
        btn.on('pointerover', (event) => this.desktop.onPointerOver(btn));
        btn.on('pointerout', (event) => this.desktop.onPointerOut(btn));

        const btnText = new PIXI.Text("OK", {
            fontFamily: 'Tahoma', fontSize: 18,
            align: 'center', wordWrap: true,
            wordWrapWidth: w-20, leading: -10
        });
        btnText.anchor.x = btnText.anchor.y = 0.5;
        btnText.position.set(w/2, h-40);
        btn.addChild(btnText);

        const headerTxt = new PIXI.Text(header, this.desktop.textStyle);
        const bodyTxt = new PIXI.Text(text, {
            fontFamily: 'Tahoma', fontSize: 18,
            align: 'left', wordWrap: true,
            wordWrapWidth: w-60-110, leading: -5
        });

        headerTxt.position.x = rect.width / 2;
        headerTxt.position.y = 22;
        bodyTxt.position.y = rect.height * 0.4;
        bodyTxt.position.x = 110;

        headerTxt.anchor.x = 0.5;
        headerTxt.anchor.y = bodyTxt.anchor.y = 0.5;

        const img = new PIXI.Sprite(PIXI.Texture.from(imgName));
        img.position.set(20, rect.height * 0.4);
        img.width = img.height = 70;
        img.anchor.y = 0.5;

        rect.addChild(innerRect);
        rect.addChild(img);
        rect.addChild(btn);
        rect.addChild(headerTxt);
        rect.addChild(bodyTxt);

        this.parent.stage.addChild(rect);
    }

    gameOver() {
        this.infoBox('Error', 'Uh oh! An error has occurred. Please exit and restart the program.', ERROR);
        this.active = false;
    }

    winDialog() {
        this.infoBox('Congratulations', this.winText, OK);
        this.active = false;
    }

    win() {
        this.winDialog();
        this.desktop.gamesWon++;
    }

    // infoBox(header, text, imgName) {
    //     const rect = new PIXI.Graphics();
    //     rect.anchor.set(0.5, 0.5);
    //     // Rectangle
    //     // rect.beginFill(0xc8eaf7);
    //     // rect.drawRect(0, 0, 500, 300);
    //     // rect.endFill();
    //     rect.x = window.innerWidth / 2;
    //     rect.y = window.innerHeight / 2;

    //     const headerTxt = new PIXI.Text(header);
    //     const bodyTxt = new PIXI.Text(text);

    //     headerTxt.position.x = bodyTxt.position.x = rect.width / 2;
    //     headerTxt.position.y = rect.height * 0.1;
    //     bodyTxt.position.y = rect.height * 0.3;

    //     headerTxt.anchor.x = bodyTxt.anchor.x = 0.5;
    //     headerTxt.anchor.y = bodyTxt.anchor.y = 0.5;

    //     const dia = new PIXI.Sprite(PIXI.Texture.from(DIALOG));
    //     dia.anchor.set(0.5, 0.5);
    //     rect.addChild(dia);

    //     if (imgName !== undefined) {
    //         const img = new PIXI.Sprite(PIXI.Texture.from(imgName));
    //         img.anchor.set(0.5, 0.5);
    //         rect.addChild(img);
    //     }

    //     rect.addChild(headerTxt);
    //     rect.addChild(bodyTxt);

    //     this.parent.stage.addChild(rect);
    // }

    // gameOver() {
    //     this.infoBox('', '', GAMEOVER);
    //     this.active = false;
    // }

    // win() {
    //     this.infoBox('YOU WIN', '');
    //     this.active = false;
    //     this.desktop.gamesWon++;
    // }
}

export { Game };
