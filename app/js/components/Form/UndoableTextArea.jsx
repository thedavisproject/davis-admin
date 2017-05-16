import React from "react";
import Undoable from "./Undoable.jsx";

export default Undoable((value, props) => <textarea value={value} {...props} />);
