define([
    'require',
    'angular',
    'app',
    'initConfig',
    'routes'
], function (require, ng) {
    'use strict';
    /*
     * place operations that need to initialize prior to app start here
     * using the `run` function on the top-level module
     */

    require(['domReady!'], function (document) {
        console.log('bootstrap.js');
        ng.bootstrap(document, ['zc']);
    });
});