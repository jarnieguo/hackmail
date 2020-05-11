

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


// Resize Handler
const windowResizeHandler = () => {
    const { innerHeight, innerWidth } = window;

    resizeHandler3d(innerWidth, innerHeight);
    // app2d.renderer.resize(innerWidth, innerHeight);
};




const startGame = () => {

    document.body.removeChild(document.getElementById("landing"));

    document.body.appendChild(canvas3d);
    document.body.style.margin = 0;
    document.body.style.overflow = 'hidden';

    window.requestAnimationFrame(onAnimationFrameHandler);

    windowResizeHandler();
    window.addEventListener('resize', windowResizeHandler, false);

    window.addEventListener('click', onClickHandler, false);
    window.addEventListener('keydown', onKeyDownHandler, false);
};

document.getElementById("start").onmouseup = startGame;

