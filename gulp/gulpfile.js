/**
 *  See ./readme.md for usage
**/

// Include gulp and plugins
const gulp   = require("gulp");
const quench = require("./quench/quench.js");
const path   = require("path");

const createBuildTask = require("./tasks/build.js");

const projectRoot = path.resolve(__dirname, "..");


/**
 * gulp build
 *
 * to build for prduction/jenkins:
 *    gulp build --no-watch --env production
 */
gulp.task("build", createBuildTask(projectRoot));


/* gulp */
gulp.task("default", quench.logHelp);
