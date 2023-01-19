import Consts from "../../consts.js";
import ChompAI from "./ChompAI.js";

const EMPTY = 0, FULL = 1, POISON = 2;

export default class Chomp {

    constructor(rows, cols, userFirst, aiDifficulty, ctx) {

        this.rows = rows;
        this.cols = cols;
        this.grid = [];
        this.playersTurn = userFirst;
        this.ai = new ChompAI(aiDifficulty, rows, cols);
        this.gameOver = false;
        this.currentTurn = 1;
        this.ctx = ctx;

        this.reset();

    }

    // reset the chomp board to initial state
    reset() {

        for (let i = 0; i < this.rows; i++) {
            this.grid[i] = [];
            for (let j = 0; j < this.cols; j++) {
                this.grid[i][j] = FULL;
            }
        }

        this.grid[0][0] = POISON;
        this.gameOver = false;
        this.currentTurn = 2;
        let who = this.playersTurn ? "Player" : "A.I.";
        document.getElementById("turnText").innerText = "Turn 1 - " + who + "'s turn";

    }

    // take a bite out of the board
    bite(row=null, col=null) {

        // if game already ended, return false and do nothing
        if(this.gameOver) { return false; }

        // if using default parameters, AI's turn
        if(row === null) {

            let pos = this.ai.findBestMove(this.grid);
            row = pos[0];
            col = pos[1];

        }

        // check for invalid selection
        if (row < 0 || row >= this.rows || col < 0 || col >= this.cols || this.grid[row][col] === EMPTY) {
            alert("Please select a valid move.");
            return false;
        } else {

            // TODO: implement flicker mechanic for cleaner experience
            for (let i = row; i < this.rows; i++) {
                for (let j = col; j < this.cols; j++) {
                    this.grid[i][j] = EMPTY;
                }
            }

            // declare winner when poison square is gone
            if(this.grid[0][0] === EMPTY) {
                this.declareWinner();
                return false;
            }

            let who = !this.playersTurn ? "Player" : "A.I.";
            this.currentTurn++;
            document.getElementById("turnText").innerText = "Turn " + (this.currentTurn >> 1) + " - " + who + "'s turn";

            // flip turn indicator
            this.playersTurn = !this.playersTurn;
            return true;

        }

    }

    // declare winner of the game
    declareWinner() {

        this.gameOver = true;

        if (!this.playersTurn) {
            document.getElementById("turnText").innerText = "Player wins!";
        } else {
            document.getElementById("turnText").innerText = "A.I. wins! Better luck next time!";
        }

    }

    // draw chomp board, highlighting tiles that would be removed by user's current selection
    draw(userR=Infinity, userC=Infinity) {

        // clear screen
        this.ctx.clearRect(0, 0, Consts.W, Consts.H);
        // set stroke style to black for border of tiles
        this.ctx.strokeStyle = "#000000";
        for(let i = 0; i < this.rows; i++) {
            for(let j = 0; j < this.cols; j++) {

                // set fill style differently based on whether the tile is empty or not
                if(this.grid[i][j] === EMPTY) { this.ctx.fillStyle = "#999999"; }
                else { this.ctx.fillStyle = "#74594f"; }

                // fill tile
                this.ctx.fillRect(j * Consts.SCALE, i * Consts.SCALE, Consts.SCALE, Consts.SCALE);
                // if tile is poison square, put yellow 'X' over it to indicate as such
                if(this.grid[i][j] === POISON) {

                    this.ctx.strokeStyle = "#f5e84f";
                    this.ctx.beginPath();
                    this.ctx.moveTo(j * Consts.SCALE, i * Consts.SCALE);
                    this.ctx.lineTo((j + 1) * Consts.SCALE, (i + 1) * Consts.SCALE);
                    this.ctx.stroke();
                    this.ctx.beginPath();
                    this.ctx.moveTo((j + 1) * Consts.SCALE, i * Consts.SCALE);
                    this.ctx.lineTo(j * Consts.SCALE, (i + 1) * Consts.SCALE);
                    this.ctx.stroke();
                    this.ctx.strokeStyle = "#000000";

                }

                // highlight any tiles that are still full that would be removed by user's current selection
                if(this.grid[i][j] !== EMPTY && i >= userR && j >= userC) {
                    this.ctx.fillStyle = "rgba(250,0,0,0.3)";
                    this.ctx.fillRect(j * Consts.SCALE, i * Consts.SCALE, Consts.SCALE, Consts.SCALE);
                }

                // border the tile with black
                this.ctx.strokeRect(j * Consts.SCALE, i * Consts.SCALE, Consts.SCALE, Consts.SCALE);

            }
        }

    }

}