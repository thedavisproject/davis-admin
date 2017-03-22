const gulp           = require("gulp");
const quench         = require("../quench.js");
const concat         = require("gulp-concat");
const filter         = require("gulp-filter");
const rename         = require("gulp-rename");
const debug          = require("gulp-debug");
const uglify         = require("gulp-uglify");
const sourcemaps     = require("gulp-sourcemaps");
const mainBowerFiles = require("main-bower-files");
const path           = require("path");

module.exports = function jsPolyfillTask(config, env) {

  // polyfill config
  const polyfill = {
    root: config.root + "/polyfill",
    filename: "polyfill.js",
    dest: config.dest + "/js",
    uglify: {}
  };

  const bowerJson = path.resolve(polyfill.root + "/bower.json");

  // watch bower.json to regenerate bundle
  quench.registerWatcher("polyfill", [bowerJson]);

  /* bundle up polyfill libraries */
  // http://engineroom.teamwork.com/hassle-free-third-party-dependencies/
  gulp.task("js-polyfill", function(next) {

    if (!polyfill || !polyfill.root || !quench.fileExists(bowerJson)) {
      quench.logYellow("js-polyfill", "bower not configured");
      next();
      return;
    }

    // https://github.com/ck86/main-bower-files
    // mainBowerFiles returns array of "main" files from bower.json
    const bowerfiles = mainBowerFiles({checkExistence: true, paths: polyfill.root, debugging: false});

    if (bowerfiles.length === 0) {
      next();
      return;
    }

    // log the bower files to the gulp output
    quench.logYellow("polyfill files", "\n\t" + bowerfiles.join("\n\t"));

    // make js
    return gulp.src(bowerfiles)
      .pipe(quench.drano())
      .pipe(filterByExtension("js"))
      .pipe(sourcemaps.init()) // start sourcemaps

      // putting a ; between each file to avoid problems when a library doesn't end in ;
      .pipe(concat(polyfill.filename, {newLine: ";"}))
      .pipe(env.production(uglify(polyfill.uglify)))
      .pipe(rename({suffix: "-generated"}))
      .pipe(sourcemaps.write("./")) // end sourcemaps
      .pipe(gulp.dest(polyfill.dest))
      .pipe(debug({title: "js-polyfill: "}));

  });

};

function filterByExtension(extension) {
  return filter(function(file) {
    return file.path.match(new RegExp("." + extension + "$"));
  });
}
