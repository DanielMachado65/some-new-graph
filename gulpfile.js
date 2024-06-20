const gulp = require('gulp');
const replace = require('gulp-replace-path');
const exec = require('gulp-exec');
const wait = require('gulp-wait');
const injectStr = require('gulp-inject-string');
const HTML_REPLACE_INDEX_INTEGRATION = require('./src/static/public/integration-template/block-login-form');

const ABS_INDEX_PATH_INTEGRATION = 'src/static/public/integration/index.html';
const ABS_MAIN_PATH_INTEGRATION_MAIN = 'src/static/public/integration/main.js';
const ABS_LOCALE_PATH_INTEGRATION_LOCALES =
    'src/static/public/integration/locales/locale.js';
const ABS_STYLE_PATH_INTEGRATION = 'src/static/public/integration/css/';
const ABS_MAIN_PATH_INTEGRATION = 'src/static/public/integration/';

const ABS_STYLE_PATH_INTEGRATION_TEMPLATE =
    'src/static/public/integration-template/css/style.css';
const ABS_MAIN_PATH_INTEGRATION_TEMPLATE =
    'src/static/public/integration-template/main.js';

const ABS_DIST_FOLDER_INTEGRATION = 'src/static/public/integration';
const ABS_DIST_LOCALES_FOLDER_INTEGRATION =
    'src/static/public/integration/locales';

const reportOptions = {
    err: true,
    stderr: true,
    stdout: true,
};

gulp.task('createApiDocumentation', function (done) {
    const command_api_doc =
        'apidoc -i integration/ -o ./src/static/public/integration/';
    return gulp
        .src('./')
        .pipe(exec(command_api_doc))
        .pipe(exec.reporter(reportOptions))
        .pipe(wait(2000));
});

gulp.task('replacePathIntegration', function (done) {
    gulp.src([ABS_INDEX_PATH_INTEGRATION])
        .pipe(replace(/vendor/g, 'integration/vendor'))
        .pipe(replace('css/style.css', 'integration/css/style.css'))
        .pipe(replace(/img/g, 'integration/img'))
        .pipe(replace(/main.js/g, 'integration/main.js'))
        .pipe(
            injectStr.before(
                '<script data-main="integration/main.js" src="integration/vendor/require.min.js"></script>',
                HTML_REPLACE_INDEX_INTEGRATION,
            ),
        )
        .pipe(gulp.dest(ABS_DIST_FOLDER_INTEGRATION));

    gulp.src([ABS_MAIN_PATH_INTEGRATION_MAIN])
        .pipe(replace('./api_project.js', './integration/api_project.js'))
        .pipe(replace('./api_data.js', './integration/api_data.js'))
        .pipe(gulp.dest(ABS_DIST_FOLDER_INTEGRATION));

    return gulp
        .src([ABS_LOCALE_PATH_INTEGRATION_LOCALES])
        .pipe(replace("'./", "'./integration/"))
        .pipe(gulp.dest(ABS_DIST_LOCALES_FOLDER_INTEGRATION));
});

gulp.task('replaceStyleCss', (done) => {
    return gulp
        .src([ABS_STYLE_PATH_INTEGRATION_TEMPLATE])
        .pipe(replace('style.css', 'integration/css/style.css'))
        .pipe(gulp.dest(ABS_STYLE_PATH_INTEGRATION));
});

gulp.task('replaceMainJs', (done) => {
    return gulp
        .src([ABS_MAIN_PATH_INTEGRATION_TEMPLATE])
        .pipe(replace('main.js', 'integration/main.js'))
        .pipe(gulp.dest(ABS_MAIN_PATH_INTEGRATION));
});

gulp.task(
    'default',
    gulp.series(
        'createApiDocumentation',
        'replacePathIntegration',
        'replaceStyleCss',
        'replaceMainJs',
        function (done) {
            console.log(
                'all tasks was executed with success... finishing the process...',
            );
            done();
        },
    ),
);
