import { 
    Group,
    SpotLight,
    AmbientLight,
    PointLight,
    HemisphereLight,
    RectAreaLight 
} from 'three';

class BasicLights extends Group {
    constructor(...args) {
        // Invoke parent Group() constructor with our args
        super(...args);

        const dir = new SpotLight(0xffffff, 1.6, 7, 0.8, 1, 1);
        const ambi = new AmbientLight(0x404040, 1);
        const hemi = new HemisphereLight(0xffffbb, 0x080820, 1);
        const point = new PointLight(0xffffff, 1);
        point.position.set(2.5, 1.5, -.4);
        const rectLight = new RectAreaLight(0xffffff, .25, 4.5, 3.1);
        rectLight.position.set(0, 3, -2.9)

        dir.position.set(5, 1, 2);
        dir.target.position.set(0, 0, 0);

        // this.add(ambi);
        this.add(hemi);
        // this.add(dir);
        this.add(point);
        this.add(rectLight);

        this.on = true;
        this.point = point;
        this.hemi = hemi;
    }

    toggleLights() {
        if (this.on) {
            this.on = false;
            this.point.intensity = 0;
            this.hemi.intensity = .1;
        } else {
            this.on = true;
            this.point.intensity = 1;
            this.hemi.intensity = 1;
        }
    }
}

export default BasicLights;
