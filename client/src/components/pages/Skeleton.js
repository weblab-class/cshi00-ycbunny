import React, { Component } from "react";
import GraphingPanel from "../modules/GraphingPanel.js";
import NewFunctionInput from "../modules/NewFunctionInput.js";
import SingleFunction from "../modules/SingleFunction.js";
import NavBar from "../modules/NavBar.js";


import { get } from "../../utilities";
import "../../utilities.css";
import "./Skeleton.css";

//TODO: REPLACE WITH YOUR OWN CLIENT_ID
const GOOGLE_CLIENT_ID = "511281853920-t004vd2ldi1trng5tj06ubin80bm6j1h.apps.googleusercontent.com";

class Skeleton extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    this.state = {
      functions: []
    };
  }

  componentDidMount() {
    document.title = "Home";
    get("/api/functions").then((functionObjs) => {
      this.setState({ functions: functionObjs.reverse() });
    });
  }

  addNewFunction = (functionObj) => {
    this.setState({
      functions: [functionObj].concat(this.state.functions),
    });
  };

  deleteOldFunction = (id) => {
    this.setState({
      functions: this.state.functions.filter((functionObj) => (
        functionObj._id!=id))
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
          deleteOldFunction={this.deleteOldFunction}
        />
      ));
    } else {
      functionsList = <div></div>;
    }
    return (
      <>
    <div className="Grid-background">
        <div className = "Graphiti-logo"/>
        <section class="u-textCenter">
          <p> Embrace your inner artsy, math nerd and make drawings with function graphs! Graphiti away!</p>
        </section>
        <section class="u-textCenter">
         <a href="/create/:userId" className="Get-started">Start Creating!</a>
        </section>
    </div>
      </>
    );
  }
}

export default Skeleton;
