import React from "react";


const Dataset = ({id}) => {
  return (
    <div className="dataset">
      Dataset {id}!
    </div>
  );
};


const { string } = React.PropTypes;

Dataset.propTypes = {
  id: string
};


export default Dataset;
