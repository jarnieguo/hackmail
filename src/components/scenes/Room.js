import { Scene, Color } from 'three';
import { Desk } from 'objects';
import { BasicLights } from 'lights';
import { Computer, Floor, Wall } from '../objects';

class Room extends Scene {
    constructor() {
        super();

        this.background = new Color(0x7ec0ee);

        let objects = [];
        objects.push(new Desk());
        objects.push(new BasicLights());
        objects.push(new Computer());
        objects.push(new Floor());
        objects.push(new Wall(0, 0, -5, 0));
        this.add(...objects);
    }

    //  Handle onClick events
    onClick(event, objects) {
        //  Check for collision with computer
        let obj = objects[0].object;
        let cur = obj;
        while (cur != undefined) {
            if (cur.name == "computer") {
                return 'desktop';
            }
            cur = cur.parent;
        }
    }
}

export { Room };