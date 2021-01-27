import React, { Component } from "react";
import GraphingPanel from "../modules/GraphingPanel.js";
import NewFunctionInput from "../modules/NewFunctionInput.js";
import SingleFunction from "../modules/SingleFunction.js";
import ScrollBar from "../modules/ScrollBar.js";

import { get } from "../../utilities";
import "../../utilities.css";
import "./Create.css";


class Create extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    let workId = localStorage.getItem('workId');
    this.state = {
      workId: workId,
      functions: [],
      mode: "cartesian",
      position: ""
    };
  }

  componentDidMount() {
    get("/api/functions", {workId: this.state.workId}).then((functionObjs) => {
      this.setState({ functions: functionObjs.reverse() });
    });
    localStorage.setItem('progress', "/graph/");
  }

  addNewFunction = (functionObj) => {
    this.setState({
      functions: [functionObj].concat(this.state.functions),
    });
  };

  changeBetweenCartPolar = () => {
    this.setState({
      mode: (this.state.mode === 'cartesian') ? 'polar' : 'cartesian',
    });
  };

  deleteOldFunction = (id) => {
    this.setState({
      functions: this.state.functions.filter((functionObj) => (
        functionObj._id!=id))
    });
  };

  changePosition = (func) => {
    this.setState({
      position: func
    });
  };

  render() {
    return (
      <>
      <div className="streamline-bar-create"/>
       <div className="Create-top">
        <div className="u-bold Create-title">Let's start creating!</div>
        <p>Enter math functions to draw your graphito! (yes, the singular version of graffiti is graffito) :D.</p>
        <p>Note: click on a graph and the corresponding function will be scrolled to the top! </p>
       </div>
        <div className="page-layout">
          <div className="graph-panel">
            <GraphingPanel functions = {this.state.functions} workId ={this.state.workId} mode = {this.state.mode} changePosition = {this.changePosition}/> 
          </div>
          <div className="function-input">
            <div className="function-and-button">
              <NewFunctionInput defaultText="" addNewFunction = {this.addNewFunction} changeBetweenCartPolar = {this.changeBetweenCartPolar} workId = {this.state.workId} mode = {this.state.mode}/> 
            </div>
            <div className="functionBox" id="scroll-container"> 
              <ScrollBar functions={this.state.functions} position = {this.state.position} deleteOldFunction = {this.deleteOldFunction}/>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Create;