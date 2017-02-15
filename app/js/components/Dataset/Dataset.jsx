import React from "react";


const Dataset = (props) => {
  return (
    <div className="dataset">
      Dataset {props.id}!

      <br /><br />
      {JSON.stringify(props)}
    </div>
  );
};


const { string } = React.PropTypes;

Dataset.propTypes = {
  id: string
};


export default Dataset;
