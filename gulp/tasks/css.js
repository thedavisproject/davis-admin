const gulp     = require("gulp"),
  quench       = require("../quench.js"),
  sass         = require("gulp-sass"),
  autoprefixer = require("gulp-autoprefixer"),
  pixrem       = require("gulp-pixrem"),
  rename       = require("gulp-rename"),
  debug        = require("gulp-debug"),
  header       = require("gulp-header"),
  concat       = require("gulp-concat"),
  sourcemaps   = require("gulp-sourcemaps");

module.exports = function cssTask(config, env) {

  // css settings
  const cssConfig = {
    src: [
      config.root + "/scss/**/*.scss",
      config.root + "/js/**/*.scss"
    ],
    dest: config.dest + "/css/",

    filename: "index.css",

    sass: {
      outputStyle: env.development() ? "nested" : "compressed"
    },

    autoprefixer: {
      browsers: ["> 1%", "last 2 versions", "Firefox ESR", "Opera 12.1", "ie >= 9"]
    }
  };

  // register the watch
  quench.registerWatcher("css", cssConfig.src);

  /* css task */
  gulp.task("css", function() {

    const gulpCss = gulp.src(cssConfig.src)
      .pipe(quench.drano())
      .pipe(sourcemaps.init())
      .pipe(sass(cssConfig.sass))
      .pipe(autoprefixer(cssConfig.autoprefixer))
      .pipe(pixrem("16px", {
        atrules: true,
        html: true
      }))
      .pipe(concat(cssConfig.filename, {newLine: ""}))
      .pipe(rename({suffix: "-generated"}));

    // only add the header text if this css isn't compressed
    if (cssConfig.sass && cssConfig.sass.outputStyle !== "compressed") {
      gulpCss.pipe(header("/* This file is generated.  DO NOT EDIT. */ \n"));
    }

    return gulpCss
      .pipe(sourcemaps.write("./"))
      .pipe(gulp.dest(cssConfig.dest))
      .pipe(debug({title: "css:"}));
  });
};
