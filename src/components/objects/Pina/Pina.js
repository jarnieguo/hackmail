import { Group } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

import MODEL from './out.glb';

class Pina extends Group {
    constructor() {
        super();

        this.name = 'pina';
        const loader = new GLTFLoader();
        loader.load(MODEL, (gltf) => {
            gltf.scene.scale.multiplyScalar(0.5);
            gltf.scene.rotation.set(0, - Math.PI / 2, 0);
            gltf.scene.position.set(3, 0.055, 0.1);
            this.add(gltf.scene);
        });

    }
}

export default Pina;
