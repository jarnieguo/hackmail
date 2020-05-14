import { Group } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

import MODEL from './out.glb';

class Couch extends Group {
    constructor() {
        super();

        this.name = 'couchf';
        const loader = new GLTFLoader();
        loader.load(MODEL, (gltf) => {
            gltf.scene.scale.multiplyScalar(6);
            // gltf.scene.rotation.set(0, Math.PI / 2, 0);
            gltf.scene.position.set(-16, -0.5, -1.5);
            this.add(gltf.scene);
        });

    }
}

export default Couch;
