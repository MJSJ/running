import React from 'react'
import ClassNames from 'classNames'

var ShareCover = React.createClass({
	hideCover(){
		this.setState({
	      isShow:false
	    })
	},
	stopPropagation(e){
		e.preventDefault();
		e.stopPropagation();
	},
	getInitialState(){
	    return{
	      isShow:false
	    }
    },
	render(){
		var isShow = {display:this.state.isShow?"block":"none"}
		var cx = ClassNames;
		var classes = cx({
			'shareCover':true, 
			'fanimated':true, 
			'bounceInDown':this.state.isShow
		});
		let shareCover = (
			<div className={classes} style={isShow}  onTouchStart={this.hideCover}>
				<h1 className="shareFont">share</h1>
			</div>
		)
		return shareCover;
	}
});

export {ShareCover as default}