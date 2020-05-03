import { Scene, Color } from 'three';

class Desktop extends Scene {
    constructor() {
        super();

        this.background = new Color(0x080808);
    }
}

export { Desktop };