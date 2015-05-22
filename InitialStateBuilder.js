/*
 *
 * Function that will return a random initial state to build the Quincunx.
 *
 */
function initialStateBuilder(game) {
	var initialState = new Array();
	initialState = initialStateBuildOpening(initialState, game);
	initialState = initialStateBuildObstacles(initialState, game);
	initialState = initialStateBuildContainers(initialState, game);
	initialState = initialStateAddBeans(initialState, game);

	return initialState;
}


function initialStateBuildOpening(initialState, game) {
	initialState.push(
		{
			id:initialState.length,
			x:4.2,
			y:3.4,
			angle: 0.6,
			halfWidth:6.0,
			halfHeight:0.1,
			dynamic: false,
			type: "rectangle",
			color: "#e6e3c6"
		}
	);
	initialState.push(
		{
			id:initialState.length,
			x:16.2,
			y:3.4,
			angle: -0.6,
			halfWidth:6,
			halfHeight:0.1,
			dynamic: false,
			type: "rectangle",
			color: "#e6e3c6"
		}
	);
	return initialState;
}


function initialStateAddBeans(initialState, game) {
	for (var i=0; i<100; i++) {
		initialState.push(
			{ //that's how to declare a circle
				id:initialState.length,
				x: (Math.random()*game.canvasWidth)/SCALE,
				y: (Math.random()*(game.canvasHeight-630))/SCALE,
				radius: 0.3,
				dynamic: true,
				type: "circle",
				color: "#ff6c6c"
			}
		);
	}
	return initialState;
}


function initialStateBuildObstacles(initialState, game) {
	var mod = 0;
	for (var j=8; j<(game.canvasHeight-130)/SCALE; j+=(0.35*4)){
		for (var i=0; i<(game.canvasWidth/SCALE); i+=(0.32*4)) {
			var x = i;
			if (mod%2==0) {
				x += (0.32/2)*4;
			}
			initialState.push(
				{ //that's how to declare a circle
					id:initialState.length,
					x: x,
					y: j,
					radius: 0.3,
					dynamic: false,
					type: "circle",
					color: "#e6e3c6"
				}
			);
		}
		mod++;
	}
	return initialState;
}


function initialStateBuildContainers(initialState, game) {
	for (var i=0.54; i<(game.canvasWidth/SCALE); i+=(0.32*4)) {
		initialState.push(
			{
				id:initialState.length,
				x:i,
				y:20.5,
				angle: 0.0,
				halfWidth:0.1,
				halfHeight:3.5,
				dynamic: false,
				type: "rectangle",
				color: "#e6e3c6"
			}
		);
	}
	return initialState;
}
