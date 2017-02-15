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
const gulp = require("gulp"),
  quench = require("./quench.js"),
  path   = require("path");

const app = path.resolve(__dirname, "../app");

// default configuration
const defaults = {
  root: app,
  server: path.resolve(__dirname, "../server"),
  dest: path.resolve(__dirname, "../build"),
  tasks: [ "js", "js-libraries", "css", "bower", "svg-sprite", "copy" ],
  env: "development", // "development", "production", "local"
  watch: false,
  browserSync: false,

  // config for more than one tasks to share
  taskConfig: {
    js: {
      src: app + "/js/index.js" // both js and js-libraries use this
    }
  }
};

/* watch for single tasks on the command line, eg "gulp js" */
quench.singleTasks(defaults);

/**
 * development task
 * Default Task (run when you run 'gulp').
 */
gulp.task("default", function(next) {

  const config = Object.assign({}, defaults, {
    env: "development",
    watch: true,
    browserSync: true
  });

  quench.build(config, next);

});

gulp.task("server", function(next){
  const config = Object.assign({}, defaults, {
    env: "development",
    watch: true,
    browserSync: true,
    tasks: defaults.tasks.concat("server")
  });

  quench.build(config, next);
});

/**
 * production task
 */
gulp.task("prod", function(next) {

  const config = Object.assign({}, defaults, {
    env: "production",
    watch: false,
    browserSync: false
  });

  quench.build(config, next);

});

/**
 * build for development without a watcher
 */
gulp.task("build", function(next) {

  const config = Object.assign({}, defaults, {
    env: "development",
    watch: false,
    browserSync: false
  });

  quench.build(config, next);

});
