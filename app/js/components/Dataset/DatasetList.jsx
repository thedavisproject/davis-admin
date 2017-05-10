import React from "react";
import Link from "../Link/Link.jsx";

import { arrayOf, shape, string } from "prop-types";

const propTypes = {
  datasets: arrayOf(shape({
    id: string.isRequired,
    name: string.isRequired
  })).isRequired
};

const DatasetList = ({ datasets }) => {


  return (
    <div className="dataset-list">

      {datasets.map(dataset => {


        return(
          <Link key={dataset.id}
            route={{ page: "dataset", id: dataset.id }}
            className="dataset-list__dataset"
          >
              {dataset.name}
          </Link>
        );
      })}

    </div>
  );
};

DatasetList.propTypes = propTypes;

export default DatasetList;
