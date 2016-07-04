let React = require('react');
let Comment = require('./Comment.js');

module.exports = React.createClass({
	render(){
		var commentNodes = this.state.data.map(function (comment,i) {
	      return (
	        <Comment key={i} author={comment.author} comment={comment.text}/>
	      );
	    });
		return(
			<div className="comments">
				{commentNodes}
			</div>
		)
	},
	getInitialState(){
		return{
			data:this.props.data
		}
	},

	 componentWillReceiveProps(props){
	 	// console.log("prop: "+ props);
	 }
});

