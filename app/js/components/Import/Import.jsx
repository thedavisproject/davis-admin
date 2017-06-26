import React from "react";

import Resolver from "./Resolver/Resolver.jsx";

import results from "./mock-results.js";

export default class Import extends React.Component {

  render = () => {


    return (
      <div>
        <Resolver results={results} />
      </div>
    );
  }

}
