import React from 'react';
import ShareCover from "./share.js"
import Box from "./Box.js"


var EWM = Box({
	classNames:"ewm",
	box:{
		w:164,
		h:167,
		l:40,
		t:200,
		background:"http://i0.itc.cn/20160409/3649_19647a14_b199_d412_c6c8_587e89454c0d_1.png",
	}
});

var Btn = Box({
	classNames:"shareBtn",
	box:{
		w:640,
		h:100,
		l:0,
		t:800,
		background:"http://news.sohu.com/upload/yursilemcollect2135/img/invite.png",
	}
});

var Authors = Box({
	classNames:"authors flipInX",
	box:{
		w:200,
		h:100,
		l:250,
		t:500,
		background:"pink",
	}
});

var ShareComponent = React.createClass({
	render(){
		return (
			<div className="shareComponent">
				<Btn onTouchStart={this.showCover} />
				<Authors isActive = {this.state.isActive}/>
				<EWM isShow onTouchStart={this.preventDefault}/>
				<ShareCover ref="share"/>
			</div>
		);
	},
	showCover(e){
		e.preventDefault();
		e.stopPropagation();
		this.refs.share.setState({isShow:true});
	},
	getInitialState(){
		return{
			isActive:false
		}
	},
	preventDefault(e){
		console.log("event")
		e.preventDefault();
		e.stopPropagation();
	}
});

export {ShareComponent as default}