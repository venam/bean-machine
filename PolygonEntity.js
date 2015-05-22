function PolygonEntity( id, x, y,center,color, polys, dynamic) {
	Entity.call(this, id,x,y,center,color, dynamic);
	this.polys = polys;
	this.type = "polygon";
}
PolygonEntity.prototype = new Entity();
PolygonEntity.prototype.constructor = PolygonEntity;

PolygonEntity.prototype.draw = function(ctx) {
	ctx.save();
	ctx.translate(this.x*SCALE, this.y*SCALE);
	ctx.rotate(this.angle);
	ctx.translate(-(this.x)*SCALE, -(this.y)*SCALE);
	ctx.fillStyle = this.color;

	for(var i=0; i< this.polys.length; i++) {
		var points = this.polys[i];
		ctx.beginPath();
		ctx.moveTo( (this.x+points[0].x)*SCALE, 
				(this.y+points[0].y)*SCALE);
		for (var j=1; j< points.length; j++) {
			ctx.lineTo( (points[j].x+this.x)*SCALE,
					(points[j].y+this.y)*SCALE);
		}
		ctx.lineTo( (this.x+points[0].x)*SCALE,
				(this.y+points[0].y)*SCALE);
		ctx.closePath();
		ctx.fill();
	}

	ctx.restore();
//	Entity.prototype.draw.call(this, ctx);
}

