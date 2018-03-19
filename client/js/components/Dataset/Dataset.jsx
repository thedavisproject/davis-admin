import React from "react";
import { func, number, shape, string }   from "prop-types";
import UndoableTextInput from "../Undoable/UndoableTextInput.jsx";
import ConfirmBtn from "../Modal/ConfirmBtn.jsx";

const propTypes = {
  dataset: shape({
    id: number.isRequired,
    name: string.isRequired
  }).isRequired,
  onDatasetUpdate: func.isRequired,
  onDatasetDelete: func.isRequired
};

const Dataset = (props) => {

  const { dataset, onDatasetUpdate } = props;

  const handleNameChange = (value) => {

    onDatasetUpdate({ name: value });
  };

  return (
    <div className="dataset">

      <h2>
        {dataset.name}
        <ConfirmBtn
          className="dataset__delete"
          confirmLabel="Delete"
          renderMessage={() => "Are you sure you want to delete?"}
          onConfirm={() => console.log("BOOM!")}
        >
          Delete
        </ConfirmBtn>
      </h2>





      {/* <input type="text" value={dataset.name} onChange={e => handleNameChange(e.target.value)} /> */}

      <UndoableTextInput value={dataset.name} onChange={handleNameChange} label="Name" />

      <pre>
        {/* {JSON.stringify(props, null, 2)} */}
      </pre>

    </div>
  );
};

Dataset.propTypes = propTypes;



export default Dataset;
