import { Group } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

class Desk extends Group {
    constructor() {
        super();

        this.name = 'desk';
        const loader = new GLTFLoader();
        loader.load('src/components/objects/Desk/computer_desk_4/scene.gltf', (gltf) => {
            gltf.scene.scale.set(1.5, 1, 1);
            this.add(gltf.scene);
        });
    }
}

export default Desk;