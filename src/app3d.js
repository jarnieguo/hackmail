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
let scene = new Room();
const camera = new PerspectiveCamera();
const renderer = new WebGLRenderer({ antialias: true });

//  Keep track of scenes
const scenes = [];
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
// document.body.appendChild(canvas);

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

//  Use raycaster
// to fix
// for now: return true if clicked on laptop
const onClick = (event) => {
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children, true);
    //  Let individual scenes handle click event for now
    if (scene.onClick !== undefined) {
        const res = scene.onClick(event, intersects);
        if (res !== undefined) {
            //  Scenes tell app to switch scenes by returning strings?
            return switchScene(res);
        }
    }
    return false;
};
// window.addEventListener('click', onClick, false);


//  Switch scene
const switchScene = (newScene) => {
    if (scene === scenes.room && newScene === 'desktop') {
    //     console.log('room to desktop');
    //     document.body.replaceChild(app.view, canvas);
    //     window.cancelAnimationFrame(aniFrame);
        return true;
        // need to fix this? onclick in room shouldnt trigger scene change
        // since we want scene interaction later?
    }
    // else if (newScene === 'room') {
    //     console.log('to room');
    //     document.body.replaceChild(canvas, app.view);
    //     window.requestAnimationFrame(onAnimationFrameHandler);
    // }
    // document.body.replaceChild(app.view, canvas);
    // scene = scenes[newScene];
    return false;
};

// //  Set up event handler for keys
// const onKeyDown = (event) => {
//     //  Let individual scenes handle keypresses
//     if (scene.onKeyDown === undefined) {
//         return;
//     }
//     const res = scene.onKeyDown(event);
//     if (res !== undefined) {
//         switchScene(res);
//     }
// };
// window.addEventListener('keydown', onKeyDown, false);

// Render loop
const onAnimationFrameHandler = (timeStamp) => {
    controls.update();
    renderer.render(scene, camera);
    scene.update && scene.update(timeStamp);
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
    onAnimationFrameHandler,
    windowResizeHandler,
};

