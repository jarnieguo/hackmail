import { Scene, Color } from 'three';
import { Desk } from 'objects';
import { BasicLights } from 'lights';
import { 
    Computer,
    Floor,
    Wall,
    Window,
    Page,
    Notebook,
    Phone
} from '../objects';

class Room extends Scene {
    constructor() {
        super();

        this.background = new Color(0x7ec0ee);

        let objects = [];
        objects.push(new Desk());
        objects.push(new BasicLights());
        objects.push(new Computer());
        objects.push(new Floor());
        objects.push(new Wall(0, 0, -3, 0, 0));
        objects.push(new Wall(0, 0, 20, Math.PI, 0));
        objects.push(new Wall(-20, 0, 0, 0, Math.PI / 2));
        objects.push(new Wall(20, 0, 0, 0, -Math.PI / 2));
        objects.push(new Window(0, 3, -2.95, 0, 0));
        objects.push(new Notebook());
        objects.push(new Phone(true));

        this.open = null;
        const page = new Page();
        this.page = page;
        objects.push(page);
        const phone = new Phone(false);
        this.phone = phone;
        objects.push(phone);

        this.add(...objects);
    }

    //  Handle onClick events
    onClick(camera, objects) {
        //  Something is open; close it
        if (this.open) {
            this.open.setVisible(false);
            this.open = null;
            return;
        }
        
        //  Check for collisions
        for (let i = 0; i < objects.length; i++) {
            let obj = objects[i].object;
            let cur = obj;
            while (cur != undefined) {
                if (cur.name == "notebook") {
                    this.openObject(camera, this.page);
                    return;
                } else if (cur.name == "phone") {
                    this.openObject(camera, this.phone);
                    return;
                } else if (cur.name == 'computer') {
                    return 'desktop';
                }
                cur = cur.parent;
            }
        }
    }

    openObject(camera, object) {
        this.open = object;
        this.positionToCamera(camera, object);
        object.setVisible(true);
    }

    positionToCamera(camera, object) {
        object.quaternion.copy(camera.quaternion);
        let position = camera.position.clone();
        let norm = position.clone().normalize();
        position.sub(norm.multiplyScalar(object.cameraScale));
        object.position.copy(position);
    }
}

export { Room };