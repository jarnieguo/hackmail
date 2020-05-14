import { Group } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min';

import MODEL from './out.glb';

class Pikachu extends Group {
    constructor() {
        super();

        this.name = 'pikachu';
        const loader = new GLTFLoader();
        loader.load(
            MODEL,
            (gltf) => {
                gltf.scene.scale.multiplyScalar(.003);
                gltf.scene.rotation.set(-.1, Math.PI / 2, 0);
                this.add(gltf.scene);
            }
        );

        this.position.set(-1.8, .5, -1);

        this.isRocking = false;
        this.rockTimes = 0;
    }

    startRock() {
        if (!this.isRocking) {
            this.isRocking = true;
            this.rock(.1);
        }
    }

    rock(rot) {
        const time = 200;
        const rockForward = new TWEEN.Tween(this.rotation)
            .to({x: -rot}, time);
        const rockBack = new TWEEN.Tween(this.rotation)
            .to({x: rot}, time * 2);
        const rockEnd = new TWEEN.Tween(this.rotation)
            .to({x: 0}, time);
        
        rockForward.onComplete(() => rockBack.start());
        rockBack.onComplete(() => rockEnd.start());
        rockEnd.onComplete(() => {
            if (this.rockTimes < 5) {
                this.rockTimes++;
                rockForward.start();
            } else {
                this.rockTimes = 0;
                this.isRocking = false;
            }
        });

        rockForward.start()
    }

    update() {
        TWEEN.update();
    }
}

export default Pikachu;