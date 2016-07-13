var TWEEN  = require("tween.js");

function Page1(renderer,stage){
	this.renderer = renderer;
	this.stage = stage;

	this.addCamera();

	this.addFar();
	this.addRear();
	this.addTrackBG();
	this.addClouds();


	this.addTitle();
	this.addFigurePlayer();

	//add start btn
	this.addStartBtn();

	this.addSingle();
	this.addDouble();


	this.addWelcom();

	this.renderer.render(this.stage);

	this.update();


	


	Page1.prototype.TEXTURE_SINGLE = new PIXI.Texture.fromFrame("single_player1");
	Page1.prototype.TEXTURE_SINGLE_ACTIVE = new PIXI.Texture.fromFrame("single_player1_active");
	Page1.prototype.TEXTURE_DOUBLE = new PIXI.Texture.fromFrame("double_player1");
	Page1.prototype.TEXTURE_DOUBLE_ACTIVE = new PIXI.Texture.fromFrame("double_player1_active");
}

Page1.CAMERA_MAX_Y = 530;




Page1.prototype.addTitle = function(){
	this.title = new PIXI.Sprite.fromFrame("title1");
	this.title.position.y = 68;
	this.title.position.x = 48;
	this.stage.addChild(this.title);
}

Page1.prototype.addFar = function(){
	this.far = new PIXI.Sprite.fromFrame("far_1");
	this.far.position.x = 0;
	this.far.position.y = 358;
	this.stage.addChild(this.far);
}


Page1.prototype.addCamera = function(){
	this.camera = new PIXI.Sprite.fromFrame("camera");
	this.camera.position.y = Page1.CAMERA_MAX_Y;
	this.picturing = new PIXI.Sprite.fromFrame("picturing");
	this.picturing.position.x = 80;
	this.picturing.position.y = -20;
	this.picturing.alpha = 0;
	// this.picturing.scale = 0.1;
	this.camera.addChild(this.picturing);
	this.stage.addChild(this.camera);
}



Page1.prototype.addRear = function(){
	this.rear = new PIXI.Sprite.fromFrame("rear_1");
	this.rear.position.x = 0;
	this.rear.position.y = 424;
	this.stage.addChild(this.rear);	
}

Page1.prototype.addTrackBG = function(){
	this.trackbg = new PIXI.Sprite.fromFrame("trackbg");
	this.trackbg.position.x = 0;
	this.trackbg.position.y = 532;
	this.stage.addChild(this.trackbg);
}

Page1.prototype.addClouds = function(){
	this.clouds = new PIXI.Container();
	var cloud1 = new PIXI.Sprite.fromFrame("cloud");
	cloud1.position.x = 30;
	cloud1.position.y = 50;
	this.clouds.addChild(cloud1);

	var cloud2 = new PIXI.Sprite.fromFrame("cloud");
	cloud2.position.x = 400;
	cloud2.position.y = 230;
	this.clouds.addChild(cloud2);


	var cloud3 = new PIXI.Sprite.fromFrame("cloud");
	cloud3.position.x = 760;
	cloud3.position.y = 60;
	this.clouds.addChild(cloud3);

	this.clouds.position.x = 0;

	this.stage.addChild(this.clouds);

}

Page1.prototype.addStartBtn = function(){
	this.startBtn = new PIXI.Sprite.fromFrame("start");
	this.startBtn.position.x = 180;
	this.startBtn.position.y = 820;
	this.startBtn.interactive = true;
	this.stage.addChild(this.startBtn);

	// this.startBtn.on("tap",function)
}

Page1.prototype.addWelcom = function(){
	this.welcome = new PIXI.Sprite.fromFrame("welcome");
	this.welcome.position.x = 240;
	this.welcome.position.y = 260;
	this.stage.addChild(this.welcome);
}


Page1.prototype.addSingle = function(){
	this.single_player = new PIXI.Sprite.fromFrame("single_player1_active");
	this.single_player.position.x = 0;
	this.single_player.position.y = 400;
	this.single_player.interactive = true;
	// this.single_player.texture = this.TEXTURE_SINGLE_ACTIVE;
	this.type = 1;
	this.single_player.on("tap",function(){
		this.type = 1;
		this.single_player.texture = this.TEXTURE_SINGLE_ACTIVE;
		this.double_player.texture = this.TEXTURE_DOUBLE;
	}.bind(this))
	this.stage.addChild(this.single_player)
}

Page1.prototype.addDouble = function(){
	this.double_player = new PIXI.Sprite.fromFrame("double_player1");
	this.double_player.position.x = 0;
	this.double_player.position.y = 466;
	this.double_player.interactive = true;
	this.double_player.on("tap",function(){
		this.type = 2;
		this.double_player.texture = this.TEXTURE_DOUBLE_ACTIVE;
		this.single_player.texture = this.TEXTURE_SINGLE;
	}.bind(this))
	this.stage.addChild(this.double_player)

}

Page1.prototype.addFigurePlayer = function(){
	var textureArray = [];
	for (let i=1; i < 3; i++)
	{
	     var texture = PIXI.Texture.fromFrame("figurePlayer"+i);
	     textureArray.push(texture);
	};

	this.figurePlayer = new PIXI.extras.MovieClip(textureArray);
	this.figurePlayer.position.x = 162;
	this.figurePlayer.position.y = 358;
	this.figurePlayer.animationSpeed = 0.1;
	this.figurePlayer.play();
	this.stage.addChild(this.figurePlayer);
}

Page1.prototype.update = function(){
	this.updateCloud();
	this.updateFar();
	this.updateRear();
	// this.update


	this.takePhoto();
	this.updating();
	
}

Page1.prototype.updating = function(){
	this.timer = webkitRequestAnimationFrame(this.updating.bind(this));
	this.renderer.render(this.stage);
	TWEEN.update();
}


Page1.prototype.start = function(){

}


Page1.prototype.updateCloud = function(){
	var tween = new TWEEN.Tween(this.clouds.position);
	tween.to({x:-400},25000);
	tween.repeat(Infinity);
	tween.yoyo(true);
	tween.start();
}



Page1.prototype.updateFar = function(){
	var tween = new TWEEN.Tween(this.far.position);
	tween.to({x:-60},3000).repeat(Infinity).yoyo(true).start();
}

Page1.prototype.updateRear = function(){
	var tween = new TWEEN.Tween(this.rear.position);
	tween.to({x:-60},3000).repeat(Infinity).yoyo(true).start();
}

Page1.prototype.takePhoto = function(){
	var tween = new TWEEN.Tween(this.camera.position);
	var coordinate = generatePicturingPosition();
	this.camera.position.x = coordinate.x;
	tween.to({y:coordinate.y},1000)
	.onComplete(this.caa.bind(this));

	tween.start();
}

Page1.prototype.caa = function(){
	this.caaTween = new TWEEN.Tween(this.picturing);
	this.caaTween.to({alpha:1},300).
	onComplete(this.hideCamera.bind(this)).
	start();

}

Page1.prototype.hideCamera = function(){
	this.picturing.alpha = 0;
	// this.picturing.scale = 0.1;
	var tween = new TWEEN.Tween(this.camera.position);
	tween.to({y:Page1.CAMERA_MAX_Y},1000).
	onComplete(function(){
		this.takePhoto();
	}.bind(this),2000).
	delay(1000);
	tween.start();
}

Page1.prototype.stopAnimation = function(){
	webkitCancelAnimationFrame(this.timer);
	this.timer = null;
}




function generatePicturingPosition(){
	var minX = 0;
	var maxX = 300;
	var minY = 290;
	var maxY = 350;

	var x = Math.floor(Math.random()*maxX);
	var y = Math.floor(maxY-Math.random()*100)
	var coordinate = {
		"x":x,
		"y":y
	};
	return coordinate;
}

module.exports = Page1;



