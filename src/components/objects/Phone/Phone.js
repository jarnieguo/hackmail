import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import {
    Group,
    MeshStandardMaterial,
    PlaneBufferGeometry,
    Mesh,
    TextureLoader
} from 'three';

import MODEL from './out.glb';
import TEXTURE from './screen.jpeg';

class Phone extends Group {
    constructor(onDesk) {
        super();

        if (onDesk) {
            this.name = 'phone';
        }
        const loader = new GLTFLoader();
        loader.load(
            MODEL,
            (gltf) => {
                gltf.scene.scale.multiplyScalar(.005);
                gltf.scene.rotation.x = Math.PI / 2;
                this.add(gltf.scene);
            }
        );

        const textureLoader = new TextureLoader();
        let texture = textureLoader.load(TEXTURE);
        const material = new MeshStandardMaterial({
            color: 0x68768c,
            // color: 0xffffff,
            map: texture,
        });
        const geometry = new PlaneBufferGeometry(1, 1);
        const screen = new Mesh(geometry, material);
        screen.scale.set(.3, .55, 1);
        screen.position.set(.01, .01, .065);
        this.add(screen);

        this.visible = onDesk;
        if (onDesk) {
            this.rotation.x = -Math.PI / 2;
            this.position.set(-1, .025, -.1);
        }

        this.cameraScale = 1.1;
    }

    setVisible(visible) {
        this.visible = visible;
    }
}

export default Phone;