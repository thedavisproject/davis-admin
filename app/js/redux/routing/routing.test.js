/* global describe, it */
import { expect } from "chai";
import { locationToRoute, routeToUrl, handleUrlChange } from "./routing.js";
import { redirectTo } from "./routing-actions.js";
import url from "url";


/**
 * Helper functions
 */


function urlToLocation(urlString){
  // https://nodejs.org/dist/latest-v6.x/docs/api/url.html
  // url.parse is missing origin
  const location = url.parse(urlString);

  return Object.assign({}, location, {
    origin: location.protocol + "//" + location.host
  });
}

function urlToRoute(urlString){
  const location =  urlToLocation(urlString);
  return locationToRoute(location);
}


/**
 * Tests
 */


describe("home route", function(){

  /* routeToUrl */

  it("should correctly generate the homepage url", () => {
    const url1 = routeToUrl();
    expect(url1).to.equal("/");
    const url2 = routeToUrl({ page: "" });
    expect(url2).to.equal("/");
  });


  /* locationToRoute */

  it("should correctly match an empty path", () => {
    const route = urlToRoute("http://mikebook.velir.com:3000/");
    expect(route).to.deep.equal({ page: "" });
  });

  it("should correctly redirect bad path to the homepage", () => {
    const location = urlToLocation("http://mikebook.velir.com:3000/not-found");
    const action = handleUrlChange(location);
    expect(action).to.deep.equal(redirectTo({ page: "" }));
  });

});

describe("datasets route", function(){

  /* routeToUrl */

  it("should correctly generate the datasets path", () => {
    const url = routeToUrl({ page: "datasets" });
    expect(url).to.equal("/datasets");
  });

  it("should correctly generate the datasets path with args", () => {
    const url = routeToUrl({ page: "datasets", filter: 22, sort: "asc" });
    expect(url).to.equal("/datasets/filter/22/sort/asc");
  });

  it("should correctly generate the datasets path with an empty arg", () => {
    const url = routeToUrl({ page: "datasets", filter: 22, sort: "" });
    expect(url).to.equal("/datasets/filter/22/sort");
  });

  /* locationToRoute */

  it("should correctly match the datasets path with args", () => {
    const route = urlToRoute("http://mikebook.velir.com:3000/datasets/filter/22/sort/asc");
    expect(route).to.deep.equal({ page: "datasets", filter: 22, sort: "asc" });

  });

});

describe("dataset route", function(){

  /* routeToUrl */

  it("should correctly generate the dataset path", () => {
    const url = routeToUrl({ page: "dataset", id: "2" });
    expect(url).to.equal("/dataset/2");
  });

  it("should correctly generate the dataset path with args", () => {
    const url = routeToUrl({ page: "dataset", id: "2", filter: "22", sort: "asc" });
    expect(url).to.equal("/dataset/2/filter/22/sort/asc");
  });

  it("should correctly generate the dataset path with args that begin with numbers", () => {
    const url = routeToUrl({ page: "dataset", id: "2", filter: "22a", sort: "asc" });
    expect(url).to.equal("/dataset/2/filter/22a/sort/asc");
  });


  /* locationToRoute */

  it("should correctly match the datasets path with args", () => {
    const route = urlToRoute("http://mikebook.velir.com:3000/dataset/2/filter/22/sort/asc");
    expect(route).to.deep.equal({ page: "dataset", id: "2", filter: 22, sort: "asc" });
  });

  it("should correctly match the datasets path with args that begin with numbers", () => {
    const route = urlToRoute("http://mikebook.velir.com:3000/dataset/2/filter/22a/sort/asc");
    expect(route).to.deep.equal({ page: "dataset", id: "2", filter: "22a", sort: "asc" });
  });



});
