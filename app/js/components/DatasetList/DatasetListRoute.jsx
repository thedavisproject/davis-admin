import React from "react";
import R from "ramda";
import { Route } from "react-router-dom";
import Fetch from "../Fetch/Fetch.jsx";
import DatasetList from "./DatasetList.jsx";
import parsePairs from "../parsePairs.js";

const DatasetListRoute = () => {

  return (
    <Route path="/datasets/:rest*" render={({ match }) => {

      // console.log("datasetList", match);

      // const { rest } = match.params;

      // console.log(parsePairs(rest));


      const mapJsonToProps = (json) => {
        return {
          datasets: json
        };
      };

      const renderData = (props) => {
        return <DatasetList {...props} />;
      };

      return (
        <Fetch
          url={"/api/datasets"}
          mapJsonToProps={mapJsonToProps}
          renderData={renderData}
        />
      );


    }} />
  );
};

export default DatasetListRoute;
