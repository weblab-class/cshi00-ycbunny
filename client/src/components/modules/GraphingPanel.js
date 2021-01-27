import React, { Component } from "react";
import { Redirect } from "@reach/router";
import { create, all } from 'mathjs';
import JXG from 'jsxgraph';
import assign from 'lodash/assign';
import { post } from "../../utilities";
import { Link, DirectLink, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll';
import CHARACTERS from './Characters';
import HALFCHARACTERS from './halfCharacters';


const math = create(all)
  class GraphingPanel extends Component {
    constructor(props) {
      super(props);
      this.id = 'board_' + Math.random().toString(36).substr(2, 9)
      this.state = { board: null,  initialGraphingFinished: false}
      this.defaultStyle = { width: 500, height: 500 }
      this.defauflboardAttributes = { axis: true, boundingbox: [-15, 15, 15, -15], 
        showScreenshot: true,  renderer: 'canvas',
        showCopyright: false }
      this.curveDic = {}
      this.redirect = false
      this.background = ""
    };

    scrollToWithContainer(func) {
  
      let goToContainer = new Promise((resolve, reject) => {
  
        Events.scrollEvent.register('end', () => {
          resolve();
          Events.scrollEvent.remove('end');
        });
  
        scroller.scrollTo('scroll-container', {
          duration: 80,
          delay: 0,
          smooth: 'easeInOutQuart'
        });
  
      });
  
      goToContainer.then(() =>
        scroller.scrollTo(func, {
          duration: 800,
          delay: 0,
          smooth: 'easeInOutQuart',
          containerId: 'scroll-container'
        }));
    }
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
      var image = board.create('image',[HALFCHARACTERS[localStorage.getItem('character')], [-15,-15], [30,30] ]);
      this.setState({background: image});
    }

    saveImage = (board) => {
      let c = localStorage.getItem('character')
      post("/api/saveBoard", {board: board, workId: this.props.workId, char: c});
    };
  
    handleSave = () => {
      this.state.board.removeObject(this.state.background);
      this.state.board.setBoundingBox([-15, 15, 15, -15]);
      const base64 = this.state.board.renderer.canvasRoot.toDataURL();
      sessionStorage.setItem("image", base64);
      this.saveImage(base64);
      this.setState({redirect: true});
    };

    create = (func) => {
      if (func.mode === "cartesian"){
        return (this.state.board.create('curve', [function(t){return t;},
          function(t){return math.evaluate(func.exp,{x:t});}, math.evaluate(func.leftRange), 
          math.evaluate(func.rightRange)], { strokeColor: '#000000', strokeWidth: 7 }))
      }
      if (func.mode === "polar"){
        return(this.state.board.create('curve', [function(t){return math.evaluate(func.exp,{theta:t});},
          [Number(func.origin[1]), Number(func.origin[4])],math.evaluate(func.leftRange),math.evaluate(func.rightRange)], { strokeColor: '#000000', strokeWidth: 7 }))
      }
    }
    
    render () {
      if (this.state.redirect){
        return <Redirect push to="/color/"/>;
      }
      let style = assign(this.defaultStyle, this.props.style || {})
      if (this.state.board !== null && this.props.functions.length>0 && this.state.initialGraphingFinished ===false) {
        this.state.board.suspendUpdate();
        this.props.functions.map((functionObj) => (
          this.curveDic[functionObj._id] = this.create(functionObj)));
        var keys = Object.keys(this.curveDic);
        let changePosition = this.props.changePosition;
        let dic = this.curveDic;
        let scrollToWithContainer = this.scrollToWithContainer
        keys.forEach(function(key){
          dic[key].on('mousedown', function () {
            // changePosition(key);
            scrollToWithContainer("s"+key+"k")
          })
        });
        this.state.board.unsuspendUpdate()
        this.setState({
          initialGraphingFinished:true
        })
      }
      if (this.state.initialGraphingFinished ===true){
        let currentCurves = Object.keys(this.curveDic);
        let newCurves = this.props.functions.map((functionObj) => (
          functionObj._id
          ));
        let newCurve = this.props.functions.filter((functionObj) => (this.curveDic[functionObj._id]==null));
        let remove = currentCurves.filter(f => !newCurves.includes(f))
        if (newCurve !== null && newCurve.length !== 0){
          let c = this.create(newCurve[0]);
          let changePosition = this.props.changePosition
          c.on('mousedown', function () {
            changePosition(newCurve[0]._id)
          });
          this.curveDic[newCurve[0]._id] = c;
        }
        else if (remove !== null && remove.length !== 0) {
          console.log(remove[0]);
          this.state.board.removeObject(this.curveDic[remove[0]]);
          delete this.curveDic[remove[0]];
        }
      }
      return (
        <>
          <div id={this.id} className={'jxgbox ' + this.props.className} style={style} />
          <button
          type="submit"
          className="NewPostInput-button u-pointer u-bold"
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