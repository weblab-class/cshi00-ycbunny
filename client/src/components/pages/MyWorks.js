import React, { Component } from "react";
import "../../utilities.css";
import { get } from "../../utilities";
import { Link } from "@reach/router";
import { Redirect } from "@reach/router";
import "./MyWorks.css";
import FinishedWorks from "../modules/FinishedWorks.js";
import SavedWorks from "../modules/SavedWorks.js";



class MyWorks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      works: [],
      redirect: false
    }
  }

  handleEdit = (workId) => {
    localStorage.setItem("workId", workId.target.value.workId);
    localStorage.setItem("character", workId.target.value.character);
    this.setState({redirect: true});
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
    if (this.state.redirect === true){
        return <Redirect push to="/graph/"/>;
    }
    let worksList = null;
    const hasWorks = this.state.works.length !== 0;
    if (hasWorks) {
      worksList = this.state.works.map((workObj) => (
        <div className="Eachwork">
            <img src = {`data:image/png;base64,${workObj.data}`} alt="a"/>
            <button
                type="submit"
                className="NewPostInput-button u-pointer"
                value= {{workId: workObj.workId, character: workObj.character}}
                onClick={this.handleEdit}
                >
                Edit & Color
            </button>
        </div>
      ));
    } else {
      worksList = <div>Waiting for your creativity...</div>;
    }
    return (<>
      <FinishedWorks/>
      <SavedWorks/>
      </>
    );
  }
}

export default MyWorks;