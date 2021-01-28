import React, { Component } from "react";
import "../../utilities.css";
import { get, post } from "../../utilities";
import { Link } from "@reach/router";
import { Redirect } from "@reach/router";
import "./SavedWorks.css";

class SavedWorks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      works: [],
      redirect: false
    }
  }

  handleEdit = (workId) => {
    var n = workId.target.value.indexOf(",");
    localStorage.setItem("workId", workId.target.value.slice(0,n));
    localStorage.setItem("character", workId.target.value.slice(n+1));
    console.log(workId.target.value.slice(0,n))
    this.setState({redirect: true});
  };

  handleDelete = (event) => {
    this.setState({
      works: this.state.works.filter((work) => (
        work.workId!=event.target.value))
    });
    post("/api/sdelete", {workId: event.target.value});
  };

  componentDidMount() {
    get("/api/savedworks").then((workObjs) => {
      let reversedWorkObjs = workObjs.reverse();
      reversedWorkObjs.map((workObj) => {
        this.setState({ works: this.state.works.concat([workObj]) });
      });
    });
  }

  render() {
    console.log(this.state.works)
    if (this.state.redirect === true){
        return <Redirect push to="/graph/"/>;
    }
    let worksList = null;
    const hasWorks = this.state.works.length !== 0;
    if (hasWorks) {
      worksList = this.state.works.map((workObj) => (
        <div className="Saved-container">
            <img src = {`data:image/png;base64,${workObj.data}`} alt="a"/>
            <div>
            <button
                type="submit"
                className="NewPostInput-button u-pointer u-bold"
                value= {[workObj.workId, workObj.character]}
                onClick={this.handleEdit}
                >
                Edit & Color
            </button>
            <button
                type="submit"
                className="NewPostInput-button u-pointer u-bold"
                value= {workObj.workId}
                onClick={this.handleDelete}
                >
                Delete
            </button>
            </div>
        </div>
      ));
    } else {
      worksList = <div className="Mywork-titletext">Waiting for your creativity...</div>;
    }
    return (
      <div>
        <div className="Mywork-titletext">
        <h1>Saved Graphs</h1>
        </div>
        <div className="u-flex-justifyCenter u-flex u-flexWrap"> 
        {worksList}
        </div>
      </div>
    );
  }
}

export default SavedWorks;