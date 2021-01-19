import React, { Component } from "react";
import { get } from "../../utilities";

import "./SingleFunction.css";

/**
 * Card is a component for displaying content like stories
 *
 * Proptypes
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
        <span>y = {this.props.exp},  </span>
        <span>x from {this.props.leftRange} to {this.props.rightRange}</span>
      </div>
    );
  }
}

export default Card;
