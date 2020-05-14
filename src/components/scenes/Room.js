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
    Phone,
    Lamp,
    Pen,
    Holder,
    Spinner,
    Door,
    Bookshelf,
    Couch
} from '../objects';

class Room extends Scene {
    constructor() {
        super();

        this.background = new Color(0x7ec0ee);

        this.objects = {
           desk: new Desk(),
           lamp: new Lamp(),
           computer: new Computer(),
           floor: new Floor(),
           wall1: new Wall(0, 0, -3, 0, 0),
           wall2: new Wall(0, 0, 20, Math.PI, 0),
           wall3: new Wall(-20, 0, 0, 0, Math.PI / 2),
           wall4: new Wall(20, 0, 0, 0, -Math.PI / 2),
           window: new Window(0, 3, -2.95, 0, 0),
           notebook: new Notebook(),
           page: new Page(),
           phone_desk: new Phone(true),
           phone: new Phone(false),
           lights: new BasicLights(),
           pen: new Pen(),
           holder: new Holder(),
           spinner: new Spinner(),
           door: new Door(),
           bookshelf: new Bookshelf(),
           couch: new Couch()
        };

        this.open = null;
        this.add(...Object.values(this.objects));
    }

    //  Handle onClick events
    onClick(camera, controls, objects) {
        //  Something is open; close it
        if (this.open) {
            this.open.setVisible(false);
            this.open = null;
            controls.enabled = true;
            return;
        }

        //  Check for collisions
        for (let i = 0; i < objects.length; i++) {
            let obj = objects[i].object;
            let cur = obj;
            while (cur != undefined) {

                switch (cur.name) {
                    case "notebook":
                        this.openObject(camera, controls, this.objects.page);
                        return;

                    case "phone":
                        this.openObject(camera, controls, this.objects.phone);
                        return;

                    case "computer":
                        // this.lookAtLaptop(camera);
                        return 'desktop';

                    case "lamp":
                        this.objects.lights.toggleLights();
                        return;

                    case "spinner":
                        this.objects.spinner.spin();
                }
                cur = cur.parent;
            }
        }
    }

    openObject(camera, controls, object) {
        this.open = object;
        this.positionToCamera(camera, object);
        object.setVisible(true);
        controls.enabled = false;
    }

    positionToCamera(camera, object) {
        object.quaternion.copy(camera.quaternion);
        let position = camera.position.clone();
        let norm = position.clone().normalize();
        position.sub(norm.multiplyScalar(object.cameraScale));
        object.position.copy(position);
    }

    lookAtLaptop(camera) {
        camera.position.set(0, 0.8, 1);
    }

    update(timestamp) {
        this.objects.spinner.update();
    }
}

export { Room };
