import React from 'react';
import { render } from 'react-dom';
import Scroll from 'react-scroll';
import SingleFunction from "../modules/SingleFunction.js";
import "./ScrollBar.css";


var Link = Scroll.Link;
var Element = Scroll.Element;
//var Events = Scroll.Events;
var scroll = Scroll.animateScroll;
var scroller = Scroll.scroller;


const styles = {
  fontFamily: 'sans-serif',
  textAlign: 'center',
};

class ScrollBar extends React.Component {
  constructor(props) {
    super(props);
    this.scrollToTop = this.scrollToTop.bind(this);
  }
  scrollToTop() {
    scroll.scrollToTop();
  }
  componentDidMount() {

  }
  
  componentWillUnmount() {
  }
  scrollTo(func) {
    console.log(func)
    scroller.scrollTo(func, {
      duration: 800,
      delay: 100,
      smooth: 'easeInOutQuart',
    })
  }
  render() {
    let functionsList = null;
    let hasFunctions = false;
    if (this.props.functions !=null){
        hasFunctions = this.props.functions.length !== 0;
    }
    if (hasFunctions) {
      functionsList = this.props.functions.map((functionObj) => (
        <Element name= {"s"+functionObj._id+"k"} className="element"
        style={{
            marginBottom: '15px'
          }}>
          <SingleFunction
            _id={functionObj._id}
            creator_name={functionObj.creator_name}
            workId = {functionObj.workId}
            exp={functionObj.exp}
            leftRange={functionObj.leftRange}
            rightRange={functionObj.rightRange}
            deleteOldFunction={this.props.deleteOldFunction}
            mode={functionObj.mode}
            origin={functionObj.origin}
          />
        </Element>
      ));
    } else {
      functionsList = <div></div>;
    }
    // this.scrollToTop({containerId: "containerElemen"});
    return (
      <div>
            {functionsList}
            <div className="emptyspace"/>

      </div>
    );
  }
};

export default ScrollBar;


