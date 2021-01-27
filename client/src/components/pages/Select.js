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
    sessionStorage.setItem("character", char);
    this.setState({redirect: true});
  }
  render() {
    if (this.state.redirect === true){
      return <Redirect push to="/create"/>;
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