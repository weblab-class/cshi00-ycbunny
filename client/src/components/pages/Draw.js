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
    // if (background == null){
    //   background = localStorage.getItem("workId");
    //   get("/api/imageforcoloring", {workId: localStorage.getItem('workId')}).then((img) => {
    //   background = `data:image/png;base64,${img.data}`
    //   console.log(background)
    //   });
    // }
    this.setState({ background: background});
  }

  handleChangeComplete = (color, event) => {
    this.setState({ color: color.hex });
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
    canvas.getContext('2d').drawImage(background, 0, 0);
    canvas.getContext('2d').globalAlpha = 1.0; 
    canvas.getContext('2d').drawImage(drawing, 0, 0);

    const dataUri = canvas.toDataURL('image/jpeg', 1.0);
    const data = dataUri.split(',')[1];
    const mimeType = dataUri.split(';')[0].slice(5);

    const bytes = window.atob(data);
    const buf = new ArrayBuffer(bytes.length);
    const arr = new Uint8Array(buf);

    for (let i = 0; i < bytes.length; i++) {
        arr[i] = bytes.charCodeAt(i);
    }

    const blob = new Blob([arr], { type: mimeType });
    return { blob: blob, dataUri: dataUri };
  }

  saveImage = (blob, filename) => {
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
        <button
          onClick={() => {
            // let baseCanvas = this.saveableCanvas.canvasContainer.children[3]; // canvas with background image
            // let baseCanvasContex = this.saveableCanvas.getContext('2d');
            // baseCanvasContex.drawImage(canvasRef.current.canvasContainer.children[1], 0, 0); // add drawing
            // console.log(baseCanvas.toDataURL());
            // return baseCanvas.toDataURL(); // or whatever
            this.saveImage(this.combineDrawing(this.saveableCanvas).blob, 'yeah')}}
        > Finished
        </button> 
      </div>
    );
  }
}

export default Draw;