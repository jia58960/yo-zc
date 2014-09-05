define([
    'angular',
    'ngAnimate',
    'ngResource',
    'ui.bootstrap',
    'uiRouter',
    'ngTouch',
    'ngMocks',
    'controllers/index',
    './services/index',
     './directives/index',
    'ivpusic.cookie',
    'angular-flexslider',
    'toaster',
    'decipher.tipped'
    /*'./filters/index',*/
], function (ng) {
    'use strict';
    return ng.module('zc', [
        'ngAnimate',
        'ngResource',
        'ui.bootstrap',
        'ui.router',
        'ngTouch',
        'ky_zc.controllers',
        'ky_zc.services',
        'app.directives',
        'ivpusic.cookie',
        'angular-flexslider',
        'toaster',
        'decipher.tipped'
        /*'app.filters',*/
    ]);
});
