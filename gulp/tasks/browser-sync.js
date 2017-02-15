/**
 * This is a special task, do not include this in your build.tasks configuration.
 * This is handled in quench.js by passing browserSync: true
 * in the build config to quench.build().
 */
const gulp        = require("gulp");
const quench      = require("../quench.js");
const path        = require("path");
const browserSync = require("browser-sync").create();

module.exports = function(config) {

  const serverRoot = path.resolve(config.dest);

  // browserSync settings
  const settings = {
    port: config.local.browserSyncPort || 3000,
    open: false, // or  "external"
    notify: false,
    ghostMode: false,

    // watch these files and reload the browser when they change
    files: [
      serverRoot + "/**",
      // prevent browser sync from reloading twice when the regular file (eg. index.js)
      // and the map file (eg. index.js.map) are generated
      "!**/*.map"
    ]
  };


  // if we're using the server task, proxy the server
  if (config.tasks.includes("server")){
    settings.proxy = "http://localhost:3030"; // /server/server.js
  }
  // set the server root, or proxy if it's set in local.js
  // use proxy if you have a server running the site already (eg, IIS)
  else if (config.local.hostname) {
    // http://www.browsersync.io/docs/options/#option-proxy
    settings.proxy = config.local.hostname;
  }
  else {
    const historyApiFallback = require("connect-history-api-fallback");

    // http://www.browsersync.io/docs/options/#option-server
    settings.server = {
      baseDir: serverRoot,
      middleware: [
        // https://github.com/BrowserSync/browser-sync/issues/204
        historyApiFallback({
          // verbose: true
        })
      ]
    };
  }


  /* start browser sync if we have the "watch" option */
  gulp.task("browser-sync", function() {

    if (config.watch === true) {
      quench.logYellow("watching", "browser-sync:", JSON.stringify(settings.files, null, 2));
      browserSync.init(settings);
    }

  });
};
