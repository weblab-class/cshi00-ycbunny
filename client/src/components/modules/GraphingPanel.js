import React, { Component } from "react";
import { Redirect } from "@reach/router";
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
      this.redirect = false
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
      console.log(this.props.workId);
      post("/api/saveBoard", {board: board, workId: this.props.workId});
    };
  
    handleSave = () => {
      const base64 = this.state.board.renderer.canvasRoot.toDataURL()
      sessionStorage.setItem("image", base64);
      this.saveImage(base64);
      this.setState({redirect: true});
    };

    create = (func) => {
      if (func.mode === "cartesian"){
        this.state.board.create('curve', [function(t){return t;},
          function(t){return math.evaluate(func.exp,{x:t});}, Number(func.leftRange), 
            Number(func.rightRange)], { strokeColor: '#aa2233', strokeWidth: 3 })
      }
      if (func.mode === "polar"){
        this.state.board.create('curve', [function(t){return math.evaluate(func.exp,{theta:t});},
          [Number(func.origin[1]), Number(func.origin[4])],Number(func.leftRange),Number(func.rightRange)], { strokeColor: '#aa2233', strokeWidth: 3 })
      }
    }

    render () {
      if (this.state.redirect){
        return <Redirect push to="/draw"/>;
      }
      let style = assign(this.defaultStyle, this.props.style || {})
      if (this.state.board !== null && this.props.functions.length>0 && this.state.initialGraphingFinished ===false) {
        this.state.board.suspendUpdate();
        this.props.functions.map((functionObj) => (
        this.curveDic[functionObj._id] = this.create(functionObj)));
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
          this.curveDic[newCurve[0]._id] = this.create(newCurve[0]);
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
        Save & Continue to Coloring
        </button>
        </>
        )
      }
    }

   export default GraphingPanel;