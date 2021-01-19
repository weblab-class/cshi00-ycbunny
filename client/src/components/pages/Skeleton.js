import React, { Component } from "react";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import GraphingPanel from "../modules/GraphingPanel.js";
import NewFunctionInput from "../modules/NewFunctionInput.js";

import "../../utilities.css";
import "./Skeleton.css";

//TODO: REPLACE WITH YOUR OWN CLIENT_ID
const GOOGLE_CLIENT_ID = "511281853920-t004vd2ldi1trng5tj06ubin80bm6j1h.apps.googleusercontent.com";

class Skeleton extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    this.state = {
      functions: [],
    };
  }

  // componentDidMount() {
  //   //document.title = "Home Page";
  //   get("/api/functions").then((functionObjs) => {
  //     let reversedFunctionObjs = functionObjs.reverse();
  //     reversedFunctionObjs.map((functionObj) => {
  //       this.setState({ functions: this.state.functions.concat([functionObj]) });
  //     });
  //   });
  // }

  addNewFunction = (functionObj) => {
    this.setState({
      functions: [functionObj].concat(this.state.functions),
    });
  };

  render() {
    let functionsList = null;
    const hasFunctions = this.state.functions.length !== 0;
    if (hasFunctions) {
      functionsList = this.state.functions.map((functionObj) => (
        <SingleFunction
          _id={functionObj._id}
          creator_name={functionObj.creator_name}
          exp={functionObj.exp}
          leftRange={functionObj.leftRange}
          rightRange={functionObj.rightRange}
        />
      ));
    } else {
      functionsList = <div></div>;
    }
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
        <NewFunctionInput defaultText="" addNewFunction={this.addNewFunction} /> 
        {functionsList}
        <GraphingPanel functions = {this.state.functions}/>
      </>
    );
  }
}

export default Skeleton;
