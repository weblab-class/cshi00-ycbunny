import React, { Component } from "react";

import "./SingleFunction.css";
import { post } from "../../utilities";
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
    return (
      <div >
        <span>y = {this.props.exp},  </span>
        <span>x from {this.props.leftRange} to {this.props.rightRange}</span>
        <button
          type="submit"
          className="NewPostInput-button u-pointer"
          value="Submit"
          onClick={this.handleDelete}
        >
        Delete
        </button>
      </div>
    );
  }
}

export default SingleFunction;
