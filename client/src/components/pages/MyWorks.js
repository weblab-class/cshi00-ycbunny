import React, { Component } from "react";
import "../../utilities.css";
import { get } from "../../utilities";
import { Link } from "@reach/router";
import { Redirect } from "@reach/router";


class MyWorks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      works: [],
      redirect: false
    }
  }

  handleColor = (e) => {
    localStorage.setItem("workId", e.target.value.workID);
    localStorage.removeItem('savedDrawing');
    sessionStorage.setItem("image", `data:image/png;base64,${e.target.value.image}`);
    this.setState({redirect: "color"});
  };
  handleEdit = (workId) => {
    localStorage.setItem("workId", workId.target.value);
    this.setState({redirect: "edit"});
  };
  componentDidMount() {
    document.title = "My Works";
    get("/api/myworks").then((workObjs) => {
      let reversedWorkObjs = workObjs.reverse();
      reversedWorkObjs.map((workObj) => {
        this.setState({ works: this.state.works.concat([workObj]) });
      });
    });
  }
  render() {
    console.log(this.state.works)
    if (this.state.redirect === "color"){
        return <Redirect push to="/draw"/>;
      }
    if (this.state.redirect === "edit"){
        return <Redirect push to="/create"/>;
    }
    let worksList = null;
    const hasWorks = this.state.works.length !== 0;
    if (hasWorks) {
      worksList = this.state.works.map((workObj) => (
        <div>
            <img src = {`data:image/png;base64,${workObj.data}`} alt="a"/>
            <button
                type="submit"
                className="NewPostInput-button u-pointer"
                value= {workObj.workId}
                onClick={this.handleEdit}
                >
                Edit
            </button>
            <button
                type="submit"
                className="NewPostInput-button u-pointer"
                value= {{workId: workObj.workId, image: workObj.data}}
                onClick={this.handleColor}
                >
                Color
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

export default MyWorks;