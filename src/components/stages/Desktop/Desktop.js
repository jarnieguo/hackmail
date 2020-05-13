import * as PIXI from 'pixi.js';

import BACKIMG from './backimg.png';
import IMAGE from './ex.png';

class Desktop {
    constructor(parent) {
        this.parent = parent;
        this.objects = [];

        this.bgColor = 0xffdace;
        this.textStyle = new PIXI.TextStyle({
            fill: 'white',
            fontFamily: 'Tahoma',
            fontSize: 18,
            align: 'center',
            // dropShadow: true,
            // dropShadowAlpha: 0.3,
            // dropShadowBlur: 5,
            // dropShadowDistance: 2,
            stroke: 'black',
            strokeThickness: 4,
            // wordWrap: true,
            // wordWrapWidth: 100,
            // leading: -10
        });

        this.grid = {
            w: 70,
            pad: 60,
        };

        this.gamesWon = 0;

        this.initObjects();
    }

    initObjects() {
        this.initBg();
        this.initTopBar();
        this.initBottomBar();
        this.initTestButton(); // debug
    }

    stage() {
        // this.parent.renderer.backgroundColor = this.bgColor;
        this.parent.stage.addChild(...this.objects);
    }

    exit() {
        this.parent.stage.removeChildren();
    }

    addGames(games) {
        this.games = games;
        let i = 0;
        for (const game in games) {
            this.displayGameIcon(games[game], i);
            i++;
        }
    }

    displayGameIcon(game, index) {
        // Display img button
        const button = new PIXI.Sprite(game.icon);
        button.width = this.grid.w;
        button.height = this.grid.w;

        // TODO: arrange icons in grid on screen (responsive??) by index
        // Currently arranges them in a single horizontal row
        button.anchor.x = button.anchor.y = 0.5;
        button.position.set(this.grid.w, 2*this.grid.w + index * (this.grid.w + this.grid.pad));

        button.buttonMode = true;
        button.interactive = true;

        button.on('pointerdown', (event) => {
            // Clicking on game icon opens the game
            this.exit();
            game.stage();
        });
        button.on('pointerover', (event) => this.onPointerOver(button));
        button.on('pointerout', (event) => this.onPointerOut(button));

        // Display text label
        const label = new PIXI.Text(game.label, this.textStyle);
        label.anchor.x = label.anchor.y = 0.5;
        label.x = button.x;
        label.y = button.y + 2*this.grid.w/3;

        this.objects.push(button, label);
    }

    initBg() {
        const texture = new PIXI.Texture.from(BACKIMG);
        const bg = new PIXI.Sprite(texture);

        bg.position.set(0, 0);
        bg.width = this.parent.renderer.width;
        bg.height = this.parent.renderer.height;

        this.objects.push(bg);
    }

    initTopBar() {
        // Top bar
        // const topBar = new PIXI.Graphics();
        // topBar.beginFill(0xc8eaf7);
        // topBar.drawRect(0, 0, window.innerWidth, 70);
        // topBar.endFill();
        // this.objects.push(topBar);

        // Show label on top bar idk
        this.barLabel = new PIXI.Text(
            'Evidence collected: ' + this.gamesWon + '/3',
            this.textStyle
        );
        this.barLabel.x = 10;
        this.barLabel.y = 15;
        this.objects.push(this.barLabel);
    }

    initBottomBar() {
        const bottomBar = new PIXI.Graphics();
        bottomBar.beginFill(0x1B70DC);
        bottomBar.drawRect(0, window.innerHeight - 40, window.innerWidth, 40);
        bottomBar.endFill();
        this.objects.push(bottomBar);

        const start = new PIXI.Graphics();
        start.beginFill(0x4B9A36);
        start.drawRect(0, window.innerHeight - 40, 100, 40);
        start.endFill();
        this.objects.push(start);
    }

    // increase win count im too lazy to play the games
    initTestButton() {
        // Display img button
        const button = new PIXI.Sprite(new PIXI.Texture.from(IMAGE));
        button.width = 50;
        button.height = 50;
        button.position.set(50, 100);
        button.buttonMode = true;
        button.interactive = true;

        button.on('pointerdown', (event) => {
            this.gamesWon++;
        });
        button.on('pointerover', (event) => this.onPointerOver(button));
        button.on('pointerout', (event) => this.onPointerOut(button));
        this.objects.push(button);
    }

    // onClick(object) {
    //     object.tint = 0x333333;
    // }

    onPointerOver(object) {
        object.tint = 0x999999;
    }

    onPointerOut(object) {
        object.tint = 0xffffff;
    }

    update(timeStamp) {
        this.barLabel.text = 'Evidence collected: ' + this.gamesWon + '/3';
    }
}

export { Desktop };
