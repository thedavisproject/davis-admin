import React from "react";


const DatasetList = ({datasets, onDatasetClick}) => {


  return (
    <div className="dataset-list">

      {datasets.map(i => {

        // test params with dataset 3
        const params = i === 3 ? {"filter": 22, "sort": "asc"} : {};
        const onClick = onDatasetClick.bind(null, String(i), params);

        return(
          <div key={i} className="dataset-list__dataset"
          onClick={onClick}>
            Dataset {i}
          </div>
        );
      })}

    </div>
  );
};


const { array, func } = React.PropTypes;

DatasetList.propTypes = {
  datasets: array.isRequired,
  onDatasetClick: func.isRequired
};


export default DatasetList;
