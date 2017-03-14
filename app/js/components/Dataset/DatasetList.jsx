import React from "react";


const DatasetList = ({datasets, onDatasetClick, isLoading, errorLoading}) => {

  if (errorLoading){
    return (
      <div>There was an error loading the datasets!</div>
    );
  }

  if (isLoading){
    return (
      <div>Loading...</div>
    );
  }

  return (
    <div className="dataset-list">

      {datasets.map(dataset => {

        const onClick = onDatasetClick.bind(null, dataset.id, {});

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


const { arrayOf, bool, func, shape, string } = React.PropTypes;

DatasetList.propTypes = {
  datasets: arrayOf(shape({
    id: string.isRequired,
    name: string.isRequired
  })).isRequired,
  isLoading: bool,
  errorLoading: bool,
  onDatasetClick: func.isRequired
};


export default DatasetList;
