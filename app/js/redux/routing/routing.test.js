/* global describe, it */
import { expect } from "chai";
import { mapStateToPath, handleUrlChange } from "./routing.js";
import { navigateTo, redirectTo } from "./routing-actions.js";
import url from "url";


/**
 * Helper functions
 */

function createMockStateObj(page = "", id = "", args = {}){
  return {
    route: { page, id, args }
  };
}

function parseUrl(urlString){
  // https://nodejs.org/dist/latest-v6.x/docs/api/url.html
  // url.parse is missing origin
  const location = url.parse(urlString);

  return Object.assign({}, location, {
    origin: location.protocol + "//" + location.host
  });
}


/**
 * Tests
 */


describe("home route", function(){

  /* mapStateToPath */

  it("should correctly generate the homepage path", () => {
    const state = createMockStateObj();
    const url = mapStateToPath(state);
    expect(url).to.equal("/");
  });

  /* handleUrlChange */

  it("should correctly match an empty path", () => {
    const location = parseUrl("http://mikebook.velir.com:3000/");
    const action = handleUrlChange(location);
    expect(action).to.deep.equal(navigateTo());
  });

  it("should correctly redirect bad path to the homepage", () => {
    const location = parseUrl("http://mikebook.velir.com:3000/not-found");
    const action = handleUrlChange(location);
    expect(action).to.deep.equal(redirectTo());
  });

});

describe("datasets route", function(){

  /* mapStateToPath */

  it("should correctly generate the datasets path", () => {
    const state = createMockStateObj("datasets");
    const url = mapStateToPath(state);
    expect(url).to.equal("/datasets");
  });

  it("should correctly generate the datasets path with args", () => {
    const state = createMockStateObj("datasets", "", { filter: 22, sort: "asc" });
    const url = mapStateToPath(state);
    expect(url).to.equal("/datasets/filter/22/sort/asc");
  });

  /* handleUrlChange */

  it("should correctly match the datasets path with args", () => {
    const location = parseUrl("http://mikebook.velir.com:3000/datasets/filter/22/sort/asc");
    const action = handleUrlChange(location);
    expect(action).to.deep.equal(navigateTo("datasets", "", { filter: 22, sort: "asc" }));

  });

});

describe("dataset route", function(){

  /* mapStateToPath */

  it("should correctly generate the dataset path", () => {
    const state = createMockStateObj("dataset", "2");
    const url = mapStateToPath(state);
    expect(url).to.equal("/dataset/2");
  });

  it("should correctly generate the dataset path with args", () => {
    const state = createMockStateObj("dataset", "2", { filter: "22", sort: "asc" });
    const url = mapStateToPath(state);
    expect(url).to.equal("/dataset/2/filter/22/sort/asc");
  });

  it("should correctly generate the dataset path with args that begin with numbers", () => {
    const state = createMockStateObj("dataset", "2", { filter: "22a", sort: "asc" });
    const url = mapStateToPath(state);
    expect(url).to.equal("/dataset/2/filter/22a/sort/asc");
  });


  /* handleUrlChange */

  it("should correctly match the datasets path with args", () => {
    const location = parseUrl("http://mikebook.velir.com:3000/dataset/2/filter/22/sort/asc");
    const action = handleUrlChange(location);
    expect(action).to.deep.equal(navigateTo("dataset", "2", { filter: 22, sort: "asc" }));
  });

  it("should correctly match the datasets path with args that begin with numbers", () => {
    const location = parseUrl("http://mikebook.velir.com:3000/dataset/2/filter/22a/sort/asc");
    const action = handleUrlChange(location);
    expect(action).to.deep.equal(navigateTo("dataset", "2", { filter: "22a", sort: "asc" }));
  });



});
