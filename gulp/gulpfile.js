/**
 *  Usage:
 *      Once per computer:
 *         $ npm install -g gulp-cli
 *
 *      Once per project, in gulp folder:
 *         $ npm install
 *
 *
 *      Running clumped tasks (defined in this file) --
 *      see quench.js build function
 *         $ gulp dev
 *
 *      Running single task (task defined in /tasks.  eg. /tasks/css.js)
 *         $ gulp css                  // will use the default environment
 *         $ gulp css --env production // will use the production environment
 *         $ gulp css --watch          // will override the watch configuration
 *
 *      For details on build config, see "user supplied keys" in quench.js
**/

// Include gulp and plugins
const gulp   = require("gulp");
const quench = require("./quench.js");
const path   = require("path");


// tasks: can run in parallel or in series, see "user supplied keys" in quench.js
const defaultTasks = [ "js", "css", "copy" ];



// default configuration
const defaults = {
  root: path.resolve(__dirname, "../client"),
  server: path.resolve(__dirname, "../server"),
  dest: path.resolve(__dirname, "../build"),
  tasks: defaultTasks,
  env: "development", // "development", "production", "local"
  watch: false
};

/* watch for single tasks on the command line, eg "gulp js" */
quench.singleTasks(defaults);

/**
 * development task
 * Default Task (run when you run 'gulp').
 */
gulp.task("default", function(next){
  const config = Object.assign({}, defaults, {
    env: "development",
    watch: true,
    tasks: [[...defaultTasks, "server"], "browser-sync"] // run server too
  });

  quench.build(config, next);
});

/**
 * production task
 */
gulp.task("prod", function(next) {

  const config = Object.assign({}, defaults, {
    env: "production",
    watch: false
  });

  quench.build(config, next);

});

/**
 * build for development without a watcher
 */
gulp.task("build", function(next) {

  const config = Object.assign({}, defaults, {
    env: "development",
    watch: false
  });

  quench.build(config, next);

});
