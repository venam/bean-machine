//wrapper for requestAnimFrame that works on multiple Browsers
window.requestAnimFrame = (function(){
	return  window.requestAnimationFrame       || 
			window.webkitRequestAnimationFrame || 
			window.mozRequestAnimationFrame    || 
			window.oRequestAnimationFrame      || 
			window.msRequestAnimationFrame     || 
			function(/* function */ callback, /* DOMElement */ element){
				window.setTimeout(callback, 1000 / 60);
			};
})();

/*---- MainGame Class ----*/
function MainGame() {
	//related to levels and powerup
	//canvas used everywhere
	this.canvas             = document.getElementById("c0");
	this.ctx                = this.canvas.getContext("2d");
	this.canvasWidth        = this.ctx.canvas.width;
	this.canvasHeight       = this.ctx.canvas.height;
	this.mobile             = false;
	this.mobileCheck();
}

MainGame.prototype.mobileCheck = function() {
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent.toLocaleLowerCase()) ){
		this.mobile = true;
	}
}

//change the game state
MainGame.prototype.setState = function (state) {
	gameState = state;
}

//the game loop that runs 60/s
MainGame.prototype.run = function () {
	(function loop(animStart) {
		gameState.update(animStart);
		gameState.draw();
		requestAnimFrame(loop);
	})();
}
/*---- End of MainGame ----*/

/*---- Global vars ----*/
var theGame  = new MainGame();
//states
gameState = new ExampleState(theGame);

//all Events
var keysDown = {};
addEventListener("keydown", function(e) {
	keysDown[e.keyCode] = true;
}, false);
addEventListener("keyup", function(e) {
	delete keysDown[e.keyCode];
}, false);
window.addEventListener("pointerdown", function(e) {
//	media.zik.play();
	e.x-=theGame.canvas.offsetLeft;
	e.y-=theGame.canvas.offsetTop;
	gameState.pDown(e);
}, false);
window.addEventListener("pointerup", function(e) {
	var rect = theGame.canvas.getBoundingClientRect();
	e.x-=rect.left;
	e.y-=rect.top;
	gameState.pUp(e);
}, false);
window.addEventListener("pointermove", function(e) {
	var rect = theGame.canvas.getBoundingClientRect();
	e.x-=rect.left;
	e.y-=rect.top;
	gameState.pMove(e);
}, false);


/*---- Make it run ----*/
theGame.run();
/*---- ----*/


