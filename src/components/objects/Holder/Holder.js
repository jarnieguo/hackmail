import { Group } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

import MODEL from './out.glb';

class Holder extends Group {
    constructor() {
        super();

        this.name = 'holder';
        const loader = new GLTFLoader();
        loader.load(
            MODEL,
            (gltf) => {
                gltf.scene.position.set(5.5, -6.3, -1.25);
                gltf.scene.scale.multiplyScalar(.3);
                this.add(gltf.scene);
            }
        );
    }
}

export default Holder;