import React from "react";
import ClassNames from 'classNames'
import Box from './Box.js'
import { BarChart } from 'react-d3';

var SPage = React.createClass({
	
	render(){
		var isActive = this.state.isActive
		var tfi = ClassNames({
			"tfi":true,
			"flipInX":true,
			"animated":isActive,
		})

		var Test = Box({
			classNames:"slideInLeft",
			box:{
				w:400,
				h:200,
				l:100,
				t:500,
				background:"https://ss1.baidu.com/9vo3dSag_xI4khGko9WTAnF6hhy/image/h%3D200/sign=aaa2c6d6d26285358de0d521a0ee76f2/c83d70cf3bc79f3dc92e5814bda1cd11738b29c2.jpg"
			},
			zIndex:"10",
		});

		var Stat = Box({
			box:{
				w:400,
				h:200,
				l:300,
				t:800,
				background:"https://ss1.baidu.com/9vo3dSag_xI4khGko9WTAnF6hhy/image/h%3D200/sign=aaa2c6d6d26285358de0d521a0ee76f2/c83d70cf3bc79f3dc92e5814bda1cd11738b29c2.jpg"
			}
		});

		var Red = Box({
			box:{
				w:200,
				h:200,
				l:100,
				t:400,
				background:"red"
			}
		});
// <div className={tfi} isActive = {this.state.isActive}></div>
// 				<Test isActive = {this.state.isActive}/>
// 				<Stat/>
// 				<Red/>

		var barData = [
		  { 
		    "name": "Series A",
		    "values": [
		      { "x": 1, "y":  91},
		      { "x": 2, "y":  81},
		      { "x": 3, "y":  11},
		    ]
		  },
		  { 
		    "name": "Series B",
		     "values": [
		      { "x": 1, "y":  51},
		      { "x": 2, "y":  31},
		      { "x": 3, "y":  81},
		    ]
		  },
		  { 
		    "name": "Series B",
		     "values": [
		      { "x": 1, "y":  31},
		      { "x": 2, "y":  21},
		      { "x": 3, "y":  11},
		    ]
		  }
		];
		return (
			<div className="page2">
				<BarChart
				  data={barData}
				  width={500}
				  height={800}
				  fill={'#3182bd'}
				  title='Bar Chart'/>
			</div>
		);
	},
	getInitialState(){
		return{
			isActive:false
		}
	}
	
});

export {SPage as default }
