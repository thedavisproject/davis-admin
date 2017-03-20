import React from "react";


const DatasetList = ({datasets, onDatasetClick}) => {


  return (
    <div className="dataset-list">

      {datasets.map(dataset => {

        const onClick = (e) => {
          onDatasetClick(dataset.id);
        };

        return(
          <div key={dataset.id} className="dataset-list__dataset"
          onClick={onClick}>
            {dataset.name}
          </div>
        );
      })}

    </div>
  );
};


const { arrayOf, func, shape, string } = React.PropTypes;

DatasetList.propTypes = {
  datasets: arrayOf(shape({
    id: string.isRequired,
    name: string.isRequired
  })).isRequired,
  onDatasetClick: func.isRequired
};


export default DatasetList;
