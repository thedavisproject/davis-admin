const gulp = require("gulp");
const runSequence = require("run-sequence");

const quench                = require("../quench/quench.js");
const createCopyTask        = require("../quench/createCopyTask.js");
const createJsTask          = require("../quench/createJsTask.js");
const createCssTask         = require("../quench/createCssTask.js");
const createBrowserSyncTask = require("../quench/createBrowserSyncTask.js");
const createNodemonTask     = require("../quench/createNodemonTask.js");

module.exports = function davisTask(projectRoot) {

  const davisBuild = `${projectRoot}/build`;
  const clientRoot = `${projectRoot}/client`;
  const serverRoot = `${projectRoot}/server`;

  gulp.task("davis", function(cb){

    createCopyTask("davis-copy-index", {
      src: `${clientRoot}/index.html`,
      dest: davisBuild
    });

    createCopyTask("davis-copy-images", {
      src: `${clientRoot}/img/**`,
      dest: `${davisBuild}/img`
    });

    createJsTask("davis-js", {
      dest: `${davisBuild}/js/`,
      files: [
        {
          gulpTaskId: "davis-js-index",
          entry: `${clientRoot}/js/index.js`,
          filename: "index.js",
          watch: [
            `${clientRoot}/js/**/*.js`,
            `${clientRoot}/js/**/*.jsx`
          ]
        },
        {
          gulpTaskId: "davis-js-polyfill",
          entry: `${clientRoot}/polyfill/index.js`,
          filename: "polyfill.js",
          watch: [
            `${clientRoot}/polyfill/**`
          ]
        }
      ]
    });

    createCssTask("davis-css", {
      src: [
        `${clientRoot}/scss/**/*.scss`,
        `${clientRoot}/js/**/*.scss`
      ],
      dest: `${davisBuild}/css/`,
      watch: [
        `${clientRoot}/scss/**/*.scss`,
        `${clientRoot}/js/**/*.scss`
      ],
      filename: "index.css"
    });


    createBrowserSyncTask("davis-browser-sync", {
      proxy: "http://localhost:3030",
      files: [
        `${davisBuild}/**`,
        "!**/*.map"
      ]
    });

    createNodemonTask("davis-server", {
      script: `${serverRoot}/server.js`,
      watch: `${serverRoot}/server.js`,
      ext: "js html",
      env: { "NODE_ENV": "development" }
    });



    const davisTasks = ["davis-js", "davis-css", "davis-copy-index", "davis-copy-images"];

    if (quench.isWatching()){
      return runSequence([...davisTasks, "davis-server"], "davis-browser-sync");
    }
    else {
      return runSequence(davisTasks);
    }

  });

};
