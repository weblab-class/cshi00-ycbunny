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
    let workId = localStorage.getItem('workId');
    if (workId == null){
      localStorage.setItem('workId', "0");
      workId = "0";
    }
    this.state = {
      workId: workId,
      functions: [],
      mode: "cartesian"
    };
  }

  componentDidMount() {
    console.log(this.state.workId);
    get("/api/functions", {workId: this.state.workId}).then((functionObjs) => {
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
        <div>
          <SingleFunction
            _id={functionObj._id}
            creator_name={functionObj.creator_name}
            workId = {functionObj.workId}
            exp={functionObj.exp}
            leftRange={functionObj.leftRange}
            rightRange={functionObj.rightRange}
            deleteOldFunction={this.deleteOldFunction}
            mode={functionObj.mode}
            origin={functionObj.origin}
          />
        </div>
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
            <GraphingPanel functions = {this.state.functions} workId ={this.state.workId} mode = {this.state.mode}/> 
          </div>
          <div className="function-input">
            <div className="function-and-button">
              {/* <button
                type="submit"
                className="NewPostInput-button u-pointer"
                value="Submit"
                onClick={()=>{this.setState({mode: (this.state.mode === 'cartesian') ? 'polar' : 'cartesian'})}}
              >
              change
              </button> */}
              <NewFunctionInput defaultText="" addNewFunction = {this.addNewFunction} workId = {this.state.workId} mode = {this.state.mode}/> 
            </div>
            <div className="functionBox">
              {functionsList}
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Create;