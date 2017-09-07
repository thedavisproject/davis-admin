import React from "react";

import ResolveChooseTypeahead from "./ResolveChooseTypeahead.jsx";

import { arrayOf, bool, func, shape, string } from "prop-types";


const propTypes = {
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

const ResolveChoose = (props) => {

  const { query, loadingResults, variables, onQueryUpdate, onVariableSelect } = props;

  const onQueryChange = (e) => {
    onQueryUpdate(e.target.value);
  };

  return (
    <ResolveChooseTypeahead
      variables={variables}
      onSelect={onVariableSelect}
      query={query}
      onQueryChange={onQueryChange}
      loading={loadingResults}
    />
  );

};

ResolveChoose.propTypes = propTypes;
ResolveChoose.defaultProps = defaultProps;

export default ResolveChoose;
