// var Control = require("./js")





function Control(){

}


Control.prototype.speedUp = function(){

}

Control.prototype.showTimes = function(){

}

Control.prototype.showDistance = function(){

}

Control.prototype.countDown = function(){
	var countDown0 = PIXI.Sprite.fromFrame("./countDown0");
	countDown0.position.x = 250;
	countDown0.position.y = 350;

	var countDown1 = PIXI.Sprite.fromFrame("./countDown1");
	countDown1.position.x = 250;
	countDown1.position.y = 350;

	var countDown2 = PIXI.Sprite.fromFrame("./countDown2");
	countDown2.position.x = 250;
	countDown2.position.y = 350;

	var countDown3 = PIXI.Sprite.fromFrame("./countDown3");
	countDown3.position.x = 250;
	countDown3.position.y = 350;

	// this.
}



module.exports = Control;