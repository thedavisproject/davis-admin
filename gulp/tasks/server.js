const gulp    = require("gulp");
const nodemon = require("gulp-nodemon");

module.exports = function serverTask(config, env){

  gulp.task("server", function(){

    return nodemon({
      script: config.server + "/server.js",
      watch: config.server + "/server.js",
      ext: "js html",
      env: { "NODE_ENV": "development" }
    });
  });

  // const serverConfig = {
  //   src: config.server + "/**/*",
  //   script: config.server + "/server.js",
  //   dest: config.dest
  // };

  // gulp.task("copy-server", function(){
  //   return gulp.src(serverConfig.src, { base: config.root })
  //   .pipe(quench.drano())
  //   .pipe(gulp.dest(serverConfig.dest))
  //   .pipe(debug({title: "copy-server:"}));
  // });

};
