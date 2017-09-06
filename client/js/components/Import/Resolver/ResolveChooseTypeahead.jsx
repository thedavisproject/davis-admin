import React from "react";
import Downshift from "downshift";
import classNames from "classnames";

import { array, bool, func, string } from "prop-types";

const propTypes = {
  loading: bool.isRequired,
  onQueryChange: func.isRequired,
  onSelect: func.isRequired,
  query: string.isRequired,
  variables: array.isRequired
};

const ResolveChooseTypeahead = ({ loading, query, onQueryChange, onSelect, variables }) => {

  return (
    <Downshift inputValue={query} onChange={onSelect} >
      {(downshiftState) => {

        const { getInputProps, getItemProps, getLabelProps, isOpen,
          selectedItem, highlightedIndex, openMenu } = downshiftState;

        return (
          <div className="resolver-typeahead">
            <label {...getLabelProps()}>Choose a variable</label>
            {/* <pre>{JSON.stringify(downshiftState, null, 2)}</pre>
            <pre>{JSON.stringify(getInputProps(), null, 2)}</pre> */}
            <br />
            <input {...getInputProps()} type="text" onChange={onQueryChange} onFocus={() => openMenu()}/>
            <br />
            {loading && "loading..."}
            <div className="resolver-typeahead__variable-list">
              {(variables.length > 0)
                ? (
                  variables.map((v, i) => (
                    <div key={i}
                      {...getItemProps({ item: v })}
                      className={classNames("resolver-typeahead__variable", {
                        "is-highlighted": highlightedIndex === i,
                        "is-selected": selectedItem === v
                      })}
                    >
                      {v.name}
                    </div>
                  ))
                )
                : (
                  `No results for "${query}"`
                )}
              </div>
          </div>
        );
      }}
    </Downshift>
  );
};

ResolveChooseTypeahead.propTypes = propTypes;

export default ResolveChooseTypeahead;
