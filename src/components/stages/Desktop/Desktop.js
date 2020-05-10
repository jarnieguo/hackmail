import * as PIXI from 'pixi.js';


class Desktop {
    constructor(parent) {
        this.parent = parent;
        this.objects = [];

        this.bgColor = 0xffdace;
        this.textStyle = new PIXI.TextStyle({ fill: '#000000' });

        this.grid = {
            w: 100,
            pad: 50
        };


        this.gamesWon = 0;


        this.initObjects();
    }

    initObjects() {
      this.initTopBar();
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
        button.position.set(50 + index*(this.grid.w+this.grid.pad), 200);

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
        label.x = button.x;
        label.y = button.y + this.grid.w;

        this.objects.push(button, label);
    }

    initTopBar() {
        // Top bar
        // const topBar = new PIXI.Graphics();
        // topBar.beginFill(0xc8eaf7);
        // topBar.drawRect(0, 0, window.innerWidth, 70);
        // topBar.endFill();
        // this.objects.push(topBar);

        // Show label on top bar idk
        const barLabel = new PIXI.Text("Games Won: " + this.gamesWon, this.textStyle);
        barLabel.x = 10;
        barLabel.y = 15;
        this.objects.push(barLabel);

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
