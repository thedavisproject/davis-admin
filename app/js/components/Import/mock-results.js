export default [
  {
    key: "id",
    variable: {
      id: 23,
      type: "text",
      name: "State Id"
    }
  },
  {
    key: "name",
    variable: {
      id: 24,
      type: "text",
      name: "State Name"
    }
  },
  {
    key: "population",
    variable: null
  },
  {
    key: "color",
    variable: {
      id: 25,
      type: "categorical",
      name: "Color"
    },
    attributes: [
      {
        key: "Red",
        attribute: {
          id: 34,
          name: "Red"
        }
      },
      {
        key: "Blue",
        attribute: {
          id: 35,
          name: "Blue"
        }
      },
      {
        key: "All the colors of the rainbow",
        attribute: null
      }
    ]
  },
  {
    key: "size",
    variable: null
    // TODO how to i get a list of attributes when the user click "new > categorical"?
  }
];
