import React, { Component } from "react";

import "./NewFunctionInput.css";
import { post } from "../../utilities";

/**
 * New Post is a parent component for all input components
 *
 * Proptypes
 * @param {string} defaultText is the placeholder text
 * @param {({functionId, value}) => void} addNewFunction: (function) triggered when this post is submitted, takes {storyId, value} as parameters
 */
class NewFunctionInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      exp: "",
      leftRange: "",
      rightRange:""
    };
  }

  addFunction = (a, b, c) => {
    const body = {exp: a, leftRange: b, rightRange: c};
    post("/api/function", body).then((func) => {
      // display this story on the screen
      this.props.addNewFunction(func);
    });
  };

  // called whenever the user types in the new post input box
  expChange = (event) => {
    this.setState({
      exp: event.target.value,
    });
  };

  leftRangeChange = (event) => {
    this.setState({
      leftRange: event.target.value,
    });
  };

  rightRangeChange = (event) => {
    this.setState({
      rightRange: event.target.value,
    });
  };

  // called when the user hits "Submit" for a new post
  handleSubmit = (event) => {
    event.preventDefault();
    this.addFunction && this.addFunction(this.state.exp, this.state.leftRange, this.state.rightRange);
    this.setState({
        exp: "",
        leftRange: "",
        rightRange:""
    });
  };

  render() {
    return (
      <div className="u-flex">
        <span>y = </span>
        <input
          type="text"
          placeholder={this.props.defaultText}
          value={this.state.exp}
          onChange={this.expChange}
          className="NewPostInput-input"
        />
        <span> x from </span>
        <input
          type="text"
          placeholder={this.props.defaultText}
          value={this.state.leftRange}
          onChange={this.leftRangeChange}
          className="NewPostInput-input"
        />
        <span> to </span>
        <input
          type="text"
          placeholder={this.props.defaultText}
          value={this.state.rightRange}
          onChange={this.rightRangeChange}
          className="NewPostInput-input"
        />
        <button
          type="submit"
          className="NewPostInput-button u-pointer"
          value="Submit"
          onClick={this.handleSubmit}
        >
          Enter
        </button>
      </div>
    );
  }
}

export default NewFunctionInput;
