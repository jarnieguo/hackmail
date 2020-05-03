import { Scene, Color } from 'three';
import { Desk } from 'objects';
import { BasicLights } from 'lights';
import { Computer, Floor } from '../objects';

class Room extends Scene {
    constructor() {
        super();

        this.background = new Color(0x7ec0ee);

        const desk = new Desk();
        const lights = new BasicLights();
        const laptop = new Computer();
        const floor = new Floor();
        this.add(desk, lights, laptop, floor);
    }
}

export { Room };