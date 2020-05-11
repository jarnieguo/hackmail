/**
 * app.js
 *
 * This is the first file loaded. It sets up the Renderer,
 * Scene and Camera. It also starts the render loop and
 * handles window resizes.
 *
 */
import {
    WebGLRenderer,
    PerspectiveCamera,
    Vector3,
    Vector2,
    Raycaster,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Room } from 'scenes';


// Initialize core ThreeJS components
let scene = new Room();
const camera = new PerspectiveCamera();
const renderer = new WebGLRenderer({ antialias: true });

// Set up camera
camera.position.set(0, 3, 8);
camera.lookAt(new Vector3(0, 0, 0));

// Set up renderer, canvas, and minor CSS adjustments
renderer.setPixelRatio(window.devicePixelRatio);
const canvas = renderer.domElement;
canvas.style.display = 'block'; // Removes padding below canvas


// Set up controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enablePan = false;
controls.minDistance = 4;
controls.maxDistance = 16;
controls.update();

//  Set up raycaster
const raycaster = new Raycaster();
const mouse = new Vector2();
const onMouseMove = (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
};
window.addEventListener('mousemove', onMouseMove, false);

// Current: return true if laptop is clicked
const onClick = (event) => {
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children, true);
    //  Pass onClick to Room scene
    const res = scene.onClick(camera, intersects);
    if (res) {
        //  Tell App to toggle to 2D
        return true;
    }
    return false;
};
// window.addEventListener('click', onClick, false);

// //  Set up event handler for keys
// const onKeyDown = (event) => {
//     //  Let individual scenes handle keypresses
//     if (scene.onKeyDown === undefined) {
//         return;
//     }
//     const res = scene.onKeyDown(event);
// };
// window.addEventListener('keydown', onKeyDown, false);

// Render loop
const onAnimationFrameHandler = (timeStamp) => {
    controls.update();
    render();
    scene.update && scene.update(timeStamp);
};

const render = () => {
    renderer.render(scene, camera);
};

// Resize Handler
const windowResizeHandler = (innerWidth, innerHeight) => {
    renderer.setSize(innerWidth, innerHeight);
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
};

export {
    canvas,
    onClick,
    render,
    onAnimationFrameHandler,
    windowResizeHandler,
};

