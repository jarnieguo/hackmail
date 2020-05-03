import { Group } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import MODEL from './Laptop_01.glb';

class Computer extends Group {
    constructor() {
        super();

        this.name = 'computer';
        const loader = new GLTFLoader();
        loader.load(MODEL, (gltf) => {
            gltf.scene.scale.set(.1, .1, .1);
            gltf.scene.position.set(0, .1, 0);
            this.add(gltf.scene);
        });
    }
} 

export default Computer;