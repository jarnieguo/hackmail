import * as PIXI from 'pixi.js';
import { Game } from '../Game';

import ICON from './icon.png';
import PIECE1 from './1.jpg';
import PIECE2 from './2.jpg';
import PIECE3 from './3.jpg';
import PIECE4 from './4.jpg';
import PIECE5 from './5.jpg';
import PIECE6 from './6.jpg';
import PIECE7 from './7.jpg';
import PIECE8 from './8.jpg';
import PIECE9 from './9.jpg';

class Piece {
    constructor(parent, img, num, s) {
        this.parent = parent;
        this.num = num;

        const texture = new PIXI.Texture.from(img);
        let sprite = new PIXI.Sprite(texture);
        sprite.width = sprite.height = s;

        sprite.interactive = true;
        sprite.on('pointerdown', (event) => this.onClick(this));

        this.sprite = sprite;

        this.location = {i: null, j: null};
        this.fadeIn = false;
    }

    onClick(object) {
        this.parent.checkPiece(object);
    }

    startFadeIn() {
        this.sprite.alpha = 0;
        this.fadeIn = true;
    }

    update() {
        if (this.fadeIn) {
            this.sprite.alpha += .025;
            if (this.sprite.alpha >= 1) {
                this.fadeIn = false;
            }
        }
    }
}

class Slider extends Game {
    constructor(parent, desktop) {
        super(parent, desktop);

        this.setBgColor(0xFFFFFF);
        this.setIcon(PIXI.Texture.from(ICON));
        this.setLabel("Slider");

        this.s = 100;
        this.border = 2;
        this.x0 = 100;
        this.y0 = 100;

        this.gameWon = false;

        this.initObjects();
    }

    initObjects() {
        super.initObjects();
        this.initPuzzle();
    }

    initPuzzle() {
        this.puzzleContainer = new PIXI.Container();

        let pieces = [];
        const s = this.s;
        pieces.push(new Piece(this, PIECE1, 1, s));
        pieces.push(new Piece(this, PIECE2, 2, s));
        pieces.push(new Piece(this, PIECE3, 3, s));
        pieces.push(new Piece(this, PIECE4, 4, s));
        pieces.push(new Piece(this, PIECE5, 5, s));
        pieces.push(new Piece(this, PIECE6, 6, s));
        pieces.push(new Piece(this, PIECE7, 7, s));
        pieces.push(new Piece(this, PIECE8, 8, s));
        pieces.push(new Piece(this, PIECE9, 9, s));

        //  TODO? randomize
        // const positions = [
        //     [8, 4, 2],
        //     [1, null, 3],
        //     [7, 6, 5],
        // ];
        const positions = [
            [1, 2, 3],
            [4, 5, 6],
            [7, null, 8],
        ];

        //  Position the pieces
        let puzzle = [
            [],
            [],
            [],
        ];
        const x0 = this.x0;
        const y0 = this.y0;
        const border = this.border;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                let k = positions[i][j];
                if (k == null) {
                    puzzle[i][j] = null;
                    continue;
                }
                let piece = pieces[k - 1];
                piece.sprite.position.x = x0 + (s + border) * j;
                piece.sprite.position.y = y0 + (s + border) * i;
                piece.location.j = j;
                piece.location.i = i;
                puzzle[i][j] = piece;
                this.puzzleContainer.addChild(piece.sprite);
            }
        }
        this.puzzle = puzzle;
        this.finalPiece = pieces[8];

        this.objects.push(this.puzzleContainer);
    }
    
    //  Check a puzzle piece and slide if applicable
    checkPiece(piece) {
        if (this.gameWon) {
            return;
        }

        //  Check for empty piece
        const i = piece.location.i;
        const j = piece.location.j

        if (this.isEmptyPiece(i - 1, j)) {
            //  Above
            this.movePiece(piece, i, j, i - 1, j);
        } else if (this.isEmptyPiece(i + 1, j)) {
            //  Below
            this.movePiece(piece, i, j, i + 1, j);
        } else if (this.isEmptyPiece(i, j - 1)) {
            // Left
            this.movePiece(piece, i, j, i, j - 1);
        } else if (this.isEmptyPiece(i, j + 1)) {
            // Right
            this.movePiece(piece, i, j, i, j + 1);
        }

        //  Check for win
        this.checkWin();
    }

    //  Move a piece
    movePiece(piece, i, j, iNew, jNew) {
        this.puzzle[i][j] = null;
        this.puzzle[iNew][jNew] = piece;
        piece.location.i = iNew;
        piece.location.j = jNew;

        piece.sprite.position.x += (jNew - j) * (this.s + this.border);
        piece.sprite.position.y += (iNew - i) * (this.s + this.border);
    }

    //  Is the location the empty piece?
    isEmptyPiece(i, j) {
        if (i < 0 || i >= 3) {
            return false; 
        }
        if (j < 0 || j >= 3) {
            return false;
        }
        return this.puzzle[i][j] == null;
    }

    //  Is the puzzle in its right place?
    checkWin() {
        let count = 1;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                const piece = this.puzzle[i][j];
                if (piece == null) {
                    //  Null piece should be at end
                    if (j != 2 || i != 2) {
                        return;
                    }
                } else if (count != piece.num) {
                    return;
                }
                count++;
            }
        }

        //  Game is won
        this.gameWon = true;

        //  Add final piece
        const x0 = this.x0;
        const y0 = this.y0;
        this.finalPiece.sprite.position.x = x0 + 2 * (this.s + this.border);
        this.finalPiece.sprite.position.y = y0 + 2 * (this.s + this.border);
        this.finalPiece.startFadeIn();
        this.puzzle[2][2] = this.finalPiece;
        this.puzzleContainer.addChild(this.finalPiece.sprite);
    }

    update(timestamp) {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                const piece = this.puzzle[i][j];
                if (piece == null) {
                    continue;
                } else {
                    piece.update();
                }
            }
        }
    }
}

export { Slider };