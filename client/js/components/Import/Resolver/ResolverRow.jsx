import React from "react";
import classNames from "classnames";
import ChooseContainer from "./ChooseContainer.js";
import New    from "./New.jsx";
import Ignore from "./Ignore.jsx";
import ResolvedBy    from "./ResolvedBy.jsx";

import { any, func, object, oneOf, shape, string } from "prop-types";


const propTypes = {
  columnHeader: string.isRequired,
  method: shape({
    selected: oneOf(["", "new", "choose", "ignore"]).isRequired,
    choose: object,
    new: object,
    ignore: object,
    resolvedBy: shape({
      type: oneOf(["new", "choose", "ignore"]).isRequired,
      display: string.isRequired,
      data: any
    })
  }).isRequired,
  onMethodChange: func.isRequired,
  onStartOver: func.isRequired
};



const renderTabs = ({ method, onClick }) => {

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

  const { columnHeader, method, onMethodChange, onStartOver } = props;

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
          <ChooseContainer {...method.choose} />
        </div>
        <div style={getStyleFor("new")}>
          <New {...method.new} />
        </div>
        <div style={getStyleFor("ignore")}>
          <Ignore {...method.ignore} />
        </div>
      </div>
    );

  };

  const renderResolve = () => {

    if (method.resolvedBy){
      const { type, display } = method.resolvedBy;
      return <ResolvedBy method={type} display={display} onStartOver={onStartOver} />;
    }
    else {
      return (
        <div>
          {renderTabs({ method, onClick: onMethodChange })}
          {renderMethod(method)}
        </div>
      );
    }
  };

  return (
    <tr className="resolver-row">
      <td className="resolver-row__column-header">{columnHeader}</td>
      <td className="resolver-row__status">{(method.resolvedBy) ? "✔" : "?"}</td>
      <td className="resolver-row__method">
        {renderResolve(props)}
      </td>
    </tr>
  );
};

ResolverRow.propTypes = propTypes;

export default ResolverRow;
