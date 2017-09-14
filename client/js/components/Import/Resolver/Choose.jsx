import React from "react";

import ChooseTypeahead from "./ChooseTypeahead.jsx";

import { arrayOf, bool, func, shape, string } from "prop-types";


const propTypes = {
  columnHeader: string.isRequired, // it's the key, but that prop is reserved
  variables: arrayOf(shape({
    name: string,
    key: string
  })),
  loadingResults: bool.isRequired,
  query: string.isRequired,
  onQueryUpdate: func.isRequired,
  onVariableSelect: func.isRequired
};

const defaultProps = {
  variables: []
};

const Choose = (props) => {

  const { query, loadingResults, variables, onQueryUpdate, onVariableSelect } = props;

  const onQueryChange = (e) => {
    onQueryUpdate(e.target.value);
  };

  return (
    <ChooseTypeahead
      variables={variables}
      onSelect={onVariableSelect}
      query={query}
      onQueryChange={onQueryChange}
      loading={loadingResults}
    />
  );

};

Choose.propTypes = propTypes;
Choose.defaultProps = defaultProps;

export default Choose;
