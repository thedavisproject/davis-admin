const gulp        = require("gulp");
const quench      = require("../quench.js");
const uglify      = require("gulp-uglify");
const rename      = require("gulp-rename");
const debug       = require("gulp-debug");
const sourcemaps  = require("gulp-sourcemaps");
const browserify  = require("browserify");
const vinylSource = require("vinyl-source-stream");
const vinylBuffer = require("vinyl-buffer");

module.exports = function jsLibrariesTask(config, env){

  const js = {

    src: config.taskConfig.js.src,

    dest: config.dest + "/js",

    filename: "libraries.js",

    // js uglify options. to skip, set value to false or omit entirely
    // otherwise, pass options object (can be empty {})
    uglify: {},

    // browserify options
    browserify: {
      // enable sourcemaps for development
      debug: env.development()
    }
  };

  // register the watch
  quench.registerWatcher("js-libraries", [
    quench.findPackageJson()
  ]);

  gulp.task("js-libraries", function(){

    const npmPackages = quench.findAllNpmDependencies(js.src);

    return getNpmStream(npmPackages, js.filename, js.browserify)
      .pipe(quench.drano())
      .pipe(sourcemaps.init({ loadMaps: true })) // loads map from browserify file
      .pipe(env.production( uglify(js.uglify) ))
      .pipe(rename({
        suffix: "-generated"
      }))
      .pipe(sourcemaps.write("./"))
      .pipe(gulp.dest(js.dest))
      .pipe(debug({title: "js-libraries: "}));
  });
};

// http://stackoverflow.com/questions/30294003/how-to-avoid-code-duplication-using-browserify/30294762#30294762
// create browserify bundle with the npm packages exposed
function getNpmStream(externalPackages, filename, browserifyOptions){

  // will expose externalPackages, eg. "react"
  const b = browserify(Object.assign({}, browserifyOptions, {
    require: externalPackages
  }));

  quench.logYellow("npm packages", externalPackages);

  return b.bundle()
    .pipe(vinylSource(filename)) // bs to make it work with gulp
    .pipe(vinylBuffer()); // https://github.com/gulpjs/gulp/issues/369 more bs to make it work with gulp;
}
