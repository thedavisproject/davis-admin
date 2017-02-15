const gulp     = require("gulp");
const quench   = require("../quench.js");
const svgmin   = require("gulp-svgmin");
const svgstore = require("gulp-svgstore");
const rename   = require("gulp-rename");
const debug    = require("gulp-debug");


/**
 * Usage: put svg's in svg.src directory.  eg. /img/svg-sprite/my-icon.svg
 *        They will be compiled into svg.filename. eg. /img/svg-sprite.svg
 *
 * In html: <svg><use xlink:href="/img/svg-sprite.svg#my-icon"></use></svg>
 *
 * In css: svg { fill: BlanchedAlmond; }
 */

module.exports = function svgSpriteTask(config, env){

  // svg config
  const svg = {
    src   : config.root + "/img/svg-sprite/**/*.svg",
    dest  : config.dest + "/img",
    filename : "svg-sprite.svg",
    svgmin: {},
    svgstore: {
      inlineSvg: false
    }
  };

  // register the watch
  quench.registerWatcher("svg-sprite", [
    config.root + "/img/svg-sprite/**/*.svg"
  ]);

  // generate svg sprite
  gulp.task("svg-sprite", function(){

    return gulp.src(svg.src)
      .pipe(quench.drano())
      .pipe(env.production( svgmin(svg.svgmin) ))
      .pipe(svgstore(svg.svgstore))
      .pipe(rename(svg.filename))
      .pipe(gulp.dest(svg.dest))
      .pipe(debug({title: "svg-sprite:"}));
  });
};
