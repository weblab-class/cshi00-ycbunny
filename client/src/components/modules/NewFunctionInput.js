import React, { Component } from "react";

import "./NewFunctionInput.css";
import { post } from "../../utilities";

/**
 * New Post is a parent component for all input components
 *
 * Proptypes
 * @param {string} defaultText is the placeholder text
 * @param {({functionId, value}) => void} addNewFunction: (function) triggered when this post is submitted, takes {storyId, value} as parameters
 * @param changeBetweenCartPolar 
 */
class NewFunctionInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      exp: "",
      leftRange: "",
      rightRange:"",
      origin:"",
    };
  }
  changeMode = () => {
    console.log(1);
    this.props.changeBetweenCartPolar();
  };

  addFunction = (a, b, c, d, e, f) => {
    const body = {exp: a, leftRange: b, rightRange: c, workId: d, mode: f, origin: e};
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

  originChange = (event) => {
    this.setState({
      origin: event.target.value,
    });
  };

  // called when the user hits "Submit" for a new post
  handleSubmit = (event) => {
    event.preventDefault();
    console.log(this.props.mode);
    this.addFunction(this.state.exp, this.state.leftRange, this.state.rightRange, this.props.workId, this.state.origin, this.props.mode);
    this.setState({
        exp: "",
        leftRange: "",
        rightRange:"",
        mode:"",
        origin:""
    });
  };

  render() {
    if (this.props.mode === "cartesian"){
      return (
        <div className=" NewPostInput-container">
          <button
                type="submit"
                className="NewPostInput-button u-pointer"
                value="Submit"
                onClick={this.changeMode}
              >
              ➡ Polar
          </button>
          <span>y = </span>
          <input
            type="text"
            placeholder={this.props.defaultText}
            value={this.state.exp}
            onChange={this.expChange}
            className="Function-input-box"
          />
          <span> ; x from </span>
          <input
            type="text"
            placeholder={this.props.defaultText}
            value={this.state.leftRange}
            onChange={this.leftRangeChange}
            className="Bound-input-box"
          />
          <span> to </span>
          <input
            type="text"
            placeholder={this.props.defaultText}
            value={this.state.rightRange}
            onChange={this.rightRangeChange}
            className="Bound-input-box"
          />
        
          <button
            type="submit"
            className="checkmark-button u-pointer"
            value="Submit"
            onClick={this.handleSubmit}
          >
            ✔
          </button>
        </div>
      );
    }
  if (this.props.mode === "polar"){
    return (
      <div className="NewPostInput-container">
        <button
                type="submit"
                className="NewPostInput-button u-pointer"
                value="Submit"
                onClick={this.changeMode}
              >
              ➡ Cartesian
        </button>
        <span>r = </span>
        <input
          type="text"
          placeholder={this.props.defaultText}
          value={this.state.exp}
          onChange={this.expChange}
          className="Function-input-box"
        />
        <span> ; theta from </span>
        <input
          type="text"
          placeholder={this.props.defaultText}
          value={this.state.leftRange}
          onChange={this.leftRangeChange}
          className="Bound-input-box"
        />
        <span> to </span>
        <input
          type="text"
          placeholder={this.props.defaultText}
          value={this.state.rightRange}
          onChange={this.rightRangeChange}
          className="Bound-input-box"
        />
        <span> origin: </span>
        <input
          type="text"
          placeholder="(x, y)"
          value={this.state.origin}
          onChange={this.originChange}
          className="Origin-input-box"
        />
        <button
          type="submit"
          className="checkmark-button u-pointer"
          value="Submit"
          onClick={this.handleSubmit}
        >
          ✔
        </button>
      </div>
    );
  }
  }
}

export default NewFunctionInput;
