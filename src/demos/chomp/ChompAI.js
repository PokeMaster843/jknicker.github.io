/*

Legend:
 X      poison
 O      full
 -      empty
 ?      unknown/irrelevant

Chomp win states:
**if faced with any of these states on your turn, there is no way to win against a perfect player**

Name: Right angle (0)
desc: exactly one row and column remaining; have equal number of full tiles (i.e. 1 in row --> 1 in col, 2 in row --> 2 in col, ...)
XO
O-

Name: Z (0)
desc: exactly two rows/columns remaining; each has the same number of full tiles left, but due to poison square, lengths staggered by 1
XOO
OO-

Name: W (0)
desc: right angle state, but there is an extra full tile on either the row or column, and there is still a full tile diagonal to the poison square
XOOO
OO--
O---

Name: Gun (1)
desc: no regular extension yet, so no description necessary
XOOO
OO--
OO--

Name: Big Gun (1)
desc: no regular extension yet, so no description necessary
XOOOOO
OO----
OO----
OO----

Name: 212 (1)
desc: no regular extension yet, so no description necessary
XOOOO
OOO--
OO---

Name: 222 (1)
desc: no regular extension yet, so no description necessary
XOOOOO
OOOO--
OO----

Name: 313 (1)
desc: no regular extension yet, so no description necessary
XOOOOOO
OOOO---
OOO----

Name: 33 (1)
desc: no regular extension yet, so no description necessary
XOOOOO
OOO---
OOO---

Name: 2122
desc: no regular extension yet, so no description necessary
XOOOOOO
OOOOO--
OOO----
OO-----

 */

const EMPTY = 0, FULL = 1, POISON = 2;

export default class ChompAI {

    constructor(difficulty, rows, cols) {

        this.difficulty = difficulty;
        this.rows = rows;
        this.cols = cols;
        this.attempted = [];
        for(let i = 0; i < rows; i++) {
            this.attempted[i] = [];
        }

    }

    findBestMove(grid) {

        let sumRows = [];
        let sumCols = [];
        for (let i = 0; i < this.rows; i++) {
            sumRows[i] = 0;
            for (let j = 0; j < this.cols; j++) {

                if (i === 0) {
                    sumCols[j] = 0;
                }

                if (grid[i][j] !== EMPTY) {

                    sumRows[i]++;
                    sumCols[j]++;

                }

            }
        }

        if (sumRows[0] === 1 && sumCols[0] === 1) {
            // game is lost
            return [0, 0];
        }

        let strat = this.findStrategy(sumRows, sumCols);
        if(strat[0] === 0 && strat[1] === 0) {
            
            /*let squaresLeft = 0;
            for(let k = 0; k < this.rows; k++) {
                squaresLeft += sumRows[k];
            }
            return this.avoidBadMove(sumRows, sumCols, squaresLeft);*/
            let r = Math.floor(Math.random() * sumCols[0]);
            let c = Math.floor(Math.random() * sumRows[r]);
            return [r, c];

        }

        return strat;

    }

    findStrategy(sumRows, sumCols) {

        // use right angle, Z, and W win states
        if (this.difficulty >= 0) {

            /////////
            // win //
            /////////

            /*
            XOOO..
            ----
             */
            if (sumRows[0] > 1 && sumRows[1] === 0) {
                // remove all remaining full blocks
                return [0, 1];
            }
            if (sumCols[0] > 1 && sumCols[1] === 0) {
                // remove all remaining full blocks
                return [1, 0];
            }

            /////////////////
            // right angle //
            /////////////////

            /*
            XOOO?..
            O----
            O----
            :
             */
            if (sumRows[0] !== sumCols[0] && sumRows[1] === 1) {
                // make row and col length equal
                if (sumRows[0] > sumCols[0]) {
                    return [0, sumCols[0]];
                } else {
                    return [sumRows[0], 0];
                }
            }

            /*
            XOO..
            OO?
            O??
            :
             */
            if (sumRows[0] === sumCols[0] && sumRows[1] > 1) {
                // reduce to one row and col
                return [1, 1];
            }

            ///////
            // Z //
            ///////

            /*
            XOOO..
            OOO..
            O??
             */
            if (sumRows[0] === sumRows[1] + 1 && sumRows[2] !== 0) {
                // reduce to top two rows
                return [2, 0];
            }
            if (sumCols[0] === sumCols[1] + 1 && sumCols[2] !== 0) {
                // reduce to left two cols
                return [0, 2];
            }

            /*
            XOO..
            OOO..
            or
            XOOO?..
            OO..
             */
            if (sumRows[2] === 0 && (sumRows[0] - sumRows[1]) !== 1) {
                // stagger rows
                if (sumRows[0] > sumRows[1]) {
                    return [0, sumRows[1] + 1];
                } else {
                    return [1, sumRows[1] - 1];
                }
            }
            if (sumCols[2] === 0 && (sumCols[0] - sumCols[1]) !== 1) {
                // stagger cols
                if (sumCols[0] > sumCols[1]) {
                    return [sumCols[1] + 1, 0];
                } else {
                    return [sumCols[1] - 1, 1];
                }
            }

            ///////
            // W //
            ///////

            /*
            XOOO?..
            OO-
            O--
            :
             */
            if ((sumRows[0] - sumCols[0]) > 1 && sumRows[1] === 2 && sumCols[1] === 2) {
                // make row and col differ by 1 in length
                return [0, sumCols[0] + 1];
            }
            if ((sumCols[0] - sumRows[0]) > 1 && sumRows[1] === 2 && sumCols[1] === 2) {
                // make row and col differ by 1 in length
                return [sumRows[0] + 1, 0];
            }

            /*
            XOOO..
            OO--
            OO--
            ::
            or
            XOOO..
            OOOO..
            O---
            :
             */
            if (Math.abs(sumRows[0] - sumCols[0]) === 1 && sumRows[1] === 2 && sumRows[2] === 2) {
                // make into W shape
                return [2, 1];
            }
            if (Math.abs(sumRows[0] - sumCols[0]) === 1 && sumCols[1] === 2 && sumCols[2] === 2) {
                // make into W shape
                return [1, 2];
            }

        }

        // use gun, big gun, 212, 222, 313, 33
        if (this.difficulty >= 1) {

            /////////
            // gun //
            /////////

            /*
            XOOO
            OOO?
            OO??
             */
            if (sumRows[0] === 4 && sumCols[0] === 3 && sumCols[1] === 3 && sumRows[1] > 2) {
                // make into gun
                return [1, 2];
            }
            if (sumCols[0] === 4 && sumRows[1] === 3 && sumRows[0] === 3 && sumCols[1] > 2) {
                // make into gun
                return [2, 1];
            }

            /*
            XOOOO?..
            OO----
            OO----
             */
            if (sumRows[0] > 4 && sumCols[0] === 3 && sumCols[1] === 3 && sumRows[1] === 2) {
                // make into gun
                return [0, 4];
            }
            if (sumCols[0] > 4 && sumRows[0] === 3 && sumRows[1] === 3 && sumCols[1] === 2) {
                // make into gun
                return [4, 0];
            }

            /*
            XOOO
            OO--
            OO--
            OO--
            ??
            ::
             */
            if (sumRows[0] === 4 && sumCols[1] > 3 && sumRows[1] === 2) {
                // make into gun
                return [3, 0];
            }
            if (sumCols[0] === 4 && sumRows[1] > 3 && sumCols[1] === 2) {
                // make into gun
                return [0, 3];
            }

            /////////////
            // big gun //
            /////////////

            /*
            XOOOOOO?..
            OO------
            OO------
            OO------
             */
            if (sumRows[0] > 6 && sumCols[0] === 4 && sumCols[1] === 4 && sumRows[1] === 2) {
                // make into big gun
                return [0, 6];
            }
            if (sumCols[0] > 6 && sumRows[0] === 4 && sumRows[1] === 4 && sumCols[1] === 2) {
                // make into big gun
                return [6, 0];
            }

            /*
            XOOOOO
            OOO???
            OO????
            OO????
             */
            if (sumRows[0] === 6 && sumCols[0] === 4 && sumCols[1] === 4 && sumRows[1] > 2) {
                // make into big gun
                return [1, 2];
            }
            if (sumCols[0] === 6 && sumRows[0] === 4 && sumRows[1] === 4 && sumCols[1] > 2) {
                // make into big gun
                return [2, 1];
            }

            /*
            XOOOOO
            OO----
            OO----
            OO----
            OO----
            ??----
            ::
             */
            if (sumRows[0] === 6 && sumCols[1] > 4 && sumRows[1] === 2) {
                // make into big gun
                return [4, 0];
            }
            if (sumCols[0] === 6 && sumRows[1] > 4 && sumCols[1] === 2) {
                // make into big gun
                return [0, 4];
            }

            /////////
            // 212 //
            /////////

            /*
            XOOOOO?..
            OOO----
            OO-----
             */
            if (sumRows[0] > 5 && sumRows[1] === 3 && sumRows[2] === 2 && sumCols[0] === 3) {
                // make 212
                return [0, 5];
            }
            if (sumCols[0] > 5 && sumCols[1] === 3 && sumCols[2] === 2 && sumRows[0] === 3) {
                // make 212
                return [5, 0];
            }

            /*
            XOOOO
            OOOOO
            OO---
             */
            if (sumRows[0] === 5 && sumRows[1] === 5 && sumRows[2] === 2 && sumCols[0] === 3) {
                // make 212
                return [1, 3];
            }
            if (sumCols[0] === 5 && sumCols[1] === 5 && sumCols[2] === 2 && sumRows[0] === 3) {
                // make 212
                return [3, 1];
            }

            /*
            XOOOO
            OOO--
            OOO--
             */
            if (sumRows[0] === 5 && sumRows[1] === 3 && sumRows[2] === 3 && sumCols[0] === 3) {
                // make 212
                return [2, 2];
            }
            if (sumCols[0] === 5 && sumCols[1] === 3 && sumCols[2] === 3 && sumRows[0] === 3) {
                // make 212
                return [2, 2];
            }

            /*
            XOOOO
            OOO--
            OO---
            OO---
            ??---
            ::
             */
            if (sumRows[0] === 5 && sumRows[1] === 3 && sumRows[2] === 2 && sumCols[1] > 3) {
                // make 212
                return [3, 0];
            }
            if (sumCols[0] === 5 && sumCols[1] === 3 && sumCols[2] === 2 && sumRows[1] > 3) {
                // make 212
                return [0, 3];
            }

            /////////
            // 222 //
            /////////

            /*
            XOOOOOO?..
            OOOO----
            OO------
             */
            if (sumRows[0] > 6 && sumRows[1] === 4 && sumRows[2] === 2 && sumCols[0] === 3) {
                // make 222
                return [0, 6];
            }
            if (sumCols[0] > 6 && sumCols[1] === 4 && sumCols[2] === 2 && sumRows[0] === 3) {
                // make 222
                return [6, 0];
            }

            /*
            XOOOOO
            OOOOOO
            OO----
             */
            if (sumRows[0] === 6 && sumRows[1] === 6 && sumRows[2] === 2 && sumCols[0] === 3) {
                // make 222
                return [1, 4];
            }
            if (sumCols[0] === 6 && sumCols[1] === 6 && sumCols[2] === 2 && sumRows[0] === 3) {
                // make 222
                return [4, 1];
            }

            /*
            XOOOOO
            OOOO--
            OOOO--
             */
            if (sumRows[0] === 6 && sumRows[1] === 4 && sumRows[2] === 4 && sumCols[0] === 3) {
                // make 222
                return [2, 2];
            }
            if (sumCols[0] === 6 && sumCols[1] === 4 && sumCols[2] === 4 && sumRows[0] === 3) {
                // make 222
                return [2, 2];
            }

            /*
            XOOOOO
            OOOO--
            OO----
            OO----
            ??----
            ::
             */
            if (sumRows[0] === 6 && sumRows[1] === 4 && sumRows[2] === 2 && sumCols[1] > 3) {
                // make 222
                return [3, 0];
            }
            if (sumCols[0] === 6 && sumCols[1] === 4 && sumCols[2] === 2 && sumRows[1] > 3) {
                // make 222
                return [0, 3];
            }

            /////////
            // 313 //
            /////////

            /*
            XOOOOOOO?..
            OOOO-----
            OOO------
             */
            if (sumRows[0] > 7 && sumRows[1] === 4 && sumRows[2] === 3 && sumCols[0] === 3) {
                // make 313
                return [0, 7];
            }
            if (sumCols[0] > 7 && sumCols[1] === 4 && sumCols[2] === 3 && sumRows[0] === 3) {
                // make 313
                return [7, 0];
            }

            /*
            XOOOOOO
            OOOOO??
            OOO----
             */
            if (sumRows[0] === 7 && sumRows[1] > 4 && sumRows[2] === 3 && sumCols[0] === 3) {
                // make 313
                return [1, 4];
            }
            if (sumCols[0] === 7 && sumCols[1] > 4 && sumCols[2] === 3 && sumRows[0] === 3) {
                // make 313
                return [4, 1];
            }

            /*
            XOOOOOO
            OOOO---
            OOOO---
             */
            if (sumRows[0] === 7 && sumRows[1] === 4 && sumRows[2] === 4 && sumCols[0] === 3) {
                // make 313
                return [2, 3];
            }
            if (sumCols[0] === 7 && sumCols[1] === 4 && sumCols[2] === 4 && sumRows[0] === 3) {
                // make 313
                return [3, 2];
            }

            /*
            XOOOOOO
            OOOO---
            OOO----
            OO?----
            ???----
            :::
             */
            if (sumRows[0] === 7 && sumRows[1] === 4 && sumRows[2] === 3 && sumCols[0] > 3) {
                // make 313
                return [3, 0];
            }
            if (sumCols[0] === 7 && sumCols[1] === 4 && sumCols[2] === 3 && sumRows[0] > 3) {
                // make 313
                return [0, 3];
            }

            ////////
            // 33 //
            ////////

            /*
            XOOOOOO?..
            OOO-----
            OOO-----
             */
            if (sumRows[0] > 6 && sumRows[1] === 3 && sumRows[2] === 3 && sumCols[0] === 3) {
                // make 33
                return [0, 6];
            }
            if (sumCols[0] > 6 && sumCols[1] === 3 && sumCols[2] === 3 && sumRows[0] === 3) {
                // make 33
                return [6, 0];
            }

            /*
            XOOOOO
            OOOO??
            OOO???
             */
            if (sumRows[0] === 6 && sumRows[1] > 3 && sumRows[3] >= 3 && sumCols[0] === 3) {
                // make 33
                return [1, 3];
            }
            if (sumCols[0] === 6 && sumCols[1] > 3 && sumCols[3] >= 3 && sumRows[0] === 3) {
                // make 33
                return [3, 1];
            }

            /*
            XOOOOO
            OOO---
            OOO---
            OO?---
            ???---
            :::
             */
            if (sumRows[0] === 6 && sumRows[1] === 3 && sumRows[2] === 3 && sumCols[0] > 3) {
                // make 33
                return [3, 0];
            }
            if (sumCols[0] === 6 && sumCols[1] === 3 && sumCols[2] === 3 && sumRows[0] > 3) {
                // make 33
                return [0, 3];
            }

        }

        if(this.difficulty >= 2) {
            // more advanced strategy goes here
        }

        if(this.difficulty >= 3) {
            // most advanced strategy goes here
        }

        // if no strategy is found, return poison square
        return [0,0];

    }

    /*testRand: function(sumRows, sumCols) {

        let tmpGrid = [];
        for(let i = 0; i < this.rows; i++) {
            tmpGrid[i] = [];
            for(let j = 0; j < this.cols; j++) {
                tmpGrid[i][j] = 0;
            }
        }

        let r, c;
        for(let k = 0; k < 10000; k++) {

            if (Math.random() < 0.5) {
                r = Math.floor(Math.random() * sumCols[0]) + Math.floor(Math.random() * sumCols[0] / 2);
                r = r >= sumCols[0] ? sumCols[0] - 1 : r;
                c = Math.floor(Math.random() * sumRows[r]) + Math.floor(Math.random() * sumRows[r] / 2);
                c = c >= sumRows[r] ? sumRows[r] - 1 : c;
            } else {
                c = Math.floor(Math.random() * sumRows[0]) + Math.floor(Math.random() * sumRows[0] / 2);
                c = c >= sumRows[r] ? sumRows[0] - 1 : c;
                r = Math.floor(Math.random() * sumCols[c]) + Math.floor(Math.random() * sumCols[c] / 2);
                r = r >= sumCols[0] ? sumCols[c] - 1 : r;
            }

            tmpGrid[r][c]++;

        }

        for(let l = 0; l < this.rows; l++) {
            console.log(tmpGrid[l]);
        }

    },*/

    // TODO: improve runtime
    // used when no winning strategy is found; avoids selecting losing moves
    avoidBadMove(sumRows, sumCols, squaresLeft) {

        // make random selection, then check for problems
        let r, c;
        do {

            if(Math.random() < 0.5) {
                r = Math.floor(Math.random() * sumCols[0]);
                c = Math.floor(Math.random() * sumRows[r]);
            }

            else {
                c = Math.floor(Math.random() * sumRows[0]);
                r = Math.floor(Math.random() * sumCols[c]);
            }

        } while(this.attempted[r][c] === true && squaresLeft > 0);

        if(squaresLeft === 0) { return [r, c]; }

        // make temp sumRows and sumCols to simulate A.I.'s random selection
        let newSumRows = [];
        let newSumCols = [];
        for(let i = 0; i < this.rows; i++) {
            if(i < r) { newSumRows[i] = sumRows[i]; }
            else { newSumRows[i] = c < sumRows[i] ? c : sumRows[i]; }
        }
        for(let j = 0; j < this.cols; j++) {
            if(j < c) { newSumCols[j] = sumCols[j]; }
            else { newSumCols[j] = r < sumCols[j] ? r : sumCols[j]; }
        }

        // check if A.I. has a strategy to play against new board state
        let move = this.findStrategy(newSumRows, newSumCols);
        // if strategy found, then selecting the move above is a bad choice
        if(move[0] !== 0 || move[1] !== 0) {
            this.attempted[r][c] = true;
            return this.avoidBadMove(sumRows, sumCols, squaresLeft - 1);
        }

        for(let k = 0; k < this.rows; k++) {
            this.attempted[k] = [];
        }

        // if no strategy found, we can assume the move is reasonable
        return [r, c];

    }

}