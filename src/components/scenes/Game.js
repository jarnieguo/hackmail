import { Scene, Color } from 'three';
import { BasicLights } from 'lights';
import { Icon } from 'objects';

class Game extends Scene {
    constructor() {
        super();

        this.background = new Color(0xffffff);

        var objects = [];
        objects.push(new BasicLights());

        const exit = new Icon("exit.png", 0xffffff , 3, 3, "exit");
        objects.push(exit);

        this.add(...objects);
    }

    onKeyDown(event) {
        //  Return to desktop if escape is pressed from game
        if (event.code == "Escape") {
            return 'desktop';
        }
    }

    onClick(event, objects) {
        //  Check for collision with computer
        let obj = objects[0].object;
        let cur = obj;
        while (cur != undefined) {
            if (cur.name == "exit") {
                return 'desktop';
            }
            cur = cur.parent;
        }
    }
}

export { Game };
