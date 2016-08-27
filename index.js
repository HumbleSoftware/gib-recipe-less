'use strict';

// Modules:
var pkg        = require('./package.json');
var path       = require('path');
var gulpLess   = require('gulp-less');
var gulpRename = require('gulp-rename');

// Locals:
var bus = null;

// Exports:
module.exports = {
  less: gulpLess,
  lessTask: lessTask,
  register: register,
  watch: true
};


function lessTask (options) {

  options = config(options);

  // Task:
  return function () {

    var gulp     = this;
    var dest     = path.dirname(options.dest);
    var filename = path.basename(options.dest);

    function error (e) {
      var error = e.message;
      if (bus) {
        bus.error.call(this, (options.gibTaskName || pkg.name), error);
      } else {
        console.log(error);
        this.emit('end');
      }
    }

    return gulp.src(options.src)
      .pipe(gulpLess(options.less))
      .on('error', error)
      .pipe(gulpRename(filename))
      .pipe(gulp.dest(dest))
      .pipe(bus.refreshStream());
  };
}

function config (options) {

  // Defaults:
  options = options || {};
  options.dest = options.dest || './build/styles-bundle.css';

  // Assertions:
  if (!options.src) throw new Error('less-recipe `options.src` required');
  if (!options.dest) throw new Error('less-recipe `options.dest` required');

  return options;
}

function register (b) {
  bus = b;
}
