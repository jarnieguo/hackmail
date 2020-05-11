

import {
    canvas as canvas3d,
    onClick as onClick3d,
    onAnimationFrameHandler as onAnimationFrameHandler3d,
    windowResizeHandler as resizeHandler3d,
    render as render3d
} from 'app3d';

import {
    app as app2d,
    onAnimationFrameHandler as onAnimationFrameHandler2d
} from 'app2d';
const canvas2d = app2d.view;

let inGame = false;
let in3d = true;

// Toggle between 2D and 3D mode
const toggleMode = () => {
    if (!inGame) { return; }
    if (in3d) {
        $(canvas3d).replaceWith(canvas2d);
    }
    else {
        $(canvas2d).replaceWith(canvas3d);
    }
    in3d = !in3d;
};


const onClickHandler = (event) => {
    if (!inGame) { return; }
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
    if (!inGame) { return; }

    if (event.code === 'KeyP') {
        showInstructions();
        return;
    }

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
    if (in3d && inGame) {
        onAnimationFrameHandler3d(timeStamp);
    }
    else if (inGame) {
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

    // Update 3d scene without changes so it's not stretched ugly
    if (!inGame && in3d) { render3d(); }
};

/* -------------------------- */

// Initialize and display game
 const initGame = () => {

    $("#game").append(canvas3d);
    $("#game").show();
    $("#game").css("margin", "0");
    $("#game").css("overflow", "hidden");
    windowResizeHandler();
    window.addEventListener('resize', windowResizeHandler, false);
    window.requestAnimationFrame(onAnimationFrameHandler);

    $("#game").click(onClickHandler);
    $(window).on('keydown', onKeyDownHandler);
 };


const showInstructions = () => {
    $("#landing").hide();
    $("#instructions").show();
    inGame = false;
};

const startGame = () => {
    $("#instructions").hide();

    inGame = true;
};


$("#play").mouseup(function() {
    initGame();
    showInstructions();
});
$("#start").mouseup(startGame);

