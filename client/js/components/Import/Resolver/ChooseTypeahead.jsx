import React from "react";
import Downshift from "downshift";
import classNames from "classnames";

import { array, bool, func, string } from "prop-types";



const SvgX = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" className="svg-x" {...props}>
    <path d="M9.442,6.983l3.044-3.036A1.731,1.731,0,1,0,10.036,1.5L6.993,4.537,3.952,1.5A1.731,1.731,0,0,0,1.5,3.943l3.04,3.039L1.5,10.019a1.731,1.731,0,0,0,2.449,2.445L6.991,9.428l3.042,3.039a1.731,1.731,0,0,0,2.45-2.445Z"/>
  </svg>
);

export default class ChooseTypeahead extends React.Component {

  static propTypes = {
    loading: bool.isRequired,
    onQueryChange: func.isRequired,
    onSelect: func.isRequired,
    query: string.isRequired,
    variables: array.isRequired
  };


  render = () => {

    const { loading, query, onQueryChange, onSelect, variables } = this.props;

    return (
      <Downshift inputValue={query} onChange={onSelect} >
        {(downshiftState) => {

          const { getInputProps, getItemProps, getLabelProps,
            selectedItem, highlightedIndex, openMenu } = downshiftState;

          const handleInputChange = (e) => {
            onQueryChange(e.target.value);
          };

          const handleXClick = () => {
            onQueryChange("");
            this.input.focus();
          };

          return (
            <div className="choose-typeahead">
              <label {...getLabelProps()}>Choose a variable</label>
              {/* <pre>{JSON.stringify(downshiftState, null, 2)}</pre>
              <pre>{JSON.stringify(getInputProps(), null, 2)}</pre> */}
              <br />
              <div className="choose-typeahead__input">
                <input {...getInputProps()} type="text"
                  onChange={handleInputChange}
                  onFocus={() => openMenu()}
                  ref={el => this.input = el}
                />
                <SvgX onClick={handleXClick} />
              </div>
              {loading && <div>loading...</div>}
              <div className="choose-typeahead__variable-list">
                {(variables.length > 0)
                  ? (
                    variables.map((v, i) => (
                      <div key={i}
                        {...getItemProps({ item: v })}
                        className={classNames("choose-typeahead__variable", {
                          "is-highlighted": highlightedIndex === i,
                          "is-selected": selectedItem === v
                        })}
                      >
                        {v.name}
                      </div>
                    ))
                  )
                  : (
                    (!loading && `No results for "${query}"`)
                  )}
                </div>
            </div>
          );
        }}
      </Downshift>
    );
  }
}
