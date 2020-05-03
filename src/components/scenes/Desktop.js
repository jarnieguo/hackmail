import { Scene, Color } from 'three';
import { BasicLights } from 'lights';
import { Icon } from 'objects';

class Desktop extends Scene {
    constructor() {
        super();

        this.background = new Color(0x080808);

        var objects = [];
        objects.push(new BasicLights());

        const icon = new Icon("example.jpg", 0x4287f5, 0, 0, "example_name");
        objects.push(icon);

        this.add(...objects);
    }

    onKeyDown(event) {
        //  Return to room if escape is pressed from desktop
        if (event.code == "Escape") {
            return 'room';
        }
    }
}

export { Desktop };