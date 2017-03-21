/**
 *    Quench: utilities for gulp builds
 */
const gulp     = require("gulp"),
  plumber      = require("gulp-plumber"),
  notify       = require("gulp-notify"),
  env          = require("gulp-environments"),
  fs           = require("fs"),
  path         = require("path"),
  runSequence  = require("run-sequence"),
  color        = require("cli-color"),
  watch        = require("gulp-watch"),
  R            = require("ramda"),
  detective    = require("detective-es6");

const environments = ["development", "production", "local"];

/**
 * Task files (located in ./tasks/ should be modules that export a function
 * eg: module.exports = function cssTask(config, env){ ... }
 *
 * The function should register watcher via quench.registerWatcher and
 * create a gulp task with gulp.task().  The task name should be exactly the
 * same as the filename.  eg. js-common.js should define the "js-common" task
 *
 * The parameters passed to this module's function:
 * @param config: the object passed to build() in gulpfile.js.  this can
 *                be used to configure the tasks.  It is also augmented with
 *                config.local from local.js
 *                See config below
 * @param env   : an instance of gulp-environments.  Basic usage:
 *                eg: env.development() ? "nested" : "compressed"
 *                eg: .pipe(env.production(uglify()))
 *                see https://github.com/gunpowderlabs/gulp-environments
 */

/**
 * Exposed functions: (see function comments for more details)
 *     drano
 *     registerWatcher
 *     build
 *     logYellow
 *     logError
 *     singleTasks
 *     findPackageJson
 *     getInstalledNPMPackages
 */

/**
 *    config: an object passed to build and augmented with the following keys:
 *
 *    reserved keys: {
 *        local: {},
 *        watchers: []
 *    }
 *
 *    user supplied keys: eg. {
 *        root: path.resolve(__dirname, "../../web/Website/assets"),
 *        dest: path.resolve(__dirname, "../../web/Website/assets/build"),
 *        env: "development", // "development", "production", or "local"
 *        tasks: ["js", "css"],
 *        watch: true,
 *        browserSync: true,
 *        vmSync: false
 *    }
 *
 */
let config = {};

// register the environments with gulp-environments
environments.forEach(function(environment) {
  env[environment] = env.make(environment);
});

// --watch will be treated as a boolean
// https://www.npmjs.com/package/yargs#and-if-you-really-want-to-get-all-descriptive-about-it
const argv = require("yargs").boolean("watch").argv;


/**
 * getTaskPath: Given a task name, get the require-able path to the javascript file
 * @param  {String} task: the name of the task that is located in ./tasks.  Do not include the file extension (.js)
 * @return {String} The relative path to the task file
 */
function getTaskPath(task) {
  return path.join(__dirname, "tasks", task + ".js");
}


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
      if (config.watch) {
        notify.onError({title: "<%= error.plugin %>", message: "<%= error.message %>", sound: "Beep"})(error);
      } else {
        logError(error.plugin + ": " + error.message);
        process.exit(1);
      }
      this.emit("end");
    }
  });
};


/**
 * registerWatcher: add a function to the watchers
 * @param  {String} watcherTask : a task name, eg: "css"
 * @param  {Array} watcherFiles : Array of globs
 * @usage quench.registerWatcher("js", [ config.root + "/js/*.js"]);
 * @return {Nothing} nothing
 */
module.exports.registerWatcher = function registerWatch(watcherTask, watcherFiles) {

  config.watchers = config.watchers || [];

  config.watchers.push({task: watcherTask, files: watcherFiles});
};


/**
 * build: load and start tasks
 * @param  {Object}   _config : see "var config" above
 * @param  {Function} callback: function to call after this build is finished.
 *                              use with https://github.com/gulpjs/gulp/blob/master/docs/API.md#accept-a-callback
 * @return {Nothing} nothing
 */
const build = module.exports.build = function build(_config, callback) {

  config = _config;

  if (!config || !config.root || !config.dest) {
    logError("config.root and config.dest are required!");
    console.log("config:", JSON.stringify(config, null, 2));
    process.exit();
  }

  if (!config.tasks || config.tasks.length === 0) {
    logError("No tasks loaded! Make sure you pass config.tasks as an array of task names to quench.build(config)!");
    console.log("config:", JSON.stringify(config, null, 2));
    process.exit();
  }

  // if no callback was passed, use an empty function
  if (typeof(callback) === "undefined") {
    callback = function() {};
  }

  // set the environment
  const environment = argv.env || config.env;
  if (environment) {

    // make sure config.env is up to date (if argv.env was specified)
    config.env = environment;

    // validate the env
    if (environments.indexOf(environment) === -1) {
      logError("Environment '" + environment + "' not found! Check your spelling or add a new environment in quench.js.");
      logError("Valid environments: " + environments.join(", "));
      process.exit();
    }

    // set NODE_ENV https://facebook.github.io/react/downloads.html#npm
    process.env.NODE_ENV = environment;
    // set gulp-environments
    env.current(env[environment]);

    if (config.watch) {
      // gulp notify is freezing jenkins builds, so we're only going to show this message if we're watching
      gulp.src("").pipe(notify("Building for '" + config.env + "' environment"));
    } else {
      console.log(color.green("Building for '" + config.env + "' environment"));
    }

  }

  // load local.js config or initalize to empty object
  const localJs = path.join(__dirname, "local.js");
  config.local = fileExists(localJs) ? require(localJs) : {};

  // loadTasks: given an array of tasks, require them, and pass params
  config.tasks.forEach(function(name) {
    // console.log("loading task: ", name);
    const taskFactory = require(getTaskPath(name));
    taskFactory(config, env);
  });

  // start watchers if specified
  if (config.watch && config.watchers) {

    // start the gulp watch for each registered watcher
    config.watchers.forEach(function(watcher) {

      logYellow("watching", watcher.task + ":", JSON.stringify(watcher.files, null, 2));

      // using gulp-watch instead of gulp.watch because gulp-watch will
      // recognize when new files are added/deleted.
      watch(watcher.files, function() {
        gulp.start([watcher.task]);
      });
    });
  }

  if (config.tasks && config.browserSync) {
    // browserSync needs special treatment because it needs to be started AFTER the
    // build directory has been created and filled (for livereload to work)
    require(getTaskPath("browser-sync"))(config, env);
    runSequence(config.tasks, "browser-sync", callback);
  }
  else if (config.tasks) {
    // or just run the tasks
    runSequence(config.tasks, callback);
  }
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

    console.log("[" + color.red("error") + "]", argString);
  }

};


/**
 * singleTasks: watch the command for single tasks, eg "gulp js"
 * @param  {Object} config: config object to be used with build
 * @return {Nothing} nothing
 * @example
 *     Running single task (task defined in /tasks.  eg. /tasks/css.js)
 *         $ gulp css                  // will use the environment from config
 *         $ gulp css --env production // will use the production environment
 *         $ gulp css --watch          // will override the watch configuration
 */
module.exports.singleTasks = function singleTasks(config) {

  // argv._ are the non-hyphenated options passed to gulp
  // eg: `gulp css js`, argv._ would be ["css", "js"]
  if (argv._.length) {

    // filter out tasks that don't exist
    const tasks = argv._.filter(function(task) {
      // console.log(getTaskPath(task));
      return fileExists(getTaskPath(task));
    });

    if (tasks.length) {

      const watch = (typeof argv.watch !== "undefined")
        ? {
          watch: argv.watch
        }
        : {};

      // load and build those tasks
      build(Object.assign({}, config, watch, {tasks: tasks}));
    }
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
  } catch (e) {
    return false;
  }
}


/**
 * findPackageJson: recursively walk up the directory ancestry to find package.json
 * @param  {String} dirname: optional, will use __dirname if missing
 * @return {String} the filepath of package.json in this directory,
 *                  or any parent directory
 */
module.exports.findPackageJson = function findPackageJson(dirname) {

  // use the current directory if dirname wasn't provided.
  if (typeof(dirname) === "undefined") {
    dirname = path.resolve(__dirname);
  }

  // use absolute path
  dirname = path.resolve(dirname);

  // create a filepath to package.json in this directory
  const filepath = path.resolve(dirname, "package.json");

  // check if it's there, if so, return the directory
  if (fileExists(filepath)) {
    return filepath;
  }

  // otherwise, check the parent
  const parent = path.resolve(dirname, "..");

  // if we've hit the root and haven't found it, return undefined
  if (parent === dirname) {
    return;
  }

  // otherwise, recurse into the parent
  return findPackageJson(parent);
};


/**
 * findAllNpmDependencies: given an entry entryFilePath, recurse through the imported
 *   files and find all npm modules that are imported
 * @param  {String} entryFilePath: eg. "app/js/index/js"
 * @return {Array} an array of package names (strings).
 *                 eg ["react", "react-dom", "classnames"]
 */
module.exports.findAllNpmDependencies = function findAllNpmDependencies(entryFilePath){
  try {

  // list of all imported modules and files from the entryFilePath
  // eg. ["react", "../App.jsx"]
    const imports = detective(fs.readFileSync(entryFilePath, "utf8"))
      .map(moduleOrFilePath => {
        // if this is a relativePath (begins with .), then resolve the path
        // from the current entryFilePath directory name
        return (R.test(/^(\.)/, moduleOrFilePath))
          ? path.resolve(path.dirname(entryFilePath), moduleOrFilePath)
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
    const allModules = R.uniq(
      R.concat( modules, importedFilesModules )
    );

    return allModules;

  }
  catch(e) {
    logError("findAllNpmDependencies failed :(");
    return [];
  }
};
