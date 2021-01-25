import React, { Component } from "react";
import GraphingPanel from "../modules/GraphingPanel.js";
import NewFunctionInput from "../modules/NewFunctionInput.js";
import SingleFunction from "../modules/SingleFunction.js";


import { get } from "../../utilities";
import "../../utilities.css";
import "./Create.css";


class Create extends Component {
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
       <div className="Create-title">
          <h1>Let's start creating!</h1>
          <p>Enter math functions to draw your graphito! (yes, the singular version of graffiti is graffito) :D.</p>
       </div>
       <div className="page-layout">
        <div className="graph-panel">
        <GraphingPanel functions = {this.state.functions}/> 
        </div>
        <div className="function-input">
        <NewFunctionInput defaultText="" addNewFunction={this.addNewFunction} /> 
        {functionsList}
        </div>
       </div>
      </>
    );
  }
}

export default Create;