/**
 * INSPINIA - Responsive Admin Theme
 * Copyright 2015 Webapplayers.com
 *
 * Main controller.js file
 * Define controllers with data used in Inspinia theme
 *
 *
 * Functions (controllers)
 *  - MainCtrl
 *  - dashboardFlotOne
 *  - dashboardFlotTwo
 *  - dashboardMap
 *  - flotChartCtrl
 *  - rickshawChartCtrl
 *  - sparklineChartCtrl
 *  - widgetFlotChart
 *  - modalDemoCtrl
 *  - ionSlider
 *  - wizardCtrl
 *  - CalendarCtrl
 *  - chartJsCtrl
 *  - GoogleMaps
 *  - ngGridCtrl
 *  - codeEditorCtrl
 *  - nestableCtrl
 *  - notifyCtrl
 *  - translateCtrl
 *
 */


/**
 * MainCtrl - controller
 * Contains severals global data used in diferent view
 *
 */
function MainCtrl($rootScope, $translate, $location, $modal, $q) {
    console.log('MainCtrl init...');
};


/**
 *
 * Pass all functions into module
 */
angular
    .module('inspinia')
    .controller('MainCtrl', MainCtrl)
