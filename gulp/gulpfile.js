/**
 *  See ./readme.md for usage
**/

// Include gulp and plugins
const gulp   = require("gulp");
const quench = require("./quench/quench.js");
const path   = require("path");

const createDavisTask = require("./tasks/davis.js");

const projectRoot = path.resolve(__dirname, "..");


/* gulp davis */
createDavisTask(projectRoot);


/* gulp */
gulp.task("default", quench.logHelp);
