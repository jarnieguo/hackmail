import * as PIXI from 'pixi.js';


class Desktop {
    constructor(parent) {
        this.parent = parent;
        this.objects = [];

        this.bgColor = 0xffdace;
        this.textStyle = new PIXI.TextStyle({ fill: '#000000' });

        this.grid = {
            w: 100,
            h: 130,
            pad: 20
        };

        // this.initObjects();
    }

    stage() {
        this.parent.renderer.backgroundColor = this.bgColor;
        this.parent.stage.addChild(...this.objects);
    }

    exit() {
        this.parent.stage.removeChildren();
    }

    addGames(games) {
        this.games = games;

        for (const game in games) {
            this.displayGameIcon(games[game]);

        }
    }


    displayGameIcon(game) {
        const button = new PIXI.Sprite(game.icon);
        button.width = this.grid.w;
        button.height = this.grid.w;
        button.position.set(50, 200);

        button.buttonMode = true;
        button.interactive = true;

        button.on('pointerdown', (event) => {
            this.exit();
            game.stage();
        });

        button.on('pointerover', (event) => this.onPointerOver(button));

        button.on('pointerout', (event) => this.onPointerOut(button));


        const label = new PIXI.Text(game.label, this.textStyle);
        label.x = button.x;
        label.y = button.y + this.grid.w;

        this.objects.push(button, label);
    }

    // initObjects() {
    // }


    // onClick(object) {
    //     object.tint = 0x333333;
    // }

    onPointerOver(object) {
        object.tint = 0x666666;
    }

    onPointerOut(object) {
        object.tint = 0xFFFFFF;
    }

}





export {
    Desktop
};
