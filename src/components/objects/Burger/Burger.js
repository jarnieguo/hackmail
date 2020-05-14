import { Group } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

import MODEL from './out.glb';

class Burger extends Group {
    constructor() {
        super();

        this.name = 'burger';
        const loader = new GLTFLoader();
        loader.load(MODEL, (gltf) => {
            gltf.scene.scale.multiplyScalar(2.2);
            gltf.scene.rotation.set(0, 2 * Math.PI / 3, 0);
            gltf.scene.position.set(-2, -2.25, 1);
            this.add(gltf.scene);
        });

    }
}

export default Burger;
