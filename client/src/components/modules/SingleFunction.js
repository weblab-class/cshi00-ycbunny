import React, { Component } from "react";
import { get } from "../../utilities";

import "./SingleFunction.css";

/**
 * Card is a component for displaying content like stories
 *
 * Proptypes
 * @param {string} _id of the function
 * @param {string} creator_name
 * @param {string} exp math expression
 * @param {number} leftRange 
 * @param {number} rightRange 
 */

class Card extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  render() {
    return (
      <div >
        <span>{this.props.exp}</span>
        <p>x from{this.props.leftRange} to {this.props.rightRange}</p>
      </div>
    );
  }
}

export default Card;
