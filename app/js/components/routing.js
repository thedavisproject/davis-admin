import React from "react";

export const pages = [
  { page: "", id: "", label: "Home" },
  { page: "dataset", id: "all", label: "Datasets" },
  { page: "variable", id: "all", label: "Variables" },
  { page: "attribute", id: "all", label: "Attributes" }
];


const { oneOf, string, shape, object } = React.PropTypes;
const pageNames = pages.map(p => p.page).concat("");

export const routePropType = shape({
  page: oneOf(pageNames).isRequired,
  id: string,
  params: object
});
