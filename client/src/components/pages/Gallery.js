import React, { Component } from "react";
import "../../utilities.css";
import { get } from "../../utilities";


class Gallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      works: []
    }
  }
  componentDidMount() {
    document.title = "Gallery";
    get("/api/works").then((workObjs) => {
      let reversedWorkObjs = workObjs.reverse();
      reversedWorkObjs.map((workObj) => {
        this.setState({ works: this.state.works.concat([workObj]) });
      });
    });
  }
  render() {
    let worksList = null;
    const hasWorks = this.state.works.length !== 0;
    if (hasWorks) {
      worksList = this.state.works.map((workObj) => (
        <img src = {`data:image/png;base64,${workObj.data}`} alt="a"/>
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

export default Gallery;