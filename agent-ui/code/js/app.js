/**
 * INSPINIA - Responsive Admin Theme
 * Copyright 2015 Webapplayers.com
 *
 */
PROJECT = {};
(function () {
    angular.module('inspinia', [
        'ngResource',
        'ngCookies',
        'ipCookie',                     // Angular 1.3的cookie太弱了
        'angularUtils.directives.uiBreadcrumbs',
        'timer',
        'ui.router',                    // Routing
        'ui.sortable',                  // Routing
        //'ui.grid',
        'oc.lazyLoad',                  // ocLazyLoad
        'ui.bootstrap',                 // Ui Bootstrap
        'ui.bootstrap.datetimepicker',
        'pascalprecht.translate',        // Angular Translate
        'highcharts-ng', 
    ])
})();

// Other libraries are loaded dynamically in the config.js file using the library ocLazyLoad
