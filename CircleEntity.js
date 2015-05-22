//Sub-class of Entity
function CircleEntity(id, x, y, center, color,radius, dynamic) {
	//Call the parent constructor
	Entity.call(this, id, x, y,center, color, dynamic);
	this.color = color;
	this.radius = radius;
	this.type   = "circle";
	this.angle = 0.1;
}
//inherit and override constructor to not point back to Entity's constructor
CircleEntity.prototype = new Entity();
CircleEntity.prototype.constructor = CircleEntity;

//overriding the method draw
CircleEntity.prototype.draw = function(ctx) {
	ctx.fillStyle = this.color;
	ctx.beginPath();
	ctx.strokeStyle = "#000000";
	ctx.arc(this.x * SCALE, this.y * SCALE, this.radius * SCALE, 0, Math.PI * 2, true);
	ctx.closePath();
	ctx.fill();
	ctx.stroke();
	//Entity.prototype.draw.call(this, ctx);
}

