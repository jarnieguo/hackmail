import { Group } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

import MODEL from './out.glb';

class Santa extends Group {
    constructor() {
        super();

        this.name = 'santa';
        const loader = new GLTFLoader();
        loader.load(
            MODEL,
            (gltf) => {
                gltf.scene.scale.multiplyScalar(1.5);
                gltf.scene.position.set(-1.5, .4, -1);
                this.add(gltf.scene);
            }
        );
    }
}

export default Santa;