import {
    MeshStandardMaterial,
    PlaneBufferGeometry,
    Mesh,
    TextureLoader,
    RepeatWrapping,
} from 'three';
import TEXTURE from './wall-1.jpg';

class Wall extends Mesh {
    constructor(x, y, z, rotation) {
        const loader = new TextureLoader();
        let texture = loader.load(TEXTURE);
        texture.wrapS = texture.wrapT = RepeatWrapping;
        texture.repeat.set(10, 10);

        const material = new MeshStandardMaterial({
            color: 0x8b8c8b,
            map: texture,
        });
        const geometry = new PlaneBufferGeometry(30, 30);
        super(geometry, material);

        this.position.set(x, y, z);
        this.rotation.x = rotation;
    }
}

export default Wall;
