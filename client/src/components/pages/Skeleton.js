import React, { Component } from "react";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import GraphingPanel from "../modules/GraphingPanel.js";

import "../../utilities.css";
import "./Skeleton.css";

//TODO: REPLACE WITH YOUR OWN CLIENT_ID
const GOOGLE_CLIENT_ID = "511281853920-t004vd2ldi1trng5tj06ubin80bm6j1h.apps.googleusercontent.com";

class Skeleton extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    this.state = {};
  }

  componentDidMount() {
    // remember -- api calls go here!
  }

  render() {
    let a = [{exp: 1, leftRange: 0, rightRange: 1}, {exp: 2, leftRange: 0, rightRange: 1}]
    return (
      <>
        <h1 class="u-textCenter">Graphiti</h1>
        <hr/>
        <section class="u-textCenter">
          <p> Embrace your inner artsy, math nerd and make drawings with function graphs! Graphiti away!</p>
        </section>
        <section class="u-textCenter">
          <h3>Start Creating!</h3>
        </section>
        <GraphingPanel functions = {[{exp: "1", leftRange: 0, rightRange: 1}, {exp: "2", leftRange: 1, rightRange: 3}]}/>
      </>
    );
  }
}

export default Skeleton;
