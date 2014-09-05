/**
 * configure RequireJS
 * prefer named modules to long paths, especially for version mgt
 * or 3rd party libraries
 */
console.log('main.js');
require.config({
    paths: {
        'angular': '../bower_components/angular/angular',
        'domReady': '../bower_components/requirejs-domready/domReady',
        jquery: '../bower_components/jquery/jquery.min',
        'ui.bootstrap': '../bower_components/angular-bootstrap/ui-bootstrap-tpls',
        ngResource: '../bower_components/angular-resource/angular-resource',
        ngAnimate: '../bower_components/angular-animate/angular-animate',
        ngTouch: '../bower_components/angular-touch/angular-touch.min',
        ngMocks: '../bower_components/angular-mocks/angular-mocks',
        uiRouter: '../bower_components/angular-ui-router/release/angular-ui-router',
        'angular-i18n': '../bower_components/angular-i18n/angular-locale_zh-cn',

        'ivpusic.cookie': '../bower_components/angular-cookie/angular-cookie',

        'angular-flexslider': '../bower_components/angular-flexslider/angular-flexslider',
        'flexslider': '../bower_components/flexslider/jquery.flexslider-min',
        toaster: '../bower_components/AngularJS-Toaster/toaster',
        tipped: '../bower_components/tipped/tipped',
        'decipher.tipped': '../bower_components/angular-tipped/tipped'
    },

    /**
     * for libs that either do not support AMD out of the box, or
     * require some fine tuning to dependency mgt'
     */
    shim: {
        angular: {
            deps: [ 'jquery'],
            exports: 'angular'
        },
        'ui.bootstrap': {
            deps: ['angular']
        },
        'uiRouter':{
            deps: ['angular']
        },
        ngResource:{
            deps:['angular']
        },
        ngAnimate:{
            deps:['angular']
        },
        ngTouch:{
            deps:['angular']
        },
        ngMocks:{
            deps:['angular']
        },
        'ivpusic.cookie':{
            deps:['angular']
        },
        'angular-flexslider':{
            deps: ['angular','jquery','flexslider']
        },
        'flexslider': {
            deps: ['jquery']
        },
        toaster: {
            deps:['angular','ngAnimate']
        },
        tipped: {
          deps:['jquery']
        },
        'decipher.tipped': {
            deps: ['angular', 'tipped']
        }

    },
    deps: [
        './boots'
    ]
});
