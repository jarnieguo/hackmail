import { Group } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import MODEL from './Laptop_01.glb';

class Computer extends Group {
    constructor() {
        super();

        const loader = new GLTFLoader();

        this.name = 'computer';
        loader.load(MODEL, (gltf) => {
            gltf.scene.scale.set(.1, .1, .1);
            gltf.scene.position.set(0, .05, 0);
            this.add(gltf.scene);
        });
    }
} 

export default Computer;