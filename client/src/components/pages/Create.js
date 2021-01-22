import React, { Component } from "react";
import "../../utilities.css";


class Create extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>Let's start creating!</h1>
        <p>Enter math functions to draw your graphito! (yes, the singular version of graffiti is graffito):D.</p>
      </div>
    );
  }
}

export default Create;