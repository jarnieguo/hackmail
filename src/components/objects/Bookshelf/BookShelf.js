import { Group } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

import MODEL from './out.glb';

class Bookshelf extends Group {
    constructor() {
        super();

        this.name = 'bookshelf';
        const loader = new GLTFLoader();
        loader.load(MODEL, (gltf) => {
            gltf.scene.scale.multiplyScalar(5.5);
            // gltf.scene.rotation.set(0, Math.PI / 2, 0);
            gltf.scene.position.set(-8, -5, -1.5);
            this.add(gltf.scene);
        });

    }
}

export default Bookshelf;
