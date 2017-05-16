import React from "react";
import Undoable from "./Undoable.jsx";

export default Undoable((value, props) => <input type="text" value={value} {...props} />);
