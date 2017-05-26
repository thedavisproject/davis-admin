import React from "react";
import R from "ramda";
import { Route } from "react-router-dom";
import Fetch from "../Fetch/Fetch.jsx";
import DatasetContainer from "./DatasetContainer.js";
import parsePairs from "../parsePairs.js";

const DatasetRoute = () => {
  return (
    <Route path="/dataset/:id/:rest*" render={({ match }) => {
      const { id, rest } = match.params;

      return (
        <Fetch
          url = {`/api/dataset/${id}`}
          mapJsonToProps={(json) => ({
            dataset: json
          })}
          renderData={(props) => {

            const params = R.merge(props, parsePairs(rest));

            return (<DatasetContainer {...params} />);
          }}
        />
      );

    }} />
  );
};

export default DatasetRoute;
