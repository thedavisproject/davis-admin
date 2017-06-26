import React from "react";

import ResolveChoose from "./ResolveChoose.jsx";
import ResolveNew    from "./ResolveNew.jsx";
import ResolveIgnore from "./ResolveIgnore.jsx";

import { func, number, oneOf, shape, string } from "prop-types";

export default class ResolverRow extends React.Component {

  static propTypes = {
    columnHeader: string.isRequired,
    variable: shape({
      id: number,
      type: oneOf(["categorical", "number", "text"]),
      name: string
    })
  };

  state = {
    method: "", // new, choose, ignore
    resolvedTo: null
  }


  renderResolveChoices = () => {

    const handleClick = (method) => (e) => {
      this.setState({
        method: (this.state.method !== method) ? method : ""
      });
    };

    const renderButton = (method, label) => (
      <button key={method} type="button" onClick={handleClick(method)}>{label}</button>
    );

    return [
      renderButton("choose", "Choose"),
      renderButton("new", "New"),
      renderButton("ignore", "Ignore")
    ];
  }

  renderMethod = (method) => {

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
  }

  renderResolve = () => {
    const { variable } = this.props;
    const { method } = this.state;

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
          {method !== "ignore" && this.renderResolveChoices()}
          {this.renderMethod(method)}
        </div>
      );
    }
  }

  render = () => {

    const { columnHeader, variable, resolvedTo } = this.props;

    return (
      <tr className="resolver-row">
        <td className="resolver-row__column-header">{columnHeader}</td>
        <td className="resolver-row__status"> { variable ? "✔" : "?"} </td>
        <td className="resolver-row__resolve">
          {this.renderResolve()}
        </td>
      </tr>
    );
  };
}
