import React, { Component } from "react";
import "../../utilities.css";
import { get } from "../../utilities";
import { Link } from "@reach/router";
import { Redirect } from "@reach/router";
import CHARACTERS from "../modules/Characters";
import "./Select.css";
import "../../utilities.css";

class Select extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      keys: Object.keys(CHARACTERS)
    }
  }
  handleStartNew = (char) => {
    localStorage.setItem("character", char);
    this.setState({redirect: true});
  }
  render() {
    if (this.state.redirect === true){
      let totalWork = localStorage.getItem('totalWork');
      if (totalWork == null){
        localStorage.setItem('totalWork', "1");
        localStorage.setItem('workId', "1");
      }
      else{
        localStorage.setItem('totalWork', String(Number(totalWork)+1));
        localStorage.setItem('workId', String(Number(totalWork)+1));
      }
      return <Redirect push to="/graph/"/>;
    }
  return (
    <div>
      <div className="Gallery-titletext">
          <h1>Pick a Character</h1>
          <p>Select a cartoon to use as reference. If you are feeling extra creative, choose the first option and design your character from scratch! </p>
      </div>
    {this.state.keys.map((key) => (
      <button
          type="submit"
          className="character-button organization u-pointer"
          value="Submit"
          onClick={()=>{return this.handleStartNew(key)}}
        >
          <img src = {CHARACTERS[key]}/>
          <div className="character-name u-bold">{key}</div>
        </button>
        ))}
    </div>
    )
  }  
}

export default Select;