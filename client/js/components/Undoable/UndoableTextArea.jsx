import React from "react";
import Undoable from "./UndoableHOC.jsx";

export default Undoable((value, onChange, props) => <textarea value={value} {...props} />);
