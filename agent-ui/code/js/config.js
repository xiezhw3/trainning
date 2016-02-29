/**
 * INSPINIA - Responsive Admin Theme
 * Copyright 2015 Webapplayers.com
 *
 * Inspinia theme use AngularUI Router to manage routing and views
 * Each view are defined as state.
 * Initial there are written state for all view in theme.
 *
 */
function config($stateProvider, $urlRouterProvider, $ocLazyLoadProvider) {
    $urlRouterProvider.otherwise("/dashboard/");
    $ocLazyLoadProvider.config({
        // Set to true if you want to see what and when is dynamically loaded
        debug: false
    });

    $stateProvider
        .state('agent', {
            url: "/",
            templateUrl: "views/common/content.html",
            controller: agentCtrl,
            abstract: true,
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            name: 'cgNotify',
                            files: [
                                'css/plugins/angular-notify/angular-notify.min.css',
                                'js/plugins/angular-notify/angular-notify.min.js',
                            ]
                        },
                        {
                            name: 'ui.select',
                            files: [
                                'js/plugins/ui-select/select.js',
                                'css/plugins/ui-select/select.css',
                            ]
                        },
                        {
                            name: 'isteven-multi-select',
                            files: [
                                'js/plugins/angular-multi-select/isteven-multi-select.js',
                                'css/plugins/angular-multi-select/isteven-multi-select.css',
                            ]
                        },

                    ]);
                }
            }
        })
        .state('agent.dashboare', {
            url: "dashboard/",
            data: {
                displayName : "'仪表盘'",
            },
            controller: dashboardCtrl,
            templateUrl: "views/agent/dashboard.html",
        })
        .state('agent.cpu', {
            url: "cpu/",
            data: {
                displayName : "'cpu'",
                type: "cpu"
            },
            controller: machineInfoCtrl,
            templateUrl: "views/agent/chart.html",
        })
        .state('agent.memory', {
            url: "memory/",
            data: {
                displayName : "'内存'",
                type: "memory"
            },
            controller: machineInfoCtrl,
            templateUrl: "views/agent/chart.html",
        })
        .state('agent.load', {
            url: "load/",
            data: {
                displayName : "'负载'",
                type: "load"
            },
            controller: machineInfoCtrl,
            templateUrl: "views/agent/chart.html",
        })
}
angular
    .module('inspinia')
    .config(config)
    .config(function( $compileProvider, $locationProvider, $provide ) {
        $provide.decorator('$tooltipSuppressWarning', function () { return true; });
        $locationProvider.html5Mode(true);
        $compileProvider.aHrefSanitizationWhitelist(
            /^\s*(https?|ssh|ftp|mailto|chrome-extension|tel):/
        );
    })
    .run(function($rootScope, $state) {
        $rootScope.$state = $state;
    })
    ;
