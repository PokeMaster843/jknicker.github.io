export default class Tracker {

    // maximum points kept for drawing the trail
    MAX_POINTS = 60;

    // constructor: accepts parameter for r, g, b aspects of color. Values range from 0 to 255
    constructor(r, g, b, ctx) {

        // point array
        this.points = [];
        // index of oldest point
        this.startIndex = 0;
        // element count
        this.elements = 0;

        this.r = r;
        this.g = g;
        this.b = b;
        this.ctx = ctx;

        // common part of color string; alpha may change depending on drawing function used
        this.rgb = "rgba(" + r + "," + g + "," + b + ",";

    }

    // add new point to trail, overwriting oldest point in list if at capacity
    add(e) {

        // if not over max points yet, simply add point to array
        if (this.elements < this.MAX_POINTS) {
            this.points[this.elements] = e;
            this.elements++;
        }

        // otherwise, overwrite oldest point and update new oldest point
        else {

            this.points[this.startIndex] = e;
            this.startIndex = (this.startIndex + 1) % this.MAX_POINTS;

        }

    }

    // draw trail with a solid color
    draw() {

        // only draw if you can make at least one line
        if (this.elements >= 2) {

            // since the whole trail is solid, we only need to set the strokeStyle once
            this.ctx.strokeStyle = this.rgb + "1)";
            this.ctx.beginPath();
            // start by moving to location of oldest point
            this.ctx.moveTo(this.points[this.startIndex][0], this.points[this.startIndex][1]);
            for (let i = 1; i < this.elements; i++) {

                // define next point, and make a line to it
                let p = this.points[(this.startIndex + i) % this.MAX_POINTS];
                this.ctx.lineTo(p[0], p[1]);

            }

            this.ctx.stroke();

        }

    }

    // draw trail with a fade, where the older the path the more faded its color
    drawFaded() {

        // only draw if you can make at least one line
        if (this.elements >= 2) {

            // define variables p1 and p2, and initialize p1 with the oldest point
            let p1 = this.points[(this.startIndex) % this.MAX_POINTS], p2;
            for (let i = 1; i < this.elements; i++) {

                // set strokeStyle based on how old the point is; older points have smaller i, so smaller alpha
                this.ctx.strokeStyle = this.rgb + (i / this.elements) + ")";
                this.ctx.beginPath();
                // move to p1
                this.ctx.moveTo(p1[0], p1[1]);
                // define p2, and draw line to it
                p2 = this.points[(this.startIndex + i) % this.MAX_POINTS];
                this.ctx.lineTo(p2[0], p2[1]);
                this.ctx.stroke();

                // p2 is p1 for the next iteration of the loop
                p1 = p2;

            }

        }

    }

}