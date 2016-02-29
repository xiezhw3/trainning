/**
 * INSPINIA - Responsive Admin Theme
 * Copyright 2015 Webapplayers.com
 *
 */
function config($translateProvider) {

    $translateProvider
        .translations('en', {

            // Define all menu elements
            LANGUAGE: 'Lang',
            DASHBOARD: 'Dashboard',
            GRAPHS: 'Graphs',
            MAILBOX: 'Mailbox',
            WIDGETS: 'Widgets',
            FORMS: 'Forms',
            APPVIEWS: 'App views',
            OTHERPAGES: 'Other pages',
            UIELEMENTS: 'UI elements',
            MISCELLANEOUS: 'Miscellaneous',
            GRIDOPTIONS: 'Grid options',
            TABLES: 'Tables',
            GALLERY: 'Gallery',
            MENULEVELS: 'Menu levels',
            ANIMATIONS: 'Animations',
            LANDING: 'Landing page',
            LAYOUTS: 'Layouts',

            // Define some custom text
            WELCOME: 'Welcome Amelia',
            MESSAGEINFO: 'You have 42 messages and 6 notifications.',
            SEARCH: 'Search for something...',

        })
        .translations('cn', {

            LANGUAGE: '语言',
            SEARCH  : '搜索',
        });

    $translateProvider.preferredLanguage('en');

}

angular
    .module('inspinia')
    .config(config)
