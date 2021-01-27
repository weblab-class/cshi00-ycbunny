import React, { Component } from "react";
import { create, all } from 'mathjs';

import "./SingleFunction.css";
import { post } from "../../utilities";
const math = create(all);
import MathJax from 'react-mathjax-preview'
/**
 * Card is a component for displaying content like stories
 *
 * Proptypes
 * @param {string} creator_name
 * @param {string} exp math expression
 * @param {number} leftRange 
 * @param {number} rightRange 
 */

class SingleFunction extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  deleteFunction = (id) => {
    post("/api/functiondelete", {id: id,}).then(this.props.deleteOldFunction(id));
  };

  handleDelete = (event) => {
    event.preventDefault();
    console.log(this.props._id);
    this.deleteFunction(this.props._id);
  };


  render() {
    if (this.props.mode === "cartesian"){
      let tex = math.parse("y = "+this.props.exp).toTex()
      return(
        <div className="Each-function" >
        <MathJax config= {{display: "inline"}} math={"$"+ tex + "$"} />
        <span> {"x from " + this.props.leftRange +" to "+ this.props.rightRange}</span>
        <button
          type="submit"
          className="SingleFunction-button u-pointer"
          value="Submit"
          onClick={this.handleDelete}
        >
        ✘
        </button>
      </div>
      )
    };
    if (this.props.mode === "polar"){
      let tex = math.parse("r = "+ this.props.exp).toTex()
      return(
        <div className="Each-function">
        <MathJax config= {{display: "inline"}} math={"$"+ tex + "$"} />
        <span>origin ({this.props.origin[1]}, {this.props.origin[4]})</span>
        <span>theta from {this.props.leftRange} to {this.props.rightRange}</span>
        <button
          type="submit"
          className="SingleFunction-button u-pointer"
          value="Submit"
          onClick={this.handleDelete}
        >
        ✘
        </button>
      </div>
      )
    };
  }
}

export default SingleFunction;
