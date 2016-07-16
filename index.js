'use strict';

// Modules:
var path       = require('path');
var gulpLess   = require('gulp-less');
var gulpRename = require('gulp-rename');

// Exports:
module.exports = {
  less: gulpLess,
  lessTask: lessTask,
  watch: true
};

function lessTask (options) {

  options = config(options);

  function error (e) {
    console.log(e.message);
    this.emit('end');
  }

  // Task:
  return function () {

    var gulp     = this;
    var dest     = path.dirname(options.dest);
    var filename = path.basename(options.dest);

    return gulp.src(options.src)
      .pipe(gulpLess({
        // TODO less options
        })
      )
      .on('error', error)
      .pipe(gulpRename(filename))
      .pipe(gulp.dest(dest));
  };
}

function config (options) {

  // Defaults:
  options = options || {};
  options.dest = './build/styles-bundle.css';

  // Assertions:
  if (!options.src) throw new Error('less-recipe `options.src` required');

  return options;
}
