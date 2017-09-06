import React from "react";
import classNames from "classnames";
import ResolveChooseContainer from "./ResolveChooseContainer.js";
import ResolveNew    from "./ResolveNew.jsx";
import ResolveIgnore from "./ResolveIgnore.jsx";

import { func, number, object, oneOf, shape, string } from "prop-types";


const propTypes = {
  columnHeader: string.isRequired,
  variable: shape({
    id: number,
    type: oneOf(["categorical", "number", "text"]),
    name: string
  }),
  method: shape({
    selected: oneOf(["", "new", "choose", "ignore"]).isRequired,
    choose: object,
    new: object,
    ignore: object
  }).isRequired,
  onMethodChange: func.isRequired
};



const renderResolveChoices = ({ method, onClick }) => {

  const handleClick = (m) => (e) => {
    const newMethod =  (method !== m) ? m : "";
    onClick(newMethod);
  };

  const renderButton = (m, label) => {

    const buttonClasses = classNames("button", "resolver-tab", {
      "is-active": m === method.selected
    });

    return (
      <button key={m} type="button" className={buttonClasses} onClick={handleClick(m)}>
        {label}
      </button>
    );
  };

  return [
    renderButton("choose", "Choose"),
    renderButton("new", "New"),
    renderButton("ignore", "Ignore")
  ];
};


const ResolverRow = (props) => {

  const { columnHeader, method, onMethodChange, onMethodReset, variable } = props;

  const renderMethod = (method) => {

    if (!method) { return ""; }

    const getStyleFor = (m) => {
      return {
        display: m === method.selected ? "block" : "none"
      };
    };

    return (
      <div>
        <div style={getStyleFor("choose")}>
          <ResolveChooseContainer {...method.choose}/>
        </div>
        <div style={getStyleFor("new")}>
          <ResolveNew {...method.new}/>
        </div>
        <div style={getStyleFor("ignore")}>
          <ResolveIgnore {...method.ignore}/>
        </div>
      </div>
    );

    // switch (method.type) {
    //   case "choose":
    //     return (
    //     );
    //   case "new":
    //     return (
    //     );
    //   case "ignore":
    //     return (
    //     );
    // }
  };

  const renderResolve = () => {

    if (variable){
      return (
        <div className="resolved">
          <span>{variable.name}</span>
          <a href="#" onClick={onMethodChange}>change?</a>
        </div>
      );
    }
    else {
      return (
        <div>
          {method !== "ignore" && renderResolveChoices({ method, onClick: onMethodChange })}

          {renderMethod(method)}

        </div>
      );
    }
  };

  return (
    <tr className="resolver-row">
      <td className="resolver-row__column-header">{columnHeader}</td>
      <td className="resolver-row__status"> { variable ? "✔" : "?"} </td>
      <td className="resolver-row__method">
        {renderResolve(props)}
      </td>
    </tr>
  );
};

ResolverRow.propTypes = propTypes;

export default ResolverRow;
