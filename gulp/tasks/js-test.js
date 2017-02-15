const gulp       = require("gulp");
const quench     = require("../quench.js");
const debug      = require("gulp-debug");
const mocha      = require("gulp-mocha");
const browserify = require("browserify");
const through2   = require("through2");
const babelify   = require("babelify");
const vinylPaths = require("vinyl-paths");
const del        = require("del");


const rename = require("gulp-rename");

module.exports = function jsTestTask(config, env) {

  // test files settings
  const testConfig = {
    src: [config.root + "/js/**/*.test.js"],
    mocha : {
      // reporter: "nyan"
    },
    babel: {
      presets: ["es2015"]
    }
  };

  // register the watch
  quench.registerWatcher("js-test", testConfig.src);


  gulp.task("js-test", function() {

    return gulp.src(testConfig.src, { base: "./" })
      .pipe(quench.drano())

      .pipe(debug({title: "test:"}))
      .pipe(transpile())

      // write the files to disk, because mocha only take files paths, not file streams
      .pipe(rename({ extname: ".es6.js" }))
      .pipe(gulp.dest("./"))

      .pipe(mocha(testConfig.mocha))

      // https://github.com/gulpjs/gulp/blob/master/docs/recipes/delete-files-folder.md
      // after the tests have run, remove the transpiled files
      .pipe(vinylPaths(del));
  });
};


// Create a bundle of the files in the stream using browserify
function transpile(browserifyOptions){

  return through2.obj(function (file, enc, callback){

    // https://github.com/substack/node-browserify/issues/1044#issuecomment-72384131
    const b = browserify(browserifyOptions || {}) // pass options
      .add(file.path) // this file
      .transform(babelify, { presets: ["es2015", "react"] }); // run it through babel, for es6 transpiling

    b.bundle(function(err, res){
      if (err){
        callback(err, null); // emit error so drano can do it's thang
      }
      else {
        file.contents = res; // assumes file.contents is a Buffer
        callback(null, file); // pass file along
      }
    });

  });
}
