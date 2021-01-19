import React, { Component } from "react";
import JXGBoard, { parser } from 'jsxgraph-react-js';
import { create, all } from 'mathjs';

// create a mathjs instance
const math = create(all)
  class GraphingPanel extends Component {
    constructor(props) {
      super(props);
      };
  

    render () {
      parser = (string) => {
        return math.compile
        };
      let logicJS = (brd) => {
        brd.suspendUpdate();
        //var a = brd.create('slider', [[2, 8], [6, 8], [0, 3, 6]], { name: 'a' });
        //var b = brd.create('slider', [[2, 7], [6, 7], [0, 2, 6]], { name: 'b' });
        //var A = brd.create('slider', [[2, 6], [6, 6], [0, 3, 6]], { name: 'A' });
        //var B = brd.create('slider', [[2, 5], [6, 5], [0, 3, 6]], { name: 'B' });
        //var delta = brd.create('slider', [[2, 4], [6, 4], [0, 0, Math.PI]], { name: '&delta;' });
        //var i;
        //this.props.functions.length
        // for (i = 0; i < this.props.functions.length; i++) { 
        //       let ii = i;
        //       setTimeout(function(){
        //         brd.create('functiongraph', [function(x){return ii*x;}, 2, 5], { strokeColor: '#aa2233', strokeWidth: 3, fixed: true}, );
        //         },100);
        // };
        this.props.functions.map((functionObj) => (
          brd.create('curve', [function(t){return t;},
            function(t){return math.evaluate(functionObj.exp,{x:t});}, functionObj.leftRange, functionObj.rightRange], { strokeColor: '#aa2233', strokeWidth: 3 })
        ));
        brd.unsuspendUpdate();
      }
      return (
        <>
          <JXGBoard
            logic={logicJS}
            boardAttributes={{ axis: true, boundingbox: [-12, 10, 12, -10] }}
            style={{
              border: "3px solid red"
            }}
          />
        </>
      )
    }
  }

  export default GraphingPanel;