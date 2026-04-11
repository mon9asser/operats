const gulp = require("gulp");
const pug = require("gulp-pug");
const sass = require('gulp-sass')(require('sass'));
const babel = require('gulp-babel'); 

var browserSync = require('browser-sync').create();

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
    },

    _dir: "./dist/"
};


// Convert PugJs to HTML
gulp.task("pug-to-html", function(){

    return gulp.src(location._from.pugjs)
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest(location._to.html))
        .on('end', () => {
            browserSync.reload();  
        });

});


// Convert SCSS to CSS
gulp.task("scss-to-css", function(){ 
    
    return gulp.src(location._from.scss)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(location._to.css))
        .on('end', () => {
            browserSync.reload();  
        }); 

});

// ECMA to JS
gulp.task("ecma-to-js", function(){ 
    
    return gulp.src(location._from.ecma)
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(gulp.dest(location._to.js))
        .on('end', () => {
            browserSync.reload();  
        });

});


// Live Server
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: location._dir
        },
        port: 3500,
        open: true
    });
});


// watch
gulp.task("watch", function(){
    
   

    // Live Server
    gulp.watch(location._dir, gulp.parallel("browser-sync"));


    gulp.watch(location._from.pugjs, gulp.parallel("pug-to-html"));
    gulp.watch(location._from.scss, gulp.parallel("scss-to-css"));
    gulp.watch(location._from.ecma, gulp.parallel("ecma-to-js")); 

    // See but dont compile
    gulp.watch("./src/pug/**/_*.pug", gulp.parallel("pug-to-html"));
    
});