// require gulp
var gulp = require('gulp');

// creating a task, with a name and function
gulp.task('build', function() {
  console.log('Building the JS!');
});

// a task called 'default', which takes an array of tasks and runs them
gulp.task('default', ['build']);
