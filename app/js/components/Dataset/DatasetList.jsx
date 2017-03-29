import React from "react";
import Link from "../Link/Link.jsx";

const DatasetList = ({datasets}) => {


  return (
    <div className="dataset-list">

      {datasets.map(dataset => {


        return(
          <Link key={dataset.id}
            route={{page: "dataset", id: dataset.id}}
            className="dataset-list__dataset"
          >
              {dataset.name}
          </Link>
        );
      })}

    </div>
  );
};


const { arrayOf, shape, string } = React.PropTypes;

DatasetList.propTypes = {
  datasets: arrayOf(shape({
    id: string.isRequired,
    name: string.isRequired
  })).isRequired
};


export default DatasetList;
