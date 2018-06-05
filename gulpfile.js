// //////////////////////////
// Required
// //////////////////////////

var gulp = require('gulp'),
		uglify = require('gulp-uglify'),
		browserSync = require('browser-sync'),
		reload = browserSync.reload,
		compass = require('gulp-compass'),
		plumber = require('gulp-plumber'),
		autoprefixer = require('gulp-autoprefixer'),
		del = require('del'),
		rename = require('gulp-rename')

// //////////////////////////
// scripts task
// //////////////////////////
gulp.task('scripts', function(){
	gulp.src(['app/js/**/*.js', '!app/js/**/*.min.js'])
	.pipe(plumber())
	.pipe(rename({suffix:'.min'}))
	.pipe(uglify())
	.pipe(gulp.dest('app/js'))
	.pipe(reload({stream:true}))
})

// //////////////////////////
// compass / sass tasks
// //////////////////////////
gulp.task('compass', function(){
	gulp.src('app/scss/style.scss')
	.pipe(plumber())
	.pipe(compass({
		config_file: 'config.rb',
		css: 'app/css',
		sass: 'app/scss',
		require: ['susy']
	}))
	.pipe(autoprefixer('last 2 versions'))
	.pipe(gulp.dest('app/css/'))
	.pipe(reload({stream:true}))
})	

// //////////////////////////
// html task
// //////////////////////////
gulp.task('html', function(){
	gulp.src('app/**/*.html')
	.pipe(reload({stream:true}))
})	
// //////////////////////////
// build tasks
// //////////////////////////

// clear out all files/folders from the build folder
gulp.task('build:cleanfolder', function(cb){
	del([
		'build/**'
		], cb)
})	

// create build directory for all files
// gulp.task('task', ['run after this task completes'] function(){
gulp.task('build:copy', ['build:cleanfolder'] function(){
	return gulp.src('app/**/*/')
	.pipe(gulp.dest('build'))
})	

// remove unwanted build files
// list all files and direectories here that you don't want to include
gulp.task('build:remove', ['build:copy'], function(cb) {
	del([
			'build/scss/',
			'build/js/!(*.min.js)'
		], cb)
}

// the overall build task
gulp.task('build', ['build:copy', 'build:remove'])

// //////////////////////////
// browser-sync task
// //////////////////////////
gulp.task('browser-sync', function(){
	browserSync({
		server:{
			baseDir: "./app/"
		}
	})
})	

// run build server for testing final app
gulp.task('build:serve', function(){
	browserSync({
		server:{
			baseDir: "./build/"
		}
	})
})	
// //////////////////////////
// watch task
// //////////////////////////
gulp.task('watch', function(){
	gulp.watch('app/js/**/*.js', ['scripts'])
	gulp.watch('app/scss/**/*.scss', ['compass'])
	gulp.watch('app/**/*.html', ['html'])
})	

// //////////////////////////
// default task
// //////////////////////////
gulp.task('default', ['scripts', 'compass', 'html', 'browser-sync', 'watch'])	