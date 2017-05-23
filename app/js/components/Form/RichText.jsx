import React from "react";
import { Editor, EditorState, convertToRaw, convertFromRaw } from "draft-js";
import { convertFromHTML } from "draft-convert";

import { func, object, oneOfType, string } from "prop-types";

// https://medium.com/@adrianli/a-beginner-s-guide-to-draft-js-d1823f58d8cc
// https://medium.com/@rajaraodv/how-draft-js-represents-rich-text-data-eeabb5f25cf2
// https://draftjs-examples.herokuapp.com/
//
// https://www.caffeinecoding.com/react-redux-draftjs/

export default class RichText extends React.Component {

  static propTypes = {
    editorState: oneOfType([object, string]),
    onChange: func.isRequired
  }

  state = {
    editorState: EditorState.createEmpty()
  }


  handleEditorChange = (editorState) => {

    // We need to continue updating the local state in order
    // to get the latest selection position
    this.setState({ editorState });


    // sent the ContentState up
    const raw = convertToRaw(editorState.getCurrentContent());
    this.props.onChange(raw);
  };


  // some facey stuff to merge the selectionState with the contentState
  getEditorState = () => {

    // get the current SelectionState from the EditorState in the state
    const selectionState = this.state.editorState.getSelection();

    // get the ContentState from the props
    const contentState = (typeof this.props.editorState !== "object")
      // if we're passed a string of html, convertFromHTML
      ? convertFromHTML(this.props.editorState)
      // otherwise, it should be a ContentState object
      : convertFromRaw(this.props.editorState);

    // merge the ContentState and the SelectionState
    return EditorState.acceptSelection(EditorState.createWithContent(contentState), selectionState);
  }


  render() {

    return (
        <Editor
          editorState={this.getEditorState()}
          onChange={this.handleEditorChange}
        />
    );
  }
}
