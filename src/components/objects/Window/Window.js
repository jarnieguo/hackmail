import {
    MeshStandardMaterial,
    PlaneBufferGeometry,
    Mesh,
    TextureLoader,
    RepeatWrapping,
} from 'three';
import TEXTURE from './window-5.jpg';

class Window extends Mesh {
    constructor(x, y, z, rotationX, rotationY) {
        const loader = new TextureLoader();
        let texture = loader.load(TEXTURE);
        texture.wrapS = texture.wrapT = RepeatWrapping;
        texture.repeat.set(1, 1);

        const material = new MeshStandardMaterial({
            color: 0x8b8c8b,
            map: texture,
        });
        const geometry = new PlaneBufferGeometry(5, 3.5);
        super(geometry, material);

        this.position.set(x, y, z);
        this.rotation.x = rotationX;
        this.rotation.y = rotationY;
    }
}

export default Window;
