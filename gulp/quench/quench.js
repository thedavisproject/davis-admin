/**
 *    Quench: utilities for gulp builds
 *    v4.0.1
 */
const gulp         = require("gulp");
const plumber      = require("gulp-plumber");
const notify       = require("gulp-notify");
const env          = require("gulp-environments");
const fs           = require("fs");
const path         = require("path");
const color        = require("cli-color");
const watch        = require("gulp-watch");
const R            = require("ramda");
const detective    = require("detective-es6");

const environments = ["development", "production", "local"];

/**
 * Exposed functions: (see function comments for more details)
 *   getEnv
 *   isWatching
 *   maybeWatch
 *   logHelp
 *   drano
 *   logYellow
 *   logError
 *   findAllNpmDependencies
 *   loadLocalJs
 */


/**
 * command line flags
 *
 *   --watch defaults to true
 *           can do --no-watch to set it to false
 *
 *   --env defaults to "local"
 *         see environments above for other values
 *
 *   eg. gulp build --no-watch --env production
 */
const yargOptions = {
  "watch": {
    default: true,
    type: "boolean"
  },
  "env": {
    default: "local",
    type: "string"
  }
};

const yargs = require("yargs").options(yargOptions).argv;


/* when this file is loaded, init */
initEnv();

/* load local.js when this file is loaded */
const localJsPath = path.join(__dirname, "..", "local.js");
const localJs = fileExists(localJsPath) ? require(localJsPath) : {};


/**
 * @return {Object} the contents of local.js
 */
module.exports.loadLocalJs = function loadLocalJs(){
  return localJs;
};


/**
 * initialize gulp-environments with our environments above
 * https://github.com/gunpowderlabs/gulp-environments
 * @return {Nothing} nothing
 */
function initEnv(){

  // this will be called everytime this file is loaded in a new process
  // (eg. if nodemon starts server.js that imports quench)
  // don't init if we've already init'ed
  if (!R.isNil(process.env.NODE_ENV)){
    return;
  }

  // register the environments with gulp-environments
  environments.forEach(function(environment) {
    env[environment] = env.make(environment);
  });


  // validate the env
  if (environments.indexOf(yargs.env) === -1) {
    logError("Environment '" + yargs.env + "' not found! Check your spelling or add a new environment in quench.js.");
    logError("Valid environments: " + environments.join(", "));
    process.exit();
  }

  // set NODE_ENV https://facebook.github.io/react/downloads.html#npm
  process.env.NODE_ENV = yargs.env;
  // set gulp-environments
  env.current(env[yargs.env]);

  console.log(color.green("Building for '" + yargs.env + "' environment"));
}


/**
 * @return {Function} an instance of gulp-environments
 */
module.exports.getEnv = function getEnv(){
  return env;
};


/**
 * Returns the value of yargs.watch
 * the cli can change it by adding options:
 *   --watch     << true
 *   --no-watch  << false
 *               << undefined
 * @return {Boolean} true, false, or undefined
 */
const isWatching = module.exports.isWatching = function isWatching(){
  return yargs.watch;
};


/**
 * watches the glob if --watch is passed on the command line
 * @param  {String} taskName the name of the task
 * @param  {String} glob files to watch
 * @param  {Function} task task to run
 * @return {Nothing} nothing
 */
module.exports.maybeWatch = function maybeWatch(taskName, glob, task){

  // if --watch was provided on the command line
  if (yargs.watch){

    // alert the console that we're watching
    logYellow("watching", taskName + ":", JSON.stringify(glob, null, 2));

    // if there is a taks, watch and run that task
    if (task){
      return watch(glob, task);
    }
    // otherwise, watch and start the taskName
    else {
      return watch(glob, function(){
        gulp.start([ taskName ]);
      });
    }

  }

};


/**
 * log out a help message, including available gulp tasks and --watch/env details
 * @return {Nothing} will print to the console
 */
module.exports.logHelp = function logHelp(){

  console.log("");
  console.log("Available commands: ");
  console.log("");

  Object.keys(gulp.tasks)
    .filter(taskName => taskName !== "default")
    .forEach(taskName => {
      console.log(`  gulp ${taskName}`);
    });

  console.log("");

  console.log("By default, all tasks will run with `watch` as true.");
  console.log("You can pass --no-watch to disable watching.");

  console.log("");

  console.log("By default, the environment is set to `local`.");
  console.log("You can override this by passing --env [anotherEnv].");
  const envs = environments.map(env => `"${env}"`).join(", ");
  console.log(`Valid environments are ${envs}`);

  console.log("");

};


/**
 * drano: make plumber with error handler attached
 * see https://www.npmjs.com/package/gulp-plumber
 * eg: .pipe(quench.drano())
 * @return {Function} augmented plumber
 */
module.exports.drano = function drano() {
  return plumber({
    errorHandler: function(error) {

      // gulp notify is freezing jenkins builds, so we're only going to show this message if we're watching
      if (isWatching()) {
        notify.onError({ title: "<%= error.plugin %>", message: "<%= error.message %>", sound: "Beep" })(error);
      }
      else {
        logError(error.plugin + ": " + error.message);
        process.exit(1);
      }
      this.emit("end");
    }
  });
};



/**
 * logYellow: will log the output with the first arg as yellow
 * eg. logYellow("watching", "css:", files) >> [watching] css: ["some", "files"]
 * @return {Nothing} nothing
 */
const logYellow = module.exports.logYellow = function logYellow() {

  const args = (Array.prototype.slice.call(arguments));
  const first = args.shift();

  if (args.length) {

    const argString = args.map(function(arg) {
      return (typeof arg === "object")
        ? JSON.stringify(arg)
        : arg.toString();
    }).join(" ");

    console.log("[" + color.yellow(first) + "]", argString);
  }
};


/**
 * logError: will log the output in red
 * @return {Nothing} nothing
 */
const logError = module.exports.logError = function logError() {

  const args = (Array.prototype.slice.call(arguments));

  if (args.length) {

    const argString = args.map(function(arg) {
      // return (typeof arg  === "object") ? JSON.stringify(arg) : arg.toString();
      return arg.toString();
    }).join("");

    console.log("[" + color.red("error") + "]", color.red(argString));
  }

};


/**
 * fileExists
 * @param  {String} filepath : path to the file
 * @return {Boolean} true if the filepath exists and is readable
 */
function fileExists(filepath) {
  try {
    fs.accessSync(filepath, fs.R_OK);
    return true;
  }
  catch(e) {
    return false;
  }
}


/**
 * findAllNpmDependencies: given an entry entryFilePath, recurse through the
 *   imported files and find all npm modules that are imported
 * @param  {String} entryFilePath: eg. "app/js/index.js"
 * @return {Array} an array of package names (strings).
 *                 eg ["react", "react-dom", "classnames"]
 */
module.exports.findAllNpmDependencies = function findAllNpmDependencies(entryFilePath){

  try {
    // eg. import "./polyfill", resolve it to "./polyfill.js" or "./polyfill/index.js"
    const entryFile = require.resolve(entryFilePath);

    // list of all imported modules and files from the entryFilePath
    // eg. ["react", "../App.jsx"]
    const imports = detective(fs.readFileSync(entryFile, "utf8"))
      .map(moduleOrFilePath => {
        // if this is a relativePath (begins with .), then resolve the path
        // from the current entryFilePath directory name
        return (R.test(/^(\.)/, moduleOrFilePath))
          ? path.resolve(path.dirname(entryFile), moduleOrFilePath)
          : moduleOrFilePath;
      });

    // list of all the modules in this entryFilePath
    const modules = R.reject(fileExists, imports);

    // list of all the modules in imported files
    const importedFilesModules = R.compose(
      R.chain(findAllNpmDependencies), // recurse, and flatten
      R.filter(fileExists)             // only look in files, not modules
    )(imports);

    // a set of the modules from this file + the modules from imported paths
    const allModules = R.uniq(R.concat( modules, importedFilesModules ));

    return allModules;

  }
  catch(e) {
    logError("findAllNpmDependencies failed :( ", e);
    return [];
  }
};
