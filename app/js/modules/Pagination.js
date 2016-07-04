let React = require('react');

module.exports = React.createClass({
	getInitialState(){
	  return{
	    page:0
	  }
	},
	update(e){
		e.stopPropagation();
		var index = parseInt(e.target.getAttribute("data-index"));
		this.setState({page:index});
		this.props.handleChange(index);
	},
	render(){
		var indents = [];
		var classes = "indents"
		var active = classes+" active"
		for (var i = 0; i < this.props.num; i++) {
			let classes = "indents"+ (this.state.page==i?" active":""); 
	 		indents.push(<li className={classes} data-index={i}  key={i}>{i}</li>);
		}
		return (
		   <ul onClick={this.update}>
		    {indents}
		   </ul>
		);
	}
});