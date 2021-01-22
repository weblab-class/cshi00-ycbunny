import React, { Component } from "react";
import JXGBoard from '../modules/JSXGraphSrc.js'

import "../../utilities.css";

let logicJS = (brd) => {
  brd.suspendUpdate();
  //var a = brd.create('slider', [[2, 8], [6, 8], [0, 3, 6]], { name: 'a' });
  var A = brd.create('slider', [[2, 7], [6, 7], [0, 2, 6]], { name: 'A' });
  var B = brd.create('slider', [[2, 6], [6, 6], [0, 3, 6]], { name: 'B'});
  var C = brd.create('slider', [[2, 5], [6, 5], [0, 3, 6]], { name: 'C' });
  //var delta = brd.create('slider', [[2, 4], [6, 4], [0, 0, Math.PI]], { name: '&delta;' });
 
  var d = brd.create('curve', [
    function(t) { return t;},
    function (t) { return A.Value() * t*t + B.Value()*t + C.Value(); },
    -19, 19], { strokeColor: '#aa2233', strokeWidth: 3 });
  brd.unsuspendUpdate();
}
// class Resource extends Component {
//   constructor(props) {
//     super(props);
//   }

//   render() {
//     return (
      
//       <div>
//         <h1>Resources</h1>
//       </div>
//     );
//   }
// }

 
class Resource extends Component {
  // constructor(props) {
  //   super(props);
  // }
  render () {
    return (
        <JXGBoard
          logic={logicJS}
          boardAttributes={{ axis: true, boundingbox: [-12, 10, 12, -10] }}
          style={{
            border: "3px solid red"
          }}
        />
    )
  }
}

export default Resource;