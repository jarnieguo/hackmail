import {
    canvas as canvas3d,
    onClick as onClick3d,
    onAnimationFrameHandler as onAnimationFrameHandler3d,
    windowResizeHandler as resizeHandler3d,
    render as render3d,
} from 'app3d';

import {
    app as app2d,
    wonAllGames as finished,
    onAnimationFrameHandler as onAnimationFrameHandler2d,
} from 'app2d';

import MUSIC from './426.mp3';

const canvas2d = app2d.view;

let inGame = false;
let in3d = true;

const audio = new Audio(MUSIC);

audio.addEventListener(
    'ended',
    function() {
        this.currentTime = 0;
        this.play();
    },
    false
);

// Toggle between 2D and 3D mode
const toggleMode = () => {
    if (!inGame) {
        return;
    }
    if (in3d) {
        $(canvas3d).replaceWith(canvas2d);
    } else {
        $(canvas2d).replaceWith(canvas3d);
    }
    in3d = !in3d;
};

const onClickHandler = (event) => {
    if (!inGame) {
        return;
    }
    if (in3d) {
        if (onClick3d(event)) {
            toggleMode();
        }
    } else {
        // no onclick handler for 2d yet ???
    }
};

const onKeyDownHandler = (event) => {
    if (!inGame) {
        return;
    }

    if (event.code === 'KeyP') {
        showDialog('#instructions');
        return;
    }

    if (in3d) {
        // call 3d keydown handler
    } else {
        // call 2d keydown handler
        if (event.code === 'Escape') {
            toggleMode();
        }
    }
};

// Render loop
const onAnimationFrameHandler = (timeStamp) => {
    if (inGame) {
        if (in3d) {
            if (finished()) {
                winGame();
            }
            onAnimationFrameHandler3d(timeStamp);
        } else {
            onAnimationFrameHandler2d(timeStamp);
        }
    }

    window.requestAnimationFrame(onAnimationFrameHandler);
};

// Resize Handler
const windowResizeHandler = () => {
    const { innerHeight, innerWidth } = window;

    resizeHandler3d(innerWidth, innerHeight);
    // app2d.renderer.resize(innerWidth, innerHeight);

    // Update 3d scene without changes so it's not stretched ugly
    if (!inGame && in3d) {
        render3d();
    }
};

/* -------------------------- */

// Initialize and display game
const initGame = () => {
    $('#game').append(canvas3d);
    $('#game').show();
    $('#game').css('margin', '0');
    $('#game').css('overflow', 'hidden');
    windowResizeHandler();
    window.addEventListener('resize', windowResizeHandler, false);
    window.requestAnimationFrame(onAnimationFrameHandler);

    $('#game').click(onClickHandler);
    $(window).on('keydown', onKeyDownHandler);
    audio.play();
};

const winGame = () => {
    showDialog('#win');
};

const showDialog = (dialogId) => {
    $(dialogId).show();
    inGame = false;
};

const resumeGame = (dialogId) => {
    $(dialogId).hide();
    inGame = true;
};

$('#start').mouseup(function() {
    initGame();
    $('#landing').hide();
    showDialog('#instructions');
});

$('#play').mouseup(function() {
    resumeGame('#instructions');
});
