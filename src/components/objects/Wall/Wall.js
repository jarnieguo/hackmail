import {
    MeshStandardMaterial,
    PlaneBufferGeometry,
    Mesh,
    TextureLoader,
    RepeatWrapping,
} from 'three';
import TEXTURE from './wall-1.jpg';

class Wall extends Mesh {
    constructor(x, y, z, rotationX, rotationY) {
        const loader = new TextureLoader();
        let texture = loader.load(TEXTURE);
        texture.wrapS = texture.wrapT = RepeatWrapping;
        texture.repeat.set(10, 10);

        const material = new MeshStandardMaterial({
            color: 0x8b8c8b,
            map: texture,
        });
        const geometry = new PlaneBufferGeometry(40, 40);
        super(geometry, material);

        this.position.set(x, y, z);
        this.rotation.x = rotationX;
        this.rotation.y = rotationY;
    }
}

export default Wall;
