

import {
    canvas as canvas3d,
    onClick as onClick3d,
    onAnimationFrameHandler as onAnimationFrameHandler3d,
    windowResizeHandler as resizeHandler3d,
} from 'app3d';

import {
    app as app2d,
    onAnimationFrameHandler as onAnimationFrameHandler2d
} from 'app2d';
const canvas2d = app2d.view;


// init
document.body.appendChild(canvas2d);



// Toggle between 2D and 3D mode
let in3d = true;
const toggleMode = () => {
    if (in3d) {
        document.body.replaceChild(canvas2d, canvas3d);
    }
    else {
        document.body.replaceChild(canvas3d, canvas2d);
    }
    in3d = !in3d;
};


const onClickHandler = (event) => {
    if (in3d) {
        if (onClick3d(event)) {
            toggleMode();
        }
    }
    else {
        // no onclick handler for 2d yet ???
    }
};
window.addEventListener('click', onClickHandler, false);


const onKeyDownHandler = (event) => {
    if (in3d) {
        // call 3d keydown handler
    }
    else {
        // call 2d keydown handler
        if (event.code === 'Escape') {
            toggleMode();
        }
    }
};
window.addEventListener('keydown', onKeyDownHandler, false);

// Render loop
const onAnimationFrameHandler = (timeStamp) => {
    if (in3d) {
        onAnimationFrameHandler3d(timeStamp);
    }
    else {
        // 2d currently has no animation frame handler
        onAnimationFrameHandler2d(timeStamp);
    }
    window.requestAnimationFrame(onAnimationFrameHandler);
};
window.requestAnimationFrame(onAnimationFrameHandler);

// Resize Handler
const windowResizeHandler = () => {
    const { innerHeight, innerWidth } = window;

    resizeHandler3d(innerWidth, innerHeight);
    // app2d.renderer.resize(innerWidth, innerHeight);
};
windowResizeHandler();
window.addEventListener('resize', windowResizeHandler, false);
