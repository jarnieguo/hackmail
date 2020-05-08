import { Group } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

import MODEL from './out.glb';

class Notebook extends Group {
    constructor() {
        super();

        this.name = 'notebook';
        const loader = new GLTFLoader();
        loader.load(
            MODEL,
            (gltf) => {
                gltf.scene.scale.multiplyScalar(.1);
                gltf.scene.position.set(1.3, .1, .1);
                // gltf.scene.position.set(0, .5, 0);
                this.add(gltf.scene);
            }
        );
    }
}

export default Notebook;