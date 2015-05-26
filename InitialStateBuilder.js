/*
 *
 * Function that will return a random initial state to build the Quincunx.
 *
 */
var SCALE = 10;
var MIN_Y = 0;
var MAX_Y = 0;
var ENTRY_POINT = 0;
var CONTAINER_SIZE = 9;
var NUMBER_OF_BEANS = 300;

function initialStateBuilder(game) {
	var initialState = new Array();
	initialState = initialStateBuildOpening(initialState, game);
	initialState = initialStateBuildObstacles(initialState, game);
	initialState = initialStateAddBeans(initialState, game);

	return initialState;
}


function initialStateBuildOpening(initialState, game) {
	var middleSpace = 0.55;
	var angle = 0.45;
	var maxY = (6*SCALE)/30;
	var centerOfScreen = (game.canvasWidth/SCALE)/2;
	var closeToMiddlePointFirst = centerOfScreen - middleSpace;
	var lengthHypothenuse = closeToMiddlePointFirst/Math.cos(angle);
	var heightOfSide = Math.tan(angle)*closeToMiddlePointFirst;
	MAX_Y = maxY - heightOfSide;
	MIN_Y = MAX_Y - 3;
	ENTRY_POINT = maxY;
	var closeToMiddlePointFirstY = maxY-heightOfSide/2;

	initialState.push(
		{
			id:initialState.length,
			x: closeToMiddlePointFirst/2,
			y: closeToMiddlePointFirstY,
			angle: angle,
			halfWidth: lengthHypothenuse/2,
			halfHeight:0.1,
			dynamic: false,
			type: "rectangle",
			color: "#e6e3c6"
		}
	);

	initialState.push(
		{
			id:initialState.length,
			x: centerOfScreen*1.5+middleSpace*2,
			y: closeToMiddlePointFirstY,
			angle: -angle,
			halfWidth: lengthHypothenuse/2,
			halfHeight:0.1,
			dynamic: false,
			type: "rectangle",
			color: "#e6e3c6"
		}
	);
	return initialState;
}


function initialStateAddBeans(initialState, game) {
	for (var i=0; i<NUMBER_OF_BEANS; i++) {
		initialState.push(
			{ //that's how to declare a circle
				id:initialState.length,
				x: (Math.random()*game.canvasWidth)/SCALE,
				y: (Math.random()*(MAX_Y))+MIN_Y,
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
	//protections on each sides
	initialState.push(
		{
			id:initialState.length,
			x:0,
			y: (game.canvasWidth/2)/SCALE,
			angle: 0.0,
			halfWidth:0.1,
			halfHeight: (game.canvasWidth/1.5)/SCALE,
			dynamic: false,
			type: "rectangle",
			color: "#e6e3c6"
		}
	);
	initialState.push(
		{
			id:initialState.length,
			x: (game.canvasWidth)/SCALE,
			y: (game.canvasWidth/2)/SCALE,
			angle: 0.0,
			halfWidth:0.1,
			halfHeight: (game.canvasWidth/1.5)/SCALE,
			dynamic: false,
			type: "rectangle",
			color: "#e6e3c6"
		}
	);
	//add the container at the end first
	var container_size = CONTAINER_SIZE;
	for (var i=0.6*2; i<(game.canvasWidth/SCALE)-(0.55*2); i+=0.55*2) {
		initialState.push(
			{
				id:initialState.length,
				x:i,
				y:(game.canvasHeight)/SCALE-(container_size/2),
				angle: 0.0,
				halfWidth:0.1,
				halfHeight:container_size/2,
				dynamic: false,
				type: "rectangle",
				color: "#e6e3c6"
			}
		);
	}
	//build from the bottom up
	for (var j=(game.canvasHeight)/SCALE-(container_size)-1.5; j>ENTRY_POINT+1; j-=(0.35*4)){
		for (var i=0; i<(game.canvasWidth/SCALE); i+=(0.32*4)) {
			var x = i;
			if (mod%2==0) {
				x += (0.32*2);
			}
			if (mod%5==0 && mod != 0) {
				initialState.push(
					{
						id:initialState.length,
						x: x+0.32*2,
						y: j-0.3,
						angle: 0.0,
						halfWidth:0.2,
						halfHeight: 1.2,
						dynamic: false,
						type: "rectangle",
						color: "#e6e3c6"
					}
				);
			}
			else {
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
		}
		if (mod%5 ==0 && mod!=0) {
			j -= 0.8;
		}
		mod++;
	}
	return initialState;
}
