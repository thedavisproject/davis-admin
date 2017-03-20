import React from "react";


const Dataset = (props) => {

  const { dataset } = props;


  return (
    <div className="dataset">
      {dataset.name}!

      <br /><br />
      <pre>
        {JSON.stringify(props, null, 2)}
      </pre>

    </div>
  );
};


const { shape, string } = React.PropTypes;

Dataset.propTypes = {

  dataset: shape({
    id: string.isRequired,
    name: string.isRequired
  }).isRequired

};


export default Dataset;
