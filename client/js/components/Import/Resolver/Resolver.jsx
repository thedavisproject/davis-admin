import React from "react";
import ResolverRow from "./ResolverRow.jsx";

import { arrayOf, bool, number, object, shape, string } from "prop-types";

const propTypes = {
  results: arrayOf(shape({
    // TODO replace object with shape
    attributes: arrayOf(object),
    key: string.isRequired,
    match: bool,
    variable: shape({
      id: number,
      name: string
    }),

    // if categorical...
    // attributes: arrayOf(shape({
    //   name: string.isRequired,
    //   match: bool.isRequired,
    //   atrribute: string.isRequired
    // }))
  })).isRequired
};

const Resolver = (props) => {

  const { results } = props;

  return (
    <div>
      <div>Found {results.length} variables:</div>

      <table>
        <tbody>
          {results.map(result => {

            const { key, variable } = result;

            return (
              <ResolverRow key={key}
                columnHeader={key}
                variable={variable}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

Resolver.propTypes = propTypes;

export default Resolver;
