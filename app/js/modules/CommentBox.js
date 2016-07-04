let React = require('react');
let Comments = require('./Comments.js');
let Pagination = require("./Pagination.js");
import Box from './Box.js'

var data = [
  {author: "Pete Hunt1", text: "This is one comment"},
  {author: "Jordan Walke2", text: "This is *another* comment"},
  {author: "Pete Hunt3", text: "This is one comment"},
  {author: "Jordan Walke4", text: "This is *another* comment"},
  {author: "Pete Hunt5", text: "This is one comment"},
  {author: "Jordan Walke6", text: "This is *another* comment"}
];
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


module.exports = React.createClass({
	render(){
		return(
			<div className="commentBox">
			  <Comments ref="comments" data={this.state.currentData}/>
              <Pagination ref="pagination" num={3} handleChange={this.handleChange} />
              <Authors isActive = {this.state.isActive}/>
            </div>
		)
	},
	handleChange(i){
		console.log(i);
	    var currentData = data.slice(i*2,i*2+2);
	    this.refs.comments.setState({data:currentData});
    },

	getInitialState(){
	    return{
	      currentData:data.slice(0,2),
	      page:0,
	      isActive:false
	    }
	},

	componentWillReceiveProps(props){
	 	// console.log("prop: "+ props);
	}
});
