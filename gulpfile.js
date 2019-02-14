"use strict";

const gulp = require("gulp");
const twing = require("gulp-twing");
const browserSync = require("browser-sync").create();


// setup for Twig compilation
const { TwingEnvironment, TwingLoaderRelativeFilesystem } = require("twing");
const env = new TwingEnvironment(new TwingLoaderRelativeFilesystem(), {
	auto_reload: true,
	debug: true,
});

function reload(done) {
	return browserSync.reload();
	done();
}

function testTwig() {
	return gulp.src("index.twig")
		.pipe(twing(env))
		.pipe(gulp.dest("dist/"));
}

function watch() {
	gulp.task('testTwig')();
	const watchTwig = gulp.watch(["index.twig"], gulp.series(testTwig, reload));
	browserSync.init({
		server: {
			baseDir: "./dist",
		},
	});
}

module.exports = {
	watch,
	testTwig,
};