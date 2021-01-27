import React, { Component } from "react";
import { Redirect } from "@reach/router";

class Direct extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <Redirect push to={localStorage.getItem('progress')}/>
    )
  }
}
export default Direct;