const Consts = {
	// scales for demos
	TIME: 1 / 60,
	SCALE: 100,

	// canvas dimensions
	W: 500,
	H: 500,

	// origin x and y
	get ORIGIN_X() { return this.W / 2; },
	get ORIGIN_Y() { return this.H / 2; },

	// mathematical constants
	g: 9.807,
};

// export object so it can be imported when needed
export default Consts;