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
import { Room, Desktop, Game } from 'scenes';

// Initialize core ThreeJS components
var scene = new Room();
const camera = new PerspectiveCamera();
const renderer = new WebGLRenderer({ antialias: true });

//  Keep track of scenes
var scenes = [];
scenes['room'] = scene;
scenes['desktop'] = new Desktop();
scenes['game'] = new Game();

// Set up camera
camera.position.set(0, 3, 8);
camera.lookAt(new Vector3(0, 0, 0));

// Set up renderer, canvas, and minor CSS adjustments
renderer.setPixelRatio(window.devicePixelRatio);
const canvas = renderer.domElement;
canvas.style.display = 'block'; // Removes padding below canvas
document.body.style.margin = 0; // Removes margin around page
document.body.style.overflow = 'hidden'; // Fix scrolling
document.body.appendChild(canvas);

// Set up controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enablePan = false;
controls.minDistance = 4;
controls.maxDistance = 16;
controls.update();

//  Set up raycaster
const raycaster = new Raycaster();
var mouse = new Vector2();
const onMouseMove = (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
};
window.addEventListener('mousemove', onMouseMove, false);

//  Use raycaster
const onClick = (event) => {
    raycaster.setFromCamera(mouse, camera);
    var intersects = raycaster.intersectObjects(scene.children, true);
    //  Let individual scenes handle click event for now
    if (scene.onClick != undefined) {
        const res = scene.onClick(event, intersects);
        if (res != undefined) {
            //  Scenes tell app to switch scenes by returning strings?
            switchScene(res);
        }
    }
};
window.addEventListener('click', onClick, false);

//  Switch scene
const switchScene = (newScene) => {
    scene = scenes[newScene];
};

//  Set up event handler for keys
const onKeyDown = (event) => {
    //  Let individual scenes handle keypresses
    if (scene.onKeyDown == undefined) {
        return;
    }
    const res = scene.onKeyDown(event);
    if (res != undefined) {
        switchScene(res);
    }
};
window.addEventListener('keydown', onKeyDown, false);

// Render loop
const onAnimationFrameHandler = (timeStamp) => {
    controls.update();
    renderer.render(scene, camera);
    scene.update && scene.update(timeStamp);
    window.requestAnimationFrame(onAnimationFrameHandler);
};
window.requestAnimationFrame(onAnimationFrameHandler);

// Resize Handler
const windowResizeHandler = () => {
    const { innerHeight, innerWidth } = window;
    renderer.setSize(innerWidth, innerHeight);
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
};
windowResizeHandler();
window.addEventListener('resize', windowResizeHandler, false);
