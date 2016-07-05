import React from "react"

var yScroll = require('./yScroll.js');

var Scroll = React.createClass({
	render(){
		return(
			<div className="detail">
				<div className="container1" id="timeLine">
					<div className="assist" id="assist">
					</div>
				</div>
			</div>
		);
	},
	componentDidMount(){
		new yScroll(document.getElementById("timeLine"));
	}
});

export {Scroll as default}