function ExampleState(game) {
	State.call(this,game);
	this.bodiesState  = null;

	this.world = new Array(); //the world contains all the objects
	this.initialState = initialStateBuilder(this.game);
	this.init();
}

ExampleState.prototype = new State();
ExampleState.prototype.constructor = ExampleState;

ExampleState.prototype.draw = function() {
	this.game.ctx.clearRect(0, 0, this.game.canvasWidth, this.game.canvasHeight);
	this.game.ctx.fillStyle = "#424242";
	this.game.ctx.fillRect(0,0,600,680);

	for (var id in this.world) {
		var entity = this.world[id];
		entity.draw(this.game.ctx);
	}
	this.game.ctx.textAlign = "center";
	this.game.ctx.fillStyle = "#e6e3c6";
	this.game.ctx.font = "20px Helvetica";
	this.game.ctx.fillText("Bean Machine", 90, 20);
	this.game.ctx.fillRect(30,28, 200, 3);
}

//update all that is happening (called 60/s)
ExampleState.prototype.update = function(animStart) {
	this.box.update();
	this.bodiesState = this.box.getState();
	for (var id in this.bodiesState) {
		var entity = this.world[id];
		if (entity) {
			entity.update(this.bodiesState[id]);
		}
	}
};

//handles events recorded in this.keysDown
ExampleState.prototype.eventsCallbacks = function() {
};

//Handle pointer events
ExampleState.prototype.pDown = function(e) {
	this.box.nudge(0.1);
	//console.log(e);
}

ExampleState.prototype.pUp = function(e) {
}

ExampleState.prototype.pMove = function(e) {
}

ExampleState.prototype.init = function() {
	//fill the world with all the objects
	for (var i in this.initialState) {
		this.world[i] = Entity.build(this.initialState[i]);
	}
	this.box = new bTest(90, false, this.game.canvasWidth, this.game.canvasHeight, SCALE);

	this.box.setBodies(this.world);

	this.box.addContactListener({
		BeginContact: function(idA, idB) {
			//console.log('b');
		},
		PostSolve: function (idA, idB, impulse) {
			//console.log('ljkl');
		}
	});

}
