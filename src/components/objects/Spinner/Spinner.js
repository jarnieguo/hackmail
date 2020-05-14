import { Group } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min.js';

import MODEL from './out.glb';
import { TilingSprite } from 'pixi.js';

class Spinner extends Group {
    constructor() {
        super();

        this.name = 'spinner';
        const loader = new GLTFLoader();
        loader.load(
            MODEL,
            (gltf) => {
                gltf.scene.scale.multiplyScalar(.1);
                this.add(gltf.scene);
            }
        );
        this.position.set(-1.5, .1, .4);
        this.isSpinning = false;
    }

    spin() {
        if (!this.isSpinning) {
            const scale = 100;
            const spin = new TWEEN.Tween(this.rotation)
            .to({y: scale * 2 * Math.PI}, scale * 500)
            .onComplete(() => { 
                this.isSpinning = false 
                this.rotation.y = 0;
            });

            spin.start();
            this.isSpinning = true;
        }
        
    }

    update() {
        TWEEN.update();
    }
}

export default Spinner;