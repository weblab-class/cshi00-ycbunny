// import React, { Component } from "react";

// import "./NewFunctionInput.css";
// import { post } from "../../utilities";

// /**
//  * New Post is a parent component for all input components
//  *
//  * Proptypes
//  * @param {string} defaultText is the placeholder text
//  * @param {string} functionId 
//  * @param {({functionId, value}) => void} onSubmit: (function) triggered when this post is submitted, takes {storyId, value} as parameters
//  * @param {({functionId, value}) => void} onClear: (function) triggered when this post is submitted, takes {storyId, value} as parameters
//  */
// class NewPostInput extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       value: "",
//     };
//   }

//   // called whenever the user types in the new post input box
//   handleChange = (event) => {
//     this.setState({
//       value: event.target.value,
//     });
//   };

//   // called when the user hits "Submit" for a new post
//   handleSubmit = (event) => {
//     event.preventDefault();
//     this.props.onSubmit && this.props.onSubmit(this.state.value);
//     this.setState({
//       value: "",
//     });
//   };

//   handleClear = (event) => {
//     event.preventDefault();
//     this.props.onClear && this.props.onClear(this.state.value);
//   };

//   render() {
//     return (
//       <div className="u-flex">
//         <input
//           type="text"
//           placeholder={this.props.defaultText}
//           value={this.state.value}
//           onChange={this.handleChange}
//           className="NewPostInput-input"
//         />
//         <button
//           type="submit"
//           className="NewPostInput-button u-pointer"
//           value="Submit"
//           onClick={this.handleSubmit}
//         >
//           OK
//         </button>
//         <button
//           type="submit"
//           className="NewPostInput-button u-pointer"
//           value="Submit"
//           onClick={this.handleClear}
//         >
//           Clear
//         </button>
//       </div>
//     );
//   }
// }

// /**
//  * New Story is a New Post component for comments
//  *
//  * Proptypes
//  * @param {string} defaultText is the placeholder text
//  */
// class NewStory extends Component {
//   addStory = (value) => {
//     const body = { content: value };
//     post("/api/story", body).then((story) => {
//       // display this story on the screen
//       this.props.addNewStory(story); // ADDNEWSTORY???
//     });
//   };

//   render() {
//     return <NewPostInput defaultText="New Story" onSubmit={this.addFunction} onClear={this.deleteFunction}/>;
//   }
// }

// export { NewComment, NewStory };
