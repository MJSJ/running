


function Control(){

}


Control.prototype.speedUp = function(){

}

Control.prototype.showTimes = function(){

}

Control.prototype.showDistance = function(){

}

Control.prototype.countDown = function(stage,fn){
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

	var countDowns = [];
	countDowns.push(countDown0);
	countDowns.push(countDown1);
	countDowns.push(countDown2);
	countDowns.push(countDown3);


	var i = 0;

	var timer = setInterval(function(){

		if(i !== 0){
			stage.removeChild(countDowns[i-1]);
		}else if(i == countDowns.length){
			clearInterval(timer);
			fn();
		}
		stage.addChild(countDowns[i]);
		i++;
	},1000);
}



module.exports = Control;