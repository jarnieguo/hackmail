import { Group } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

import MODEL from './out.glb';

class Pen extends Group {
    constructor() {
        super();

        this.name = 'pen';
        const loader = new GLTFLoader();
        loader.load(
            MODEL,
            (gltf) => {
                gltf.scene.scale.multiplyScalar(.1);
                // gltf.scene.position.set(1.3, .1, .1);
                this.add(gltf.scene);
            }
        );
    }
}

export default Pen;