var   b2Vec2 = Box2D.Common.Math.b2Vec2
 , b2BodyDef = Box2D.Dynamics.b2BodyDef
 , b2Body = Box2D.Dynamics.b2Body
 , b2FixtureDef = Box2D.Dynamics.b2FixtureDef
 , b2Fixture = Box2D.Dynamics.b2Fixture
 , b2World = Box2D.Dynamics.b2World
 , b2MassData = Box2D.Collision.Shapes.b2MassData
 , b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape
 , b2CircleShape = Box2D.Collision.Shapes.b2CircleShape
 , b2DebugDraw = Box2D.Dynamics.b2DebugDraw
   ;


function bTest(intervalRate, adaptive, width, height, scale) {
  this.intervalRate = parseInt(intervalRate);
  this.adaptive     = adaptive;
  this.width        = width;
  this.height       = height;
  this.scale        = scale;

  this.bodiesMap = {};

  this.world        = new b2World(
        new b2Vec2(0, 10)    //gravity
     ,  false                //allow sleep
  );

  var SCALE               = 30;

  this.fixDef             = new b2FixtureDef;
  this.fixDef.density     = 0.6;
  this.fixDef.friction    = 0.1;
  this.fixDef.restitution = 0.7;

  this.buildGround();

}

bTest.prototype.buildGround = function() {
	//create ground
	var bodyDef = new b2BodyDef;
	bodyDef.type = b2Body.b2_staticBody;

	// positions the center of the object (not upper left!)
	bodyDef.position.x = this.width / 2 / this.scale;
	bodyDef.position.y = this.height / this.scale;

	this.fixDef.shape = new b2PolygonShape;

	// half width, half height. eg actual height here is 1 unit
	this.fixDef.shape.SetAsBox((this.width-(this.width*0.1) / this.scale) / 2, (10/this.scale) / 2);
	this.world.CreateBody(bodyDef).CreateFixture(this.fixDef);

}

bTest.prototype.update = function() {
  var start = Date.now();
  var stepRate = (this.adaptive) ? (now - this.lastTimestamp) / 1000 : (1 / this.intervalRate);
  this.world.Step(
         stepRate   //frame-rate
      ,  10       //velocity iterations
      ,  10       //position iterations
   );
   this.world.ClearForces();
   return (Date.now() - start);
}

bTest.prototype.getState = function() {
  var state = {};
  for (var b = this.world.GetBodyList(); b; b = b.m_next) {
    if (b.IsActive() && typeof b.GetUserData() !== 'undefined' && b.GetUserData() != null) {
        state[b.GetUserData()] = this.getBodySpec(b);
    }
  }
  return state;
}


bTest.prototype.nudge = function(force) {
    for (var b = this.world.GetBodyList(); b; b = b.m_next) {
		if (b.GetType() != b2Body.b2_staticBody && typeof b.GetUserData() !== 'undefined' && b.GetUserData() != null) {
			var position = b.GetPosition();
			position.y -= force;
			b.SetPosition(position);
		}
    }
}


bTest.prototype.getBodySpec = function(b) {
	return {
		x: b.GetPosition().x, 
		y: b.GetPosition().y, 
		a: b.GetAngle(), 
		c: {x: b.GetWorldCenter().x, y: b.GetWorldCenter().y}};
}

bTest.prototype.setGrav = function (grav) {
	var gravity = new b2Vec2( 0, 10 );
	if (grav =='up') {
		gravity = new b2Vec2( 0, -10 );
	}
	else if (grav=="left") {
		gravity = new b2Vec2( -10, 0 );
	}
	else if (grav =="right") {
		gravity = new b2Vec2( 10, 0 );
	}
	else if (grav == "right+") {
		gravity = new b2Vec2( 25, 0 );
	}
	else if (grav == "left+") {
		gravity = new b2Vec2( -25, 0);
	}
	else if (grav == "up+") {
		gravity = new b2Vec2( 0 , -25);
	}
	else if (grav == "down+") {
		gravity = new b2Vec2( 0 , 25);
	}
	this.world.SetGravity( gravity );

}

bTest.prototype.setBodies = function(bodyEntities) {
	var bodyDef = new b2BodyDef;
	for(var id in bodyEntities) {
		if (bodyEntities[id].dynamic==true) {
			bodyDef.type = b2Body.b2_dynamicBody;
		}
		else {
			bodyDef.type = b2Body.b2_staticBody;
		}

		var entity = bodyEntities[id];
		bodyDef.position.x = entity.x;
		bodyDef.position.y = entity.y;
		bodyDef.angle = entity.angle || 0.0;
		bodyDef.userData = entity.id;
		var body = this.registerBody(bodyDef);

		if (entity.radius) {
			/*
			this.fixDef.density     = 8.0;
			this.restitution        = 0.03;
			this.friction           = 9.0;
			*/
			this.fixDef.shape = new b2CircleShape(entity.radius);
			body.CreateFixture(this.fixDef);
			/*
			this.fixDef.density = 1.0;
			this.restitution        = 0.8;
			this.friction           = 0.3;
			*/
		} else if (entity.polys) {
			for (var j = 0; j < entity.polys.length; j++) {
				var points = entity.polys[j];
				var vecs = [];
				for (var i = 0; i < points.length; i++) {
					var vec = new b2Vec2();
					vec.Set(points[i].x, points[i].y);
					vecs[i] = vec;
				}
				this.fixDef.shape = new b2PolygonShape;
				this.fixDef.shape.SetAsArray(vecs, vecs.length);
				body.CreateFixture(this.fixDef);
			}
		} else {
			//var fixDef2              = new b2FixtureDef;
			//fixDef2.density     = 5.0;
			//fixDef2.friction    = 5.0;
			//fixDef2.restitution = 0.01;

			//fixDef2.shape = new b2PolygonShape;
			//fixDef2.shape.SetAsBox(entity.halfWidth, entity.halfHeight);
			this.fixDef.shape = new b2PolygonShape;
			this.fixDef.shape.SetAsBox(entity.halfWidth, entity.halfHeight);
			body.CreateFixture(this.fixDef);
			//body.CreateFixture(fixDef2);
		}
	}
	this.ready = true;
}

bTest.prototype.registerBody = function(bodyDef) {
	var body = this.world.CreateBody(bodyDef);
	this.bodiesMap[body.GetUserData()] = body;
	return body;
}

bTest.prototype.addContactListener = function(callbacks) {
	var listener = new Box2D.Dynamics.b2ContactListener;

	if (callbacks.BeginContact) listener.BeginContact = function(contact) {
		callbacks.BeginContact(contact.GetFixtureA().GetBody().GetUserData(),
				contact.GetFixtureB().GetBody().GetUserData());
	}
	if (callbacks.EndContact) listener.EndContact = function(contact) {
		callbacks.EndContact(contact.GetFixtureA().GetBody().GetUserData(),
				contact.GetFixtureB().GetBody().GetUserData());
	}
	if (callbacks.PostSolve) listener.PostSolve = function(contact, impulse) {
		callbacks.PostSolve(contact.GetFixtureA().GetBody().GetUserData(),
				contact.GetFixtureB().GetBody().GetUserData(),
				impulse.normalImpulses[0]);
	}
	this.world.SetContactListener(listener);
}

bTest.prototype.removeBody = function(id) {
	this.world.DestroyBody(this.bodiesMap[id]);
}



