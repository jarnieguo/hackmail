import * as PIXI from 'pixi.js';
import IMAGE from './ex.png';

// https://pixijs.io/examples/#/interaction/custom-hitarea.js

class Test {
    constructor(parent, desktop) {
        this.parent = parent;
        this.desktop = desktop;
        this.objects = [];

        this.bgColor = 0x1099bb;

        this.initObjects();
    }


    stage() {
        this.parent.renderer.backgroundColor = this.bgColor;
        this.parent.stage.addChild(...this.objects);
    }

    exit() {
        this.parent.stage.removeChildren();
        this.desktop.stage();
    }

    initObjects() {
        const yellowStar = PIXI.Texture.from(IMAGE);

        // Standard Sprite Button
        const starButton1 = new PIXI.Sprite(yellowStar);

        starButton1.position.set(50, 200);

        starButton1.buttonMode = true;
        starButton1.interactive = true;

        starButton1.on('pointerdown', (event) => this.onClick(starButton1));

        starButton1.on('pointerover', (event) => this.onPointerOver(starButton1));

        starButton1.on('pointerout', (event) => this.onPointerOut(starButton1));

        // Custom Hitarea Button
        const starButton2 = new PIXI.Sprite(yellowStar);
        starButton2.position.set(250, 200);

        // Create a hitarea that matches the sprite, which will be used for point
        // intersection
        starButton2.hitArea = new PIXI.Polygon([
            80, 0,
            100, 50,
            160, 55,
            115, 95,
            130, 150,
            80, 120,
            30, 150,
            45, 95,
            0, 55,
            60, 50,
        ]);
        starButton2.buttonMode = true;
        starButton2.interactive = true;

        starButton2.on('pointerdown', (event) => this.onClick(starButton2));

        starButton2.on('pointerover', (event) => this.onPointerOver(starButton2));

        starButton2.on('pointerout', (event) => this.onPointerOut(starButton2));

        // With Mask, No Hit Area
        const starButton3 = new PIXI.Sprite(yellowStar);

        starButton3.position.set(450, 200);

        starButton3.buttonMode = true;
        starButton3.interactive = true;

        const squareMask = new PIXI.Graphics()
            .beginFill(0xFFFFFF)
            .drawRect(starButton3.x, starButton3.y, 75, 200)
            .endFill();

        starButton3.mask = squareMask;

        starButton3.on('pointerdown', (event) => this.onClick(starButton3));

        starButton3.on('pointerover', (event) => this.onPointerOver(starButton3));

        starButton3.on('pointerout', (event) => this.onPointerOut(starButton3));

        // With a Mask and Hit Area
        // Hitareas ignore masks. You can still click on a button made in this way,
        // even from areas covered by a mask
        const starButton4 = new PIXI.Sprite(yellowStar);
        starButton4.position.set(600, 200);

        const squareMask2 = new PIXI.Graphics()
            .beginFill(0xFFFFFF)
            .drawRect(starButton4.x, starButton4.y, 75, 200)
            .endFill();

        starButton4.mask = squareMask2;

        // Again, hitarea for intersection checks
        starButton4.hitArea = new PIXI.Polygon([
            80, 0,
            100, 50,
            160, 55,
            115, 95,
            130, 150,
            80, 120,
            30, 150,
            45, 95,
            0, 55,
            60, 50,
        ]);
        starButton4.buttonMode = true;
        starButton4.interactive = true;

        starButton4.on('pointerdown', (event) => this.onClick(starButton4));

        starButton4.on('pointerover', (event) => this.onPointerOver(starButton4));

        starButton4.on('pointerout', (event) => this.onPointerOut(starButton4));

        const style = new PIXI.TextStyle({ fill: '#ffffff' });

        const text1 = new PIXI.Text('Standard', style);
        text1.x = starButton1.x + 25;
        text1.y = starButton1.y + 170;

        const text2 = new PIXI.Text('Hit Area', style);
        text2.x = starButton2.x + 35;
        text2.y = starButton2.y + 170;

        const text3 = new PIXI.Text('Mask', style);
        text3.x = starButton3.x + 10;
        text3.y = starButton3.y + 170;

        const text4 = new PIXI.Text('Mask + Hit Area', style);
        text4.x = starButton4.x - 10;
        text4.y = starButton4.y + 170;

        this.objects.push(
            starButton2,
            starButton1,
            starButton3,
            starButton4,
            squareMask,
            squareMask2,
            text1,
            text2,
            text3,
            text4
        );
    }

    onClick(object) {
        object.tint = 0x333333;
        this.exit();
    }

    onPointerOver(object) {
        object.tint = 0x666666;
    }

    onPointerOut(object) {
        object.tint = 0xFFFFFF;
    }

}





export {
    Test
};
