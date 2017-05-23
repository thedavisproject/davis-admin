import React from "react";
import { Editor, EditorState, convertToRaw, convertFromRaw, RichUtils } from "draft-js";
import { convertFromHTML } from "draft-convert";
import Button from "./Button.jsx";

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

  handleInlineStyleClick = (style) => {
    try {
      // style: "BOLD", "ITALIC"
      this.handleEditorChange(RichUtils.toggleInlineStyle( this.getEditorState(), style ));
    }
    catch(e) {
      // if you click a button before the editor has focus, it throws
      // Uncaught TypeError: Cannot read property 'getType' of undefined
    }
  }

  handleBlockStyleClick = (style) => {
    try {
      // https://draftjs.org/docs/advanced-topics-custom-block-render-map.html
      this.handleEditorChange(RichUtils.toggleBlockType( this.getEditorState(), style ));
    }
    catch(e) {
      // if you click a button before the editor has focus, it throws
      // Uncaught TypeError: Cannot read property 'getType' of undefined
    }
  }

  focus = () => {
    this.editor.focus();
  }


  // some facey stuff to merge the selectionState with the contentState
  getEditorState = () => {

    // get the current SelectionState from the EditorState in the state
    const selectionState = this.state.editorState.getSelection();

    // get the ContentState from the props
    const contentState = (typeof this.props.editorState === "string")
      // if we're passed a string of html, convertFromHTML
      ? convertFromHTML(this.props.editorState)
      // otherwise, it should be a ContentState object
      : convertFromRaw(this.props.editorState);

    // merge the ContentState and the SelectionState
    return EditorState.acceptSelection(EditorState.createWithContent(contentState), selectionState);
  }



  render() {

    return (
      <div className="rich-text__container">
        <div className="rich-text__tools">
          <span className="rich-text__tool-section">
            <Button onClick={this.handleInlineStyleClick} style="BOLD">B</Button>
            <Button onClick={this.handleInlineStyleClick} style="ITALIC">I</Button>
            <Button onClick={this.handleInlineStyleClick} style="CODE">{"{}"}</Button>
          </span>
          <span className="rich-text__tool-section">
            {/* https://draftjs.org/docs/advanced-topics-custom-block-render-map.html */}
            <Button onClick={this.handleBlockStyleClick} style="header-one">h1</Button>
            <Button onClick={this.handleBlockStyleClick} style="header-two">h2</Button>
            <Button onClick={this.handleBlockStyleClick} style="header-three">h3</Button>
            <Button onClick={this.handleBlockStyleClick} style="blockquote">"</Button>
            <Button onClick={this.handleBlockStyleClick} style="code-block">{"{}"}</Button>
            <Button onClick={this.handleBlockStyleClick} style="unordered-list-item">{"-"}</Button>
            <Button onClick={this.handleBlockStyleClick} style="ordered-list-item">{"1"}</Button>
          </span>

        </div>
        <Editor
          ref={el => this.editor = el}
          editorState={this.getEditorState()}
          onChange={this.handleEditorChange}
        />
      </div>
    );
  }
}
