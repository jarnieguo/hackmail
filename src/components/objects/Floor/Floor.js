import { 
    MeshStandardMaterial,
    PlaneBufferGeometry,
    Mesh,
    TextureLoader,
    RepeatWrapping,
} from 'three';

class Floor extends Mesh {
    constructor() {
        const loader = new TextureLoader();
        let texture = loader.load("src/components/objects/Floor/carpet-1.jpg");   
        texture.wrapS = texture.wrapT = RepeatWrapping;
        texture.repeat.set(10, 10);

        const material = new MeshStandardMaterial({
            color: 0x404761,
            map: texture,
          });
        const geometry = new PlaneBufferGeometry(30, 30);
        super(geometry, material);

        //  Put floor in correct position
        this.position.y = -2.9;
        this.rotation.x = -Math.PI / 2;
    }
}

export default Floor;