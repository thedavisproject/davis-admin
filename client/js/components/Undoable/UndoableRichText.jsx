import React from "react";
import Undoable from "./UndoableHOC.jsx";
import RichText from "../RichText/RichText.jsx";

export default Undoable((value, onChange, props) => <RichText editorState={value} {...props} />);
