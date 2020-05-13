import {
    MeshStandardMaterial,
    PlaneBufferGeometry,
    Mesh,
    TextureLoader,
} from 'three';
import TEXTURE from './page.png';

class Page extends Mesh {
    constructor() {
        const loader = new TextureLoader();
        let texture = loader.load(TEXTURE);
        const material = new MeshStandardMaterial({
            color: 0xffe747,
            map: texture,
        });
        const geometry = new PlaneBufferGeometry(1, 1);
        super(geometry, material);

        this.visible = false;
        this.cameraScale = 1.5;
    }

    setVisible(visible) {
        this.visible = visible;
    }
}

export default Page;
