import React from "react"

var Box = function(opt){
	var option ={
		classNames:"",
		box:{
			w:200,
			h:200,
			l:0,
			t:0,
			background:"https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1759680674,3741000374&fm=116&gp=0.jpg",
		},
	}

	extend(option,opt);
	

	function extend(newObj,target){
		for(let i in target){
			newObj[i] = target[i];
			if(typeof target[i] == "object"){
				extend(newObj[i],target[i]);
			}
		}
	}

	function toStyle(option){
		var box = option.box;
		
		var styles = {
			width:box.w,
			height:box.h,
			left:box.l,
			top:box.t,
			backgroundRepeat:"no-repeat",
			position:"absolute",
			backgroundSize:"cover",
		}
		if(box.background.indexOf("http")>-1){
			styles.backgroundImage = "url("+box.background+")";
		}else{
			styles.background = box.background;
		}
		if(option.zIndex) styles.zIndex = option.zIndex;

		return styles;
	}

	

	return React.createClass({
		render(){
			var styles = toStyle(option);
			var isActive = this.props.isActive;
			var classNames = option.classNames;
			if(typeof isActive!=="undefined"){
				classNames += (isActive?" animated":"");
				styles.display = (isActive?"block":"none");
			}

			var dom = "";
			if(this.props.onTouchStart){
				dom = (
					<div className={classNames} style={styles} onTouchStart = {this.props.onTouchStart}></div>
				)
			}else{
				dom = (
					<div className={classNames} style={styles}></div>
				)
			}
			return dom;
		},
		getInitialState(){
			return {
				isActive:this.props.isActive
			}
		}
	});

}
export {Box as default}	