import React, { Component } from "react";
import JXGBoard from '../modules/JSXGraphSrc.js'

import "../../utilities.css";
import "./Resource.css";

let Linear = (brd) => {
  brd.suspendUpdate();
  //var a = brd.create('slider', [[2, 8], [6, 8], [0, 3, 6]], { name: 'a' });
  var A = brd.create('slider', [[2, 7], [6, 7], [-6, 2, 6]], { name: 'A' });
  var B = brd.create('slider', [[2, 6], [6, 6], [-6, 3, 6]], { name: 'B'});;
  //var delta = brd.create('slider', [[2, 4], [6, 4], [0, 0, Math.PI]], { name: '&delta;' });
 
  var d = brd.create('curve', [
    function(t) { return t;},
    function (t) { return A.Value() * t + B.Value(); },
    -19, 19], { strokeColor: '#aa2233', strokeWidth: 3 });
  brd.unsuspendUpdate();
}

let Quadratic = (brd) => {
  brd.suspendUpdate();
  //var a = brd.create('slider', [[2, 8], [6, 8], [0, 3, 6]], { name: 'a' });
  var A = brd.create('slider', [[2, 7], [6, 7], [-6, 2, 6]], { name: 'A' });
  var B = brd.create('slider', [[2, 6], [6, 6], [-6, 3, 6]], { name: 'B'});
  var C = brd.create('slider', [[2, 5], [6, 5], [-6, 3, 6]], { name: 'C' });
  //var delta = brd.create('slider', [[2, 4], [6, 4], [0, 0, Math.PI]], { name: '&delta;' });
 
  var d = brd.create('curve', [
    function(t) { return t;},
    function (t) { return A.Value() * t*t + B.Value()*t + C.Value(); },
    -19, 19], { strokeColor: '#aa2233', strokeWidth: 3 });
  brd.unsuspendUpdate();
}

let Cubic = (brd) => {
  brd.suspendUpdate();
  //var a = brd.create('slider', [[2, 8], [6, 8], [0, 3, 6]], { name: 'a' });
  var A = brd.create('slider', [[2, 7], [6, 7], [-6, 2, 6]], { name: 'A' });
  var B = brd.create('slider', [[2, 6], [6, 6], [-6, 3, 6]], { name: 'B'});
  var C = brd.create('slider', [[2, 5], [6, 5], [-6, 3, 6]], { name: 'C' });
  var D = brd.create('slider', [[2, 4], [6, 4], [-6, 3, 6]], { name: 'D' });
  //var delta = brd.create('slider', [[2, 4], [6, 4], [0, 0, Math.PI]], { name: '&delta;' });
 
  var d = brd.create('curve', [
    function(t) { return t;},
    function (t) { return A.Value()*Math.pow(t,3) + B.Value()*t*t + C.Value()*t + D.Value(); },
    -19, 19], { strokeColor: '#aa2233', strokeWidth: 3 });
  brd.unsuspendUpdate();
}

let Squareroot = (brd) => {
  brd.suspendUpdate();
  //var a = brd.create('slider', [[2, 8], [6, 8], [0, 3, 6]], { name: 'a' });
  var A = brd.create('slider', [[2, 7], [6, 7], [-6, 2, 6]], { name: 'A' });
  var B = brd.create('slider', [[2, 6], [6, 6], [-6, 3, 6]], { name: 'B'});
  var C = brd.create('slider', [[2, 5], [6, 5], [-6, 3, 6]], { name: 'C' });
  //var D = brd.create('slider', [[2, 4], [6, 4], [-6, 3, 6]], { name: 'D' });
  //var delta = brd.create('slider', [[2, 4], [6, 4], [0, 0, Math.PI]], { name: '&delta;' });
 
  var d = brd.create('curve', [
    function(t) { return t;},
    function (t) { return A.Value()*Math.sqrt(t + B.Value()) + C.Value(); },
    -19, 19], { strokeColor: '#aa2233', strokeWidth: 3 });
  brd.unsuspendUpdate();
}
let Cuberoot = (brd) => {
  brd.suspendUpdate();
  //var a = brd.create('slider', [[2, 8], [6, 8], [0, 3, 6]], { name: 'a' });
  var A = brd.create('slider', [[2, 7], [6, 7], [-6, 2, 6]], { name: 'A' });
  var B = brd.create('slider', [[2, 6], [6, 6], [-6, 3, 6]], { name: 'B'});
  var C = brd.create('slider', [[2, 5], [6, 5], [-6, 3, 6]], { name: 'C' });
  //var D = brd.create('slider', [[2, 4], [6, 4], [-6, 3, 6]], { name: 'D' });
  //var delta = brd.create('slider', [[2, 4], [6, 4], [0, 0, Math.PI]], { name: '&delta;' });
 
  var d = brd.create('curve', [
    function(t) { return t;},
    function (t) { return A.Value()*Math.cbrt(t + B.Value()) + C.Value(); },
    -19, 19], { strokeColor: '#aa2233', strokeWidth: 3 });
  brd.unsuspendUpdate();
}

let Exponential = (brd) => {
  brd.suspendUpdate();
  //var a = brd.create('slider', [[2, 8], [6, 8], [0, 3, 6]], { name: 'a' });
  var A = brd.create('slider', [[2, 7], [6, 7], [-6, 2, 6]], { name: 'A' });
  var B = brd.create('slider', [[2, 6], [6, 6], [-6, 3, 6]], { name: 'B'});
  var C = brd.create('slider', [[2, 5], [6, 5], [-6, 3, 6]], { name: 'C' });
  //var D = brd.create('slider', [[2, 4], [6, 4], [-6, 3, 6]], { name: 'D' });
  //var delta = brd.create('slider', [[2, 4], [6, 4], [0, 0, Math.PI]], { name: '&delta;' });
 
  var d = brd.create('curve', [
    function(t) { return t;},
    function (t) { return A.Value()*Math.exp(t + B.Value()) + C.Value(); },
    -19, 19], { strokeColor: '#aa2233', strokeWidth: 3 });
  brd.unsuspendUpdate();
}

let Naturallog = (brd) => {
  brd.suspendUpdate();
  //var a = brd.create('slider', [[2, 8], [6, 8], [0, 3, 6]], { name: 'a' });
  var A = brd.create('slider', [[2, 7], [6, 7], [-6, 2, 6]], { name: 'A' });
  var B = brd.create('slider', [[2, 6], [6, 6], [-6, 3, 6]], { name: 'B'});
  var C = brd.create('slider', [[2, 5], [6, 5], [-6, 3, 6]], { name: 'C' });
  //var D = brd.create('slider', [[2, 4], [6, 4], [-6, 3, 6]], { name: 'D' });
  //var delta = brd.create('slider', [[2, 4], [6, 4], [0, 0, Math.PI]], { name: '&delta;' });
 
  var d = brd.create('curve', [
    function(t) { return t;},
    function (t) { return A.Value()*Math.log(t + B.Value()) + C.Value(); },
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
    return (<>
        <div className ="Resource-title">
          <h1>Experiment with the sliders to see how a function changes! </h1>
        </div>
    <div className = "u-flex u-flexWrap u-flex-justifyCenter">
      <div className= "Resource-graph">
        <section>
          <h3>Linear: y = Ax + B</h3>
        </section>
        <JXGBoard
          logic={Linear}
          boardAttributes={{ axis: true, boundingbox: [-12, 10, 12, -10] }}
          style={{
            border: "3px solid light grey"
          }}
        />
      </div>
      <div className= "Resource-graph">
        <section>
          <h3>Quadratic: y = Ax² + Bx + C</h3>
        </section>
        <JXGBoard
          logic={Quadratic}
          boardAttributes={{ axis: true, boundingbox: [-12, 10, 12, -10] }}
          style={{
            border: "3px grey"
          }}
        />
      </div>
      <div className= "Resource-graph">
        <section>
          <h3>Cubic: y = Ax³ + Bx² + Cx + D</h3>
        </section>
        <JXGBoard
          logic={Cubic}
          boardAttributes={{ axis: true, boundingbox: [-12, 10, 12, -10] }}
          style={{
            border: "3px grey"
          }}
        />
      </div>
      <div className= "Resource-graph">
        <section>
          <h3>Squareroot: y = A√(x+B) + C</h3>
        </section>
        <JXGBoard
          logic={Squareroot}
          boardAttributes={{ axis: true, boundingbox: [-12, 10, 12, -10] }}
          style={{
            border: "3px grey"
          }}
        />
      </div>
      <div className= "Resource-graph">
          <section>
            <h3>Cube Root: y = A³√(x+B) + C</h3>
          </section>
        <JXGBoard
          logic={Cuberoot}
          boardAttributes={{ axis: true, boundingbox: [-12, 10, 12, -10] }}
          style={{
            border: "3px grey"
          }}
        />
      </div>
      <div className= "Resource-graph">
        <section>
          <h3>Exponential: y = Aˣ⁺ᴮ+C</h3>
        </section>
        <JXGBoard
          logic={Exponential}
          boardAttributes={{ axis: true, boundingbox: [-12, 10, 12, -10] }}
          style={{
            border: "3px grey"
          }} 
        />
      </div>
      <div className= "Resource-graph">
        <section>
          <h3>Natural Log: y = Aln(x+B)+C</h3>
        </section>
        <JXGBoard
          logic={Naturallog}
          boardAttributes={{ axis: true, boundingbox: [-12, 10, 12, -10] }}
          style={{
            border: "3px grey"
          }} 
        />
      </div>
    </div>
        </>
    )
  }
}



export default Resource;