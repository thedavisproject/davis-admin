const gulp = require("gulp"),
  quench = require("../quench.js"),
  debug = require("gulp-debug");

module.exports = function copyTask(config, env) {

  // copy files settings
  const copy = {
    src: [config.root + "/index.html"],
    dest: config.dest
  };

  // register the watch
  quench.registerWatcher("copy", copy.src);

  /* copy files */
  gulp.task("copy", function() {

    return gulp.src(copy.src)
      .pipe(quench.drano())
      .pipe(gulp.dest(copy.dest))
      .pipe(debug({title: "copy:"}));
  });
};
