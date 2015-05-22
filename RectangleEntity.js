//sub-class of Entity
function RectangleEntity(id, x, y,center, color, halfWidth, halfHeight, dynamic, angle) {
	Entity.call(this, id, x, y,center,color, dynamic);
	this.halfWidth = halfWidth;
	this.halfHeight = halfHeight;
	this.angle = angle || 0.0;
	this.type = "rectangle";
}
//Inherit from Entity and override constructor
RectangleEntity.prototype = new Entity();
RectangleEntity.prototype.constructor = RectangleEntity;

RectangleEntity.prototype.draw = function(ctx) {
	ctx.save();
	ctx.translate(this.x * SCALE, this.y * SCALE);
	ctx.rotate(this.angle);
	ctx.translate(-(this.x) * SCALE, -(this.y) * SCALE);
	ctx.fillStyle = this.color;
	ctx.fillRect((this.x-this.halfWidth) * SCALE,
				(this.y-this.halfHeight) * SCALE,
				(this.halfWidth*2) * SCALE,
				(this.halfHeight*2) * SCALE);
	ctx.restore();
	
}

