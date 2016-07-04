var React = require("react");
import ShareCover from "./share.js"

module.exports = React.createClass({
	render(){
		return (
			<div className="shareComponent">
				<div onTouchStart={this.showCover} className="shareBtn"></div>
				<ShareCover ref="share"/>
			</div>
		);
	},
	showCover(){
		this.refs.share.setState({isShow:true});
	}
});