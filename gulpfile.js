const gulp = require("gulp");
const pug = require("gulp-pug");
const sass = require('gulp-sass')(require('sass'));
const babel = require('gulp-babel');


// Directories
var location = {
    
    // SRC files 
    _from: {
        pugjs: ["./src/pug/**/*.pug", "!./src/pug/**/_*.pug"],
        ecma: "./src/ecma/**/*.js",
        scss: "./src/scss/**/*.scss"
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


// Convert SCSS to CSS
gulp.task("scss-to-css", function(){ 
    
    return gulp.src(location._from.scss)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(location._to.css));     

});

// ECMA to JS
gulp.task("ecma-to-js", function(){ 
    
    return gulp.src(location._from.ecma)
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(gulp.dest(location._to.js));    

});


// watch
gulp.task("watch", function(){
    
    gulp.watch(location._from.pugjs, gulp.parallel("pug-to-html"));
    gulp.watch(location._from.scss, gulp.parallel("scss-to-css"));
    gulp.watch(location._from.ecma, gulp.parallel("ecma-to-js"));


    // See but dont compile
    gulp.watch('./src/pug/**/_*.pug', gulp.parallel("pug-to-html"));
    
});