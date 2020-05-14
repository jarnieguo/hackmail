import { Group } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

import MODEL from './out.glb';

class Door extends Group {
    constructor() {
        super();

        this.name = 'door';
        const loader = new GLTFLoader();
        loader.load(MODEL, (gltf) => {
            gltf.scene.scale.multiplyScalar(0.03);
            // gltf.scene.rotation.set(0, Math.PI / 2, 0);
            gltf.scene.position.set(12, -3, -3);
            this.add(gltf.scene);
        });

    }
}

export default Door;
