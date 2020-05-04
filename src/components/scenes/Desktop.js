import { Scene, Color } from 'three';
import { BasicLights } from 'lights';
import { Icon } from 'objects';

class Desktop extends Scene {
    constructor() {
        super();

        this.background = new Color(0x080808);

        var objects = [];
        objects.push(new BasicLights());

        //  Match icon to scene
        this.icons = [];
        const icon = new Icon('example.jpg', 0x4287f5, 0, 0, 'icon');
        this.addGameIcon(icon, 'game', objects);

        this.add(...objects);
    }

    addGameIcon(icon, game, objects) {
        this.icons[icon.name] = game;
        objects.push(icon);
    }

    onKeyDown(event) {
        //  Return to room if escape is pressed from desktop
        if (event.code == 'Escape') {
            return 'room';
        }
    }

    //  Handle onClick events
    onClick(event, objects) {
        //  Check for collision with computer
        let obj = objects[0].object;
        let cur = obj;
        while (cur != undefined) {
            if (cur instanceof Icon) {
                return this.icons[cur.name];
            }
            cur = cur.parent;
        }
    }
}

export { Desktop };
