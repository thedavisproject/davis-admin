const gulp   = require("gulp");
const quench = require("./quench.js");
const debug  = require("gulp-debug");
const R      = require("ramda");

module.exports = function copyTask(taskName, userConfig) {

  const copyConfig = R.merge({
    /**
     * src       : glob of files to copy
     * dest      : destination folder
     * base      : *optional https://github.com/gulpjs/gulp/blob/master/docs/API.md#optionsbase
     * watch     : files to watch that will trigger a rerun when changed
     */
  }, userConfig);

  const { src, dest, base, watch } = copyConfig;

  if (!src || !dest){
    quench.logError(
      "Copy task requires src and dest!\n",
      `Was given ${JSON.stringify(copyConfig, null, 2)}`
    );
    process.exit();
    return;
  }


  // copy files
  gulp.task(taskName, function(next) {
    return gulp.src(src, { base: base })
      .pipe(quench.drano())
      .pipe(gulp.dest(dest))
      .pipe(debug({ title: `${taskName}:` }));
  });

  // run this task and watch if specified
  quench.maybeWatch(taskName, watch || src);

};
