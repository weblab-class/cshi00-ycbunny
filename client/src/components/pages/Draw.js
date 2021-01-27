import React, { Component } from "react";
import { Redirect } from "@reach/router";
import "../../utilities.css";
import { render } from "react-dom";
import CanvasDraw from '../modules/index';
import classNames from "./Draw.css";
import { CirclePicker } from 'react-color';
import { post } from "../../utilities";


class Draw extends Component {
  state = {
    color: "#ffc600",
    width: 500,
    height: 500,
    brushRadius: 5,
    lazyRadius: 0,
    background: null,
    erase: false,
    background: sessionStorage.getItem("image")
  };
  componentDidMount() {
    localStorage.setItem('progress', "/color/");
  }


  handleChangeComplete = (color, event) => {
    this.setState({ color: color.hex });
    this.setState({erase: false})
  };

  combineDrawing = (canvasRef) => {
    const width = canvasRef.props.canvasWidth;
    const height = canvasRef.props.canvasHeight;
    const background = canvasRef.canvasContainer.children[3]; 
    const drawing = canvasRef.canvasContainer.children[1]; 
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;

    // composite now
    canvas.getContext('2d').drawImage(drawing, 0, 0);
    canvas.getContext('2d').globalAlpha = 1.0; 
    canvas.getContext('2d').drawImage(background, 0, 0);

    const dataUri = canvas.toDataURL("image/png", 1.0);
    const data = dataUri.split(',')[1];
    const mimeType = dataUri.split(';')[0].slice(5);

    const bytes = window.atob(data);
    const buf = new ArrayBuffer(bytes.length);
    const arr = new Uint8Array(buf);

    for (let i = 0; i < bytes.length; i++) {
        arr[i] = bytes.charCodeAt(i);
    }
    post("/api/publish", {image: dataUri});
    const blob = new Blob([arr], { type: mimeType });
    return { blob: blob, dataUri: dataUri };
  }

  saveImage = (blob, filename) => {
    localStorage.setItem('character', '');
    localStorage.setItem('progress', "/select/");
    const a = document.createElement('a');
    document.body.appendChild(a);
    a.style = 'display: none';

    const url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
  }

  render() {
    return (
      <div>
        <div className="streamline-bar-create"/>
        <div className="Draw-title">
          <h1>React Canvas Draw</h1>
          <p>Try it out! Draw something, hit "Save" and then "Load".</p>
        </div>
      <div className="page-layout">
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
          immediateLoading = {true}
          saveData = {localStorage.getItem("savedDrawing")}
          className="drawing-panel"
        />
    <div className="rightside">
      <div className="colorSelectBox">
        <div className="colordots">
        <CirclePicker onChangeComplete={ this.handleChangeComplete } 
        />
        </div>
        <button
          className = "Draw-button eraser-container"
          onClick={() => {
            this.setState({ erase: (this.state.erase === true) ? false : true }
            );
          }}
        > Eraser
        </button> 
            <label>Brush-Radius: </label>
            <input
              className="brush-radius"
              type="number"
              value={this.state.brushRadius}
              onChange={e =>
                this.setState({ brushRadius: parseInt(e.target.value, 10) })
              }
            />
        <div className={classNames.tools}>
          <button
            className = "Draw-button"
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
            className = "Draw-button"
            onClick={() => {
              this.saveableCanvas.clear();
            }}
          >
            Clear
          </button>
          <button
            className = "Draw-button"
            onClick={() => {
              this.saveableCanvas.undo();
            }}
          >
            Undo
          </button>
        </div>
      </div>
        <button
          className = "Draw-button finish-container"
          onClick={() => {
            this.saveImage(this.combineDrawing(this.saveableCanvas).blob, 'yeah')}}
        > Finished
        </button> 
        </div>
        </div>
      </div>
    );
  }
}

export default Draw;