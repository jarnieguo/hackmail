import { Scene, Color } from 'three';
import { Desk } from 'objects';
import { BasicLights } from 'lights';
import { Computer, Floor, Wall, Page, Notebook } from '../objects';

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
        objects.push(new Notebook());

        this.open = false;
        const page = new Page();
        this.page = page;
        objects.push(page);

        this.add(...objects);
    }

    //  Handle onClick events
    onClick(event, objects) {
        //  Something is open; close it
        if (this.open) {
            this.page.setVisible(false);
            this.open = false;
            return;
        }
        
        //  Check for collisions
        for (let i = 0; i < objects.length; i++) {
            let obj = objects[i].object;
            let cur = obj;
            while (cur != undefined) {
                if (cur.name == "notebook") {
                    //  Open page
                    this.open = true;
                    this.page.setVisible(true);
                    return;
                } else if (cur.name == 'computer') {
                    return 'desktop';
                }
                cur = cur.parent;
            }
        }
    }
}

export { Room };