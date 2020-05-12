import { Group } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

import MODEL from './out.glb';

class Lamp extends Group {
    constructor() {
        super();

        this.name = 'lamp';
        const loader = new GLTFLoader();
        loader.load(
            MODEL,
            (gltf) => {
                gltf.scene.scale.multiplyScalar(.01);
                gltf.scene.position.set(2.5, .1, -.4);
                // gltf.scene.position.set(0, .5, 0);
                this.add(gltf.scene);
            }
        );
    }
}

export default Lamp;