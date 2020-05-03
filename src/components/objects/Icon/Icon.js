import {
    Mesh,
    BoxGeometry,
    MeshStandardMaterial,
    TextureLoader
} from 'three';

class Icon extends Mesh {
    constructor(img, color, x, y, name) {
        const loader = new TextureLoader();
        const texture = loader.load("src/components/objects/Icon/" + img);
        const geometry = new BoxGeometry(1, 1, 1);
        const material = new MeshStandardMaterial({
            color,
            map: texture,
        });

        super(geometry, material);
        this.position.set(x, y, 0);
        this.name = name;
    }
}

export default Icon;