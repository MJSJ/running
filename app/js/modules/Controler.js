// var Controler = require("./js")





function Controler(game){
	this.game = game;
	this.preTime = 0;

	this.addButtons();
}

Controler.timeToSpeed = function(time){
	var speed = 0;
	if(time<180){
		speed = 11
	}else if(time>=180&&time<=190){
		speed = 10
	}else if(time>=190&&time<=200){
		speed = 9
	}else if(time>=200&&time<=210){
		speed = 8;
	}else if(time == 0){
		speed = 0;
	}else{
		speed = 7;
	}

	return speed;

}


Controler.prototype.speedUp = function(){
	if(this.preTime===0){
		this.prevTime = this.currentTime;
	}
	this.diffTime = this.currentTime - this.preTime;


	var speed = Controler.timeToSpeed(this.diffTime);

	this.game.players[0].setSpeed(speed);

	this.preTime = this.currentTime;
}

Controler.prototype.showTimes = function(){

}

Controler.prototype.addButtons = function(){
	var _this = this;
	var button1 = new PIXI.Sprite.fromFrame("button1");
	button1.interactive = true;
	button1.position.x = 0;
	button1.position.y = 790;
	this.game.scroller.stage.addChild(button1);


	var button2 = new PIXI.Sprite.fromFrame("button2");
	button2.interactive = true;
	button2.position.x = 323;
	button2.position.y = 790;
	this.game.scroller.stage.addChild(button2);

	button1.on("touchstart",function(){
		_this.currentTime = new Date().getTime();
		// this.texture = new PIXI.Texture.fromFrame("button1_active");
		this.alpha = 0.5;
		_this.speedUp();
	});
	button1.on("touchend",function(){
		// this.texture = new PIXI.Texture.fromFrame("button1");
		this.alpha = 1;
	})


	button2.on("touchstart",function(){
		_this.currentTime = new Date().getTime();
		// this.texture = new PIXI.Texture.fromFrame("button1_active");
		this.alpha = 0.5;
		_this.speedUp();
	});
	button2.on("touchend",function(){
		// this.texture = new PIXI.Texture.fromFrame("button1");
		this.alpha = 1;
	})
}

Controler.prototype.recoredPrevTime = function(){
	this.preTime = new Date().getTime();
	this.texttrue
}


module.exports = Controler;