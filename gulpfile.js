const gulp = require("gulp");
const pug = require("gulp-pug");



// Directories
var location = {
    
    // SRC files 
    _from: {
        pugjs: "./src/pug/**/*.pug",
        ecma: "./src/ecma/**/*.js",
        scss: "./src/ecma/**/*.scss"
    },
    
    _to: {
        html: "./dist/",
        css: "./dist/assets/css/",
        js: "./dist/assets/js/"
    }
};


// Convert PugJs to HTML
gulp.task("pug-to-html", function(){

    return gulp.src(location._from.pugjs)
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest(location._to.html));

});


// SCSS to CSS


// ECMA to JS


// watch
gulp.task("watch", function(){
    return gulp.watch(location._from.pugjs, gulp.parallel("pug-to-html"));
});








