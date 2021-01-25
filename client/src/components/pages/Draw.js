import React, { Component } from "react";
import { Redirect } from "@reach/router";
import "../../utilities.css";
import { render } from "react-dom";
import CanvasDraw from "react-canvas-draw";
import classNames from "./Draw.css";
import { CirclePicker } from 'react-color';
import { get } from "../../utilities";


class Draw extends Component {
  state = {
    color: "#ffc600",
    width: 400,
    height: 400,
    brushRadius: 10,
    lazyRadius: 0,
    background: null,
  };
  componentDidMount() {
    let background = sessionStorage.getItem("image");
    if (background === null){
      background = localStorage.getItem("workId");
      get("/api/imageforcoloring", {workId: localStorage.getItem('workId')}).then((img) => {
      background = `data:image/png;base64,${img.data}`
      });
    }
    this.setState({ background: background});
  }

  handleChangeComplete = (color, event) => {
    this.setState({ color: color.hex });
  };

  render() {
    return (
      <div>
        <h1>React Canvas Draw</h1>
        <p>Try it out! Draw something, hit "Save" and then "Load".</p>
        <CirclePicker onChangeComplete={ this.handleChangeComplete } />
        <div className={classNames.tools}>
          <button
            onClick={() => {
              localStorage.setItem(
                "savedDrawing",
                this.saveableCanvas.getSaveData()
              );
            }}
          >
            Save
          </button>
          <button
            onClick={() => {
              this.saveableCanvas.clear();
            }}
          >
            Clear
          </button>
          <button
            onClick={() => {
              this.saveableCanvas.undo();
            }}
          >
            Undo
          </button>
          <div>
            <label>Width:</label>
            <input
              type="number"
              value={this.state.width}
              onChange={e =>
                this.setState({ width: parseInt(e.target.value, 10) })
              }
            />
          </div>
          <div>
            <label>Height:</label>
            <input
              type="number"
              value={this.state.height}
              onChange={e =>
                this.setState({ height: parseInt(e.target.value, 10) })
              }
            />
          </div>
          <div>
            <label>Brush-Radius:</label>
            <input
              type="number"
              value={this.state.brushRadius}
              onChange={e =>
                this.setState({ brushRadius: parseInt(e.target.value, 10) })
              }
            />
          </div>
          <button
          onClick={() => {
            this.setState({ color: "#FFFFFF"}
            );
          }}
        > Eraser
        </button>  
        </div>
        <CanvasDraw
          hideGrid
          ref={canvasDraw => (this.saveableCanvas = canvasDraw)}
          brushColor={this.state.color}
          brushRadius={this.state.brushRadius}
          lazyRadius={this.state.lazyRadius}
          canvasWidth={this.state.width}
          canvasHeight={this.state.height}
          erase={this.state.erase}
          imgSrc = {this.state.background}
          saveData = {localStorage.getItem("savedDrawing")}
        />
      </div>
    );
  }
}

export default Draw;