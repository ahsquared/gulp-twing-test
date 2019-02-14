# Test for gulp.watch and Twing

###Test Watch
This will run gulp and start the watcher.
Make changes to index.twig to see the issue.
```bash
npx gulp watch
```

###Test Twig Render
This shows that twig rendering via twing is working.
```bash
npx gulp testTwig
```

## Resolution
When watching you need to create the twing environment on each run.
```javascript
function testTwig() {
	const env = new TwingEnvironment(loader);
	return gulp.src("index.twig")
		.pipe(twing(env))
		.pipe(gulp.dest("dist/"));
}
```
The loader can be created once and reused. See gulpfile.js

See this github issue for details: https://github.com/ericmorand/gulp-twing/issues/23