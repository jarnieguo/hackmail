import * as PIXI from 'pixi.js';
import IMAGE from './ex.png';
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
        this.label = "Game Label";
        this.textStyle = new PIXI.TextStyle({ fill: '#000000' });

        // this.initObjects();
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

    // Don't override
    stage() {
        this.parent.renderer.backgroundColor = this.bgColor;
        this.parent.stage.addChild(...this.objects);
    }
    // Don't override
    exit() {
        this.parent.stage.removeChildren();
        this.desktop.stage();
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
        exitButton.position.set(window.innerWidth-60, 10);
        exitButton.buttonMode = true;
        exitButton.interactive = true;
        exitButton.on('pointerdown', (event) => this.exit());
        this.objects.push(exitButton);

        // Show label on top bar idk
        const barLabel = new PIXI.Text(this.label, this.textStyle);
        barLabel.x = 10;
        barLabel.y = 15;
        this.objects.push(barLabel);
    }

}





export {
    Game
};
