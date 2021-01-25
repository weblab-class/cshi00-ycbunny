import React, { Component } from "react";
import { create, all } from 'mathjs';
import JXG from 'jsxgraph';
import assign from 'lodash/assign';
import { post } from "../../utilities";

const math = create(all)
  class GraphingPanel extends Component {
    constructor(props) {
      super(props);
      this.id = 'board_' + Math.random().toString(36).substr(2, 9)
      this.state = { board: null,  initialGraphingFinished: false}
      this.defaultStyle = { width: 500, height: 500 }
      this.defauflboardAttributes = { axis: true, boundingbox: [-12, 10, 12, -10], showScreenshot: true,  renderer: 'canvas' }
      this.curveDic = {}
    };
  
    componentDidMount() {
      // now that div exists, create new JSXGraph board with it
      let attributes = {}
      Object.assign(attributes, this.defauflboardAttributes, this.props.boardAttributes || {})
      JXG.JSXGraph.renderer = 'canvas';
      let board = JXG.JSXGraph.initBoard(this.id, attributes)
      board.suspendUpdate();
      this.setState({
        board: board
      })
    }

    saveImage = (board) => {
      post("/api/saveBoard", {functions: this.props.functions});
    };
  
    handleSave = (event) => {
      event.preventDefault();
      this.saveImage(this.state.board.renderer.canvasRoot.toDataURL());
    };

    render () {
      let style = assign(this.defaultStyle, this.props.style || {})
      if (this.state.board !== null && this.props.functions.length>0 && this.state.initialGraphingFinished ===false) {
        this.state.board.suspendUpdate();
        this.props.functions.map((functionObj) => (
        this.curveDic[functionObj._id] = this.state.board.create('curve', [function(t){return t;},
          function(t){return math.evaluate(functionObj.exp,{x:t});}, Number(functionObj.leftRange), Number(functionObj.rightRange)], { strokeColor: '#aa2233', strokeWidth: 3 })
        ));
        this.state.board.unsuspendUpdate()
        this.setState({
          initialGraphingFinished:true
        })
        let pic = this.state.board.renderer.canvasRoot.toDataURL();
      }
      if (this.state.initialGraphingFinished ===true){
        let currentCurves = Object.keys(this.curveDic);
        let newCurves = this.props.functions.map((functionObj) => (
          functionObj._id
          ));
        let newCurve = this.props.functions.filter((functionObj) => (this.curveDic[functionObj._id]==null));
        let remove = currentCurves.filter(f => !newCurves.includes(f))
        if (newCurve !== null && newCurve.length !== 0){
          this.curveDic[newCurve[0]._id] = this.state.board.create('curve', [function(t){return t;},
          function(t){return math.evaluate(newCurve[0].exp,{x:t});}, Number(newCurve[0].leftRange), Number(newCurve[0].rightRange)], { strokeColor: '#aa2233', strokeWidth: 3 });
        }
        else if (remove !== null && remove.length !== 0) {
          this.state.board.removeObject(this.curveDic[remove[0]]);
          delete this.curveDic[remove[0]];
        }
      }
      return (
        <>
          <div id={this.id} className={'jxgbox ' + this.props.className} style={style} />
          <button
          type="submit"
          className="NewPostInput-button u-pointer"
          value="Submit"
          onClick={this.handleSave}
        >
        Save
        </button>
        </>
        )
      }
    }

   export default GraphingPanel;