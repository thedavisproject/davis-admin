import React from "react";

import ResolveChoose from "./ResolveChoose.jsx";
import ResolveNew    from "./ResolveNew.jsx";
import ResolveIgnore from "./ResolveIgnore.jsx";

import { func, number, oneOf, shape, string } from "prop-types";


const propTypes = {
  columnHeader: string.isRequired,
  variable: shape({
    id: number,
    type: oneOf(["categorical", "number", "text"]),
    name: string
  }),
  method: oneOf(["", "new", "choose", "ignore"]),
  onMethodChange: func.isRequired
};


const renderMethod = (method) => {

  if (!method) { return ""; }

  switch (method) {
    case "choose":
      return (
        <ResolveChoose />
      );
    case "new":
      return (
        <ResolveNew />
      );
    case "ignore":
      return (
        <ResolveIgnore />
      );
  }
};


const renderResolveChoices = ({ method, onClick }) => {

  const handleClick = (m) => (e) => {
    const newMethod =  (method !== m) ? m : "";
    onClick(newMethod);
  };

  const renderButton = (method, label) => (
    <button key={method} type="button" onClick={handleClick(method)}>{label}</button>
  );

  return [
    renderButton("choose", "Choose"),
    renderButton("new", "New"),
    renderButton("ignore", "Ignore")
  ];
};


const ResolverRow = (props) => {

  const { columnHeader, method, onMethodChange, variable } = props;

  const renderResolve = () => {

    const handleChangeClick = (e) => {
      e.preventDefault();
      this.setState({ method: "" });
    };

    if (variable){
      return (
        <div className="resolved">
          <span>{variable.name}</span>
          <a href="#" onClick={handleChangeClick}>change?</a>
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
