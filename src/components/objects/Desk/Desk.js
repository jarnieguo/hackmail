import { Group } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
// import MODEL from '/src/components/objects/Desk/computer_desk_4/scene.gltf';
import MODEL from './desk.glb';

class Desk extends Group {
    constructor() {
        super();

        this.name = 'desk';
        const loader = new GLTFLoader();
        loader.load(MODEL, (gltf) => {
            gltf.scene.scale.set(1.5, 1, 1);
            // gltf.scene.position.set(0, .5, 0);
            this.add(gltf.scene);
        });
        // loader.load('src/components/objects/Desk/computer_desk_3/scene.gltf', (gltf) => {
        //     gltf.scene.scale.multiplyScalar(4);
        //     gltf.scene.position.set(-3.3, -3.15, -1);
        //     this.add(gltf.scene);
        // });
    }
}

export default Desk;
