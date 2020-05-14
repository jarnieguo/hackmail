import { Group } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

import MODEL from './out.glb';

class Skateboard extends Group {
    constructor() {
        super();

        this.name = 'skateboard';
        const loader = new GLTFLoader();
        loader.load(MODEL, (gltf) => {
            gltf.scene.scale.multiplyScalar(3);
            gltf.scene.rotation.set(-5 * Math.PI / 8, - Math.PI / 2, 0);
            gltf.scene.position.set(5, 2.5, 1);
            this.add(gltf.scene);
        });

    }
}

export default Skateboard;
