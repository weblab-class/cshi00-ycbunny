import React, { Component } from "react";
import "../../utilities.css";
import { get, post } from "../../utilities";
import { Link } from "@reach/router";
import { Redirect } from "@reach/router";

class FinishedWorks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      works: [],
      redirect: false
    }
  }

  componentDidMount() {
    get("/api/myworks").then((workObjs) => {
      let reversedWorkObjs = workObjs.reverse();
      reversedWorkObjs.map((workObj) => {
        this.setState({ works: this.state.works.concat([workObj]) });
      });
    });
  }
  

  handleDelete = (event) => {
    event.preventDefault();
    post("/api/worksdelete", {id: event.target.value});
  };

  render() {
    let worksList = null;
    const hasWorks = this.state.works.length !== 0;
    if (hasWorks) {
      worksList = this.state.works.map((workObj) => (
        <div>
            <img src = {`data:image/png;base64,${workObj.data}`} alt="a"/>
            <button
                type="submit"
                className="NewPostInput-button u-pointer"
                value= {workObj._id}
                onClick={this.handleDelete}
                >
                Delete
            </button>
        </div>
      ));
    } else {
      worksList = <div>Waiting for your creativity...</div>;
    }
    return (
      <div>
        <h1>Graphiti Wall</h1>
        {worksList}
      </div>
    );
  }
}

export default FinishedWorks;