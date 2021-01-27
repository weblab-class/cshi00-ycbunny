import React, { Component } from "react";
import "../../utilities.css";
import { get } from "../../utilities";
import { Link } from "@reach/router";
import { Redirect } from "@reach/router";
import CHARACTERS from "../modules/Characters";

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
    {this.state.keys.map((key) => (
      <button
          type="submit"
          className="NewPostInput-button u-pointer"
          value="Submit"
          onClick={()=>{return this.handleStartNew(key)}}
        >
          <img src = {CHARACTERS[key]}/>
        </button>
        ))}
    </div>
    )
  }  
}

export default Select;