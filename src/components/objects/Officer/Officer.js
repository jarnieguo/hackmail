import { Group } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

import MODEL from './out.glb';

class Officer extends Group {
    constructor() {
        super();

        this.name = 'officer';
        const loader = new GLTFLoader();
        loader.load(
            MODEL,
            (gltf) => {
                gltf.scene.scale.multiplyScalar(2.3);
                gltf.scene.position.set(-2.2, .4, -1);
                this.add(gltf.scene);
            }
        );
    }
}

export default Officer;