import React, { Component } from "react";
import NavBar from "./modules/NavBar.js";
import { Router } from "@reach/router";
import NotFound from "./pages/NotFound.js";
import Skeleton from "./pages/Skeleton.js";
import Draw from "./pages/Draw.js";
import Select from "./pages/Select.js"

import "../utilities.css";

import { socket } from "../client-socket.js";

import { get, post } from "../utilities";
import Create from "./pages/Create.js";
import Gallery from "./pages/Gallery.js";
import Resource from "./pages/Resource.js";
import MyWorks from "./pages/MyWorks.js";

/**
 * Define the "App" component as a class.
 */
class App extends Component {
  // makes props available in this component
  constructor(props) {
    super(props);
    this.state = {
      userId: undefined,
    };
  }

  componentDidMount() {
    get("/api/whoami").then((user) => {
      if (user._id) {
        // they are registed in the database, and currently logged in.
        this.setState({ userId: user._id });
      }
    });
  }

  handleLogin = (res) => {
    console.log(`Logged in as ${res.profileObj.name}`);
    const userToken = res.tokenObj.id_token;
    post("/api/login", { token: userToken }).then((user) => {
      this.setState({ userId: user._id });
      post("/api/initsocket", { socketid: socket.id });
    });
  };

  handleLogout = () => {
    this.setState({ userId: undefined });
    post("/api/logout");
  };

  render() {
    return (
      <>
        <NavBar
          handleLogin={this.handleLogin}
          handleLogout={this.handleLogout}
          userId={this.state.userId}
        />
        <Router>
          <Skeleton
            path="/"
            handleLogin={this.handleLogin}
            handleLogout={this.handleLogout}
            userId={this.state.userId}
          />
          <Create
           path="/create/"
           handleLogin={this.handleLogin}
           handleLogout={this.handleLogout}
           userId={this.state.userId}
          />
          <Gallery
           path="/gallery/"
           handleLogin={this.handleLogin}
           handleLogout={this.handleLogout}
           userId={this.state.userId}
          />

          <Resource
           path="/resource/"
           handleLogin={this.handleLogin}
           handleLogout={this.handleLogout}
           userId={this.state.userId}
          />

          <Draw
            path="/draw/"
            handleLogin={this.handleLogin}
            handleLogout={this.handleLogout}
            userId={this.state.userId}
          />
          <MyWorks
            path="/myworks/"
            handleLogin={this.handleLogin}
            handleLogout={this.handleLogout}
            userId={this.state.userId}
          />
          <Select
            path="/select/"
            handleLogin={this.handleLogin}
            handleLogout={this.handleLogout}
            userId={this.state.userId}
          />
          <NotFound default />
        </Router>
      </>
    );
  }
}

export default App;
