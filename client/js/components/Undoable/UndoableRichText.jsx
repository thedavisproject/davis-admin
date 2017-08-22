import React from "react";
import Undoable from "./Undoable.jsx";
import RichText from "../RichText/RichText.jsx";

export default Undoable((value, props) => <RichText editorState={value} {...props} />);
