import React from "react";
import R from "ramda";
import ResolveChooseTypeahead from "./ResolveChooseTypeahead.jsx";

import { arrayOf, bool, func, shape, string } from "prop-types";

const variableShape = shape({
  name: string,
  key: string
});

const propTypes = {
  variables: arrayOf(variableShape),
  loadingResults: bool.isRequired,
  query: string.isRequired,
  onQueryUpdate: func.isRequired,
  selectedVariable: variableShape,
  onVariableSelect: func.isRequired,
  onChangeClick: func.isRequired
};

const defaultProps = {
  variables: []
};

const ResolveChoose = (props) => {

  const { query, selectedVariable, loadingResults, variables, onQueryUpdate,
    onVariableSelect, onChangeClick } = props;

  const onQueryChange = (e) => {
    onQueryUpdate(e.target.value);
  };


  const handleChangeClick = (fn) => {
    return (e) => {
      e.preventDefault();
      fn(e);
    };
  };

  const render = () => {
    if (selectedVariable) {
      return (
        <div>
          Chosen: {selectedVariable.name}  <a href="#" onClick={handleChangeClick(onChangeClick)}>change</a>
        </div>
      );
    }
    else {
      return (
        <ResolveChooseTypeahead
          variables={variables}
          onSelect={onVariableSelect}
          query={query}
          onQueryChange={onQueryChange}
          loading={loadingResults}
        />
      );
    }
  };

  return render();

};

ResolveChoose.propTypes = propTypes;
ResolveChoose.defaultProps = defaultProps;

export default ResolveChoose;
