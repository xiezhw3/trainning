/**
 * INSPINIA - Responsive Admin Theme
 * Copyright 2015 Webapplayers.com
 *
 * Main directives.js file
 * Define directives for used plugin
 *
 *
 * Functions (directives)
 *  - pageTitle
 *  - sideNavigation
 *  - iboxTools
 *  - minimalizaSidebar
 *  - vectorMap
 *  - sparkline
 *  - icheck
 *  - ionRangeSlider
 *  - dropZone
 *  - responsiveVideo

 *
 */


/**
 * pageTitle - Directive for set Page title - mata title
 */
function pageTitle($rootScope, $timeout, $filter) {
    return {
        link: function(scope, element) {
            var listener = function(event, toState, toParams, fromState, fromParams) {
                // Default title - load on Dashboard 1
                var title = 'Galaxy';
                // Create your own title pattern
                if (toState.data && toState.data.pageTitle) 
                    title = toState.data.pageTitle;
                $timeout(function() {
                    element.text($filter('translate')(title));
                });
            };
            $rootScope.$on('$stateChangeStart', listener);
        }
    }
};

/**
 * sideNavigation - Directive for run metsiMenu on sidebar navigation
 */
function sideNavigation($timeout) {
    return {
        restrict: 'A',
        link: function(scope, element) {
            // Call the metsiMenu plugin and plug it to sidebar navigation
            $timeout(function(){
                element.metisMenu();

            });
        }
    };
};

/**
 * responsibleVideo - Directive for responsive video
 */
function responsiveVideo() {
    return {
        restrict: 'A',
        link:  function(scope, element) {
            var figure = element;
            var video = element.children();
            video
                .attr('data-aspectRatio', video.height() / video.width())
                .removeAttr('height')
                .removeAttr('width')

            //We can use $watch on $window.innerWidth also.
            $(window).resize(function() {
                var newWidth = figure.width();
                video
                    .width(newWidth)
                    .height(newWidth * video.attr('data-aspectRatio'));
            }).resize();
        }
    }
}

/**
 * iboxTools - Directive for iBox tools elements in right corner of ibox
 */
function iboxTools($timeout) {
    return {
        restrict: 'A',
        scope: true,
        templateUrl: 'views/common/ibox_tools.html',
        controller: function ($scope, $element) {
            // Function for collapse ibox
            $scope.showhide = function () {
                var ibox = $element.closest('div.ibox');
                var icon = $element.find('i:first');
                var content = ibox.find('div.ibox-content');
                content.slideToggle(200);
                // Toggle icon from up to down
                icon.toggleClass('fa-chevron-up').toggleClass('fa-chevron-down');
                ibox.toggleClass('').toggleClass('border-bottom');
                $timeout(function () {
                    ibox.resize();
                    ibox.find('[id^=map-]').resize();
                }, 50);
            },
            // Function for close ibox
            $scope.closebox = function () {
                var ibox = $element.closest('div.ibox');
                ibox.remove();
            }
        }
    };
};

/**
 * minimalizaSidebar - Directive for minimalize sidebar
*/
function minimalizaSidebar($timeout) {
    return {
        restrict: 'A',
        template: '<a class="navbar-minimalize minimalize-styl-2 btn btn-primary " href="" ng-click="minimalize()"><i class="fa fa-bars"></i></a>',
        controller: function ($scope, $element) {
            $scope.minimalize = function () {
                $("body").toggleClass("mini-navbar");
                if (!$('body').hasClass('mini-navbar') || $('body').hasClass('body-small')) {
                    // Hide menu in order to smoothly turn on when maximize menu
                    $('#side-menu').hide();
                    // For smoothly turn on menu
                    setTimeout(
                        function () {
                            $('#side-menu').fadeIn(500);
                        }, 100);
                } else if ($('body').hasClass('fixed-sidebar')){
                    $('#side-menu').hide();
                    setTimeout(
                        function () {
                            $('#side-menu').fadeIn(500);
                        }, 300);
                } else {
                    // Remove all inline style from jquery fadeIn function to reset menu state
                    $('#side-menu').removeAttr('style');
                }
            }
        }
    };
};

/**
 * vectorMap - Directive for Vector map plugin
 */
function vectorMap() {
    return {
        restrict: 'A',
        scope: {
            myMapData: '=',
        },
        link: function (scope, element, attrs) {
            element.vectorMap({
                map: 'world_mill_en',
                backgroundColor: "transparent",
                regionStyle: {
                    initial: {
                        fill: '#e4e4e4',
                        "fill-opacity": 0.9,
                        stroke: 'none',
                        "stroke-width": 0,
                        "stroke-opacity": 0
                    }
                },
                series: {
                    regions: [
                        {
                            values: scope.myMapData,
                            scale: ["#1ab394", "#22d6b1"],
                            normalizeFunction: 'polynomial'
                        }
                    ]
                },
            });
        }
    }
}


/**
 * sparkline - Directive for Sparkline chart
 */
function sparkline() {
    return {
        restrict: 'A',
        scope: {
            sparkData: '=',
            sparkOptions: '=',
        },
        link: function (scope, element, attrs) {
            scope.$watch(scope.sparkData, function () {
                render();
            });
            scope.$watch(scope.sparkOptions, function(){
                render();
            });
            var render = function () {
                $(element).sparkline(scope.sparkData, scope.sparkOptions);
            };
        }
    }
};

/**
 * icheck - Directive for custom checkbox icheck
 */
function icheck($timeout) {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function($scope, element, $attrs, ngModel) {
            return $timeout(function() {
                var value;
                value = $attrs['value'];

                $scope.$watch($attrs['ngModel'], function(newValue){
                    $(element).iCheck('update');
                })

                return $(element).iCheck({
                    checkboxClass: 'icheckbox_square-green',
                    radioClass: 'iradio_square-green'

                }).on('ifChanged', function(event) {
                        if ($(element).attr('type') === 'checkbox' && $attrs['ngModel']) {
                            $scope.$apply(function() {
                                return ngModel.$setViewValue(event.target.checked);
                            });
                        }
                        if ($(element).attr('type') === 'radio' && $attrs['ngModel']) {
                            return $scope.$apply(function() {
                                return ngModel.$setViewValue(value);
                            });
                        }
                    });
            });
        }
    };
}

/**
 * iEnterKeyPress
 */
function iEnterKeyPress() {
    return {
        restrict: 'A',
        scope: false,
        link: function(scope, element, attrs) {
            element.bind('keypress', function(event) {
                var keyCode = event.which || event.keyCode;

                if(keyCode === 13) {
                    scope.$apply(function() {
                        scope.$eval(attrs.iEnterKeyPress);
                    });
                    event.preventDefault();
                }
            });
        }
    }
}

/*
 * iSpinner
 */
function iSpinner() {
    return {
        restrict: 'AE',
        templateUrl: 'views/common/spinner.html',
        replace: true,
        scope: true,
        transclude: true,
        link: function(scope, element, attrs) {
            scope.loading = attrs.disabled ? false : true ;
            scope.size = attrs.size || 2;
            scope.successIcon = attrs.successIcon;
            scope.failedIcon = attrs.failedIcon;
            scope.failedTip = attrs.failedTip;

            // 进入loading状态
            scope.$on('dataLoading', function(event, data) {
                if(attrs.name === data.name) {
                    scope.loading = true;
                }
            });

            // 成功退出loading状态
            scope.$on('dataLoadSuccess', function(event, data) {
                if(attrs.name === data.name) {
                    // console.log('dataLoadSuccess', attrs.name, data.name);
                    scope.loading = false;
                    scope.loadSuccess = true;
                }
            });

            // 退出loading状态, 并通知失败
            scope.$on('dataLoadFailed', function(event, data) {
                if(attrs.name === data.name) {
                    scope.loading = false;
                    scope.loadSuccess = false;
                }
            });
        }
    }
}

/**
 * ionRangeSlider - Directive for Ion Range Slider
 */
function ionRangeSlider() {
    return {
        restrict: 'A',
        scope: {
            rangeOptions: '='
        },
        link: function (scope, elem, attrs) {
            elem.ionRangeSlider(scope.rangeOptions);
        }
    }
}

/**
 * dropZone - Directive for Drag and drop zone file upload plugin
 */
function dropZone() {
    return function(scope, element, attrs) {
        element.dropzone({
            url: "/upload",
            maxFilesize: 100,
            paramName: "uploadfile",
            maxThumbnailFilesize: 5,
            init: function() {
                scope.files.push({file: 'added'});
                this.on('success', function(file, json) {
                });
                this.on('addedfile', function(file) {
                    scope.$apply(function(){
                        alert(file);
                        scope.files.push({file: 'added'});
                    });
                });
                this.on('drop', function(file) {
                    alert('file');
                });
            }
        });
    }
}

/**
 * opFomr- Directive for filter of grid、chart...
 */
function opForm() {
    return {
        restrict: 'EA',
        replace: true,
        transclude: true,
        scope: {
            formMode:  '@',
            formData:  '=',
            formDefs: '=',
            formKeep: '=',
            formScope: '=',
            formAction: '@',
            listSelected: '=',
            listTotal: '=',
            init: '&init',
            cancel: '&onCancel',
            submit: '&onSubmit',
        },
        // TODO Galaxy要去掉
        controller: function($scope, $rootScope, Roster, $state, $window, $injector) {
            $scope.overview = $scope.formMode == 'form';
            $scope.$watch('form', function(form) {
                $scope.init({form: form});
            });
            var data = $scope.formData;
            $scope.removeOne = function(field, item) {
                var list = data[field];
                if (list.length) {
                    utils.array.remove(list, item);
                }
                else {
                    delete list[item.id];
                }
            };
            
            // TODO 把关联属性转换成数组形式
            var convertToIDS = function() {
                if (!$scope.formDefs) {
                    return;
                }
                for (var i = 0; i < $scope.formDefs.length; i++) {
                    var formItem = $scope.formDefs[i];
                    if (formItem.type != 'list') {
                        continue;
                    }
                    var items = data[formItem.name];
                    // 只有对象类型才转成ids
                    if (items && items.length == null) {
                        var key = formItem.key = '$' + formItem.name;
                        data[key] = Object.keys(items);
                    }
                }
            }
            if (data) {
                if (data.$promise) {
                    data.$promise.then(convertToIDS);
                }
                else {
                    convertToIDS();
                }
            }

            $scope.submitData = function() {
                var form = $scope.form;
                var defs = utils.array.indexBy($scope.formDefs, 'name');
                var modified = $scope.modified = {};
                for (var name in form) {
                    var item = defs[name];
                    if (!item) {
                        continue;
                    }
                    // 有时需要对表单值做一下处理, 比如白名单的群组
                    else if (item.getValues) {
                        var values = item.getValues(form[name].$modelValue);
                        angular.extend(modified, values);
                    }
                    else {
                        //TODO 这里需要处理，不确定
                        var value = form[name].$modelValue;// form[name];
                        if (!item.type && value === '') {
                            // 输入框，空字符串要转为null
                            value = null;
                        }
                        modified[name] = value
                    }
                }
                if (data && data.id) {
                    modified.id = data.id;
                }
                $scope.submit({
                    modified: modified,
                    onSuccess: function() {
                        form.$setPristine();
                    },
                    onError: function() {
                        //TODO
                    },
                });
            };

            $scope.removeAll = function(field) {
                var list = data[field];
                list.length = 0;
            };

            $scope.log = function() {
                console.log('on init', arguments);
            };

            // 获取选项列表，比如配置组列表, force决定要不要强制刷新
            $scope.loadOptions = function(formItem, force) {
                if (formItem.options && !force) {
                    return;
                }
                if (formItem.loadOptions) {
                    var args = {
                        formData: data,
                    };
                    return $injector.invoke(formItem.loadOptions, formItem, args);
                }
                var params = {
                    model : formItem.model || formItem.name,
                    num   : -1,
                }
                formItem.options = [];
                Roster.get(params, function(data) {
                    if (formItem.optionFormat) {
                        formItem.options = formItem.optionFormat(data);
                    }
                    else if (formItem.template) {
                        var REG = /subItem\.([\w\d]+)/g;
                        var match = formItem.template.match(REG);
                        var names = [];
                        match.forEach(function(field) {
                            names.push(field.split('.')[1]);
                        });

                        data.items.forEach(function(item) {
                            var labels = [];
                            for (var i = 0; i < names.length; i++) {
                                labels.push(item[names[i]]);
                            }
                            item.label = labels.join('-');
                        });
                        formItem.options = data.items;
                    }
                    else {
                        formItem.options = data.items;
                    }
                });
            };
        },
        templateUrl: 'views/galaxy/common/form.html'
    };
}


function opGrid() {
    return {
        restrict: 'EA',
        transclude: true,
        replace: true,
        scope: {
            listTotal: '=?',
            items:  '=',
            config: '=',
            filters: '=?',
            selected: '=?',
            actionTriggers: '=',
        },
        templateUrl: 'views/galaxy/common/table.html',
        controller: function($scope, $rootScope, $cookies, $modal) {
            if (!$scope.sortableOptions) {
                $scope.sortableOptions = {
                    handle: '.draggable',
                    update: function(e, ui) {
                        $scope.$emit('tableSorted', ui);
                    },
                };
            }
            $scope.filter = function(col) {
                var modalInstance = $modal.open({
                    templateUrl: 'views/galaxy/common/modal_filter.html',
                    controller: function($scope, $modalInstance) {
                        $scope.fields = col.filters || [col];
                        $scope.values = angular.copy(filters);
                        $scope.submit = function () {
                            $modalInstance.close();
                            var values = {};
                            // 根据类型转换一下
                            $scope.fields.forEach(function(field){
                                var value = $scope.values[field.name]; //TODO
                                if (col.type == 'list') {
                                    values[field.name + '[id]'] = value;
                                    /*
                                    value = {
                                        id: value,
                                    }
                                    */
                                }
                                else {
                                    values[field.name] = value;
                                }
                            });
                            angular.extend(filters, values);
                            reload(filters);
                        };
                        $scope.cancel = function () {
                            $modalInstance.dismiss('cancel');
                        };
                    }
                });
            }

            var reload = function(filters) {
                if(filters) {
                    $scope.filters = filters;
                }
                $scope.loading = true;
                $rootScope.$broadcast('tableDataReload', 
                        $scope.filters, $scope);
            }

            // 列表页过滤
            $scope.$watch('filters', function(filters) {
                if(!filters) return;
                $cookies._filter_num = filters._num;
                reload();
            }, true);

            // 在翻页时，保持选中
            $scope.$watch('items', function(items) {
                if (!items) {
                    return;
                }
                $scope.loading = false;
                items._selected = 0;
                $scope.selected = $scope.selected || [];
                if ($scope.selected.length == 0) {
                    return;
                }
                items.forEach(function(item) {
                    if ($scope.selected.indexOf(item.id) >= 0) {
                        item._selected = true;
                        updateSelected(true);
                    }
                });
            });

            $scope.checkAll = function(change) {
                var items = $scope.items;
                if (change) {
                    items_selected_all = !items._selected_all;
                }
                var _selected_all = items._selected_all;
                items.forEach(function(item) {
                    if (_selected_all && !item._selected) {
                        $scope.selected.push(item.id);
                    }
                    else if (!_selected_all && item._selected) {
                        utils.array.remove($scope.selected, item.id);
                    }
                    item._selected = _selected_all;
                });
                items._selected = _selected_all ? items.length : 0;
            };

            $scope.sort = function(col) {
                var filters = $scope.filters;
                if (col.name == filters['_sort']) {
                    filters['_direction'] = filters['_direction'] === 'asc' ? 'desc' : 'asc'; 
                }
                else {
                    filters['_sort'] = (col.sort && col.sort[0]) || col.name;
                    filters['_direction'] = 'desc';
                }
            };

            var updateSelected = function(_selected) {
                var items = $scope.items;
                items._selected = items._selected + (_selected ? 1 : -1);
                items._selected_all = (items._selected == items.length);
            }

            var removeFirstOne = function() {
                var items = $scope.items;
                var firstId = $scope.selected[0];

                items.forEach(function(item) {
                    if(item.id == firstId) {
                        //item._selected = false;
                        //$scope.checkOne(item, true);
                        item._selected = false;
                        utils.array.remove($scope.selected, firstId);
                        updateSelected(item._selected);
                        return;
                    }
                });
            }

            $scope.checkOne = function(item, change) {
                if ($scope.config.disableSelect) {
                    return;
                }
                if($scope.selected.length == $scope.config.maxSelectedCount 
                        && !item._selected) {
                    removeFirstOne();
                }
                if (change) {
                    item._selected = !item._selected;
                }
                if (item._selected) {
                    $scope.selected.push(item.id);
                }
                else {
                    utils.array.remove($scope.selected, item.id);
                }
                updateSelected(item._selected);

                $rootScope.$broadcast('tableRowSelect', item);
            };

            // 目前没办法做到通过程序来选中行，先通过事件实现 by linxiangxin
            $scope.$on('tableRowToSelect', function(event, data) {
                $scope.checkOne(data, true);
            });
        }
    };
}

function opCodeMode() {
    return {
        restrict: 'A',
        scope: {},
        template: "<option ng-repeat='mode in modes' value='{{ mode }}'>{{ mode }}</option>",
        controller: function ($scope, $element) {
            $scope.modes = [
                'shell',
                'xml',
                'properties',
                'yaml',
                'mysql',
                'python',
                'list',
                'php',
                'diff',
                'http',
                'sql',
                'lua',
                'ruby',
                'go',
                'javascript',
                'css',
                'markdown',
            ];
        },
    };
}

function opChosen() {
}

function opRow() {
    return {
        restrict: 'E',
        //transclude: true,
        //templateUrl: 'views/common/cell.html',
        compile: function(tElement, tAttrs, transclude) {
            tElement.replace("<tr><td>{{ data.items.length }}</td></tr>");
            return {
                pre: function preLink(scope, iElement, iAttrs, crtl, transclude) {
                    //scope.collection = [1, 2, 3, 4, 5];
                    console.log(iElement);
                    console.log(iElement.html());
                },
                post: function postLink(scope, iElement, iAttrs, controller) {
                    console.log(iElement[0]);
                    console.log(iElement[1]);
                }
            };
        },
    };
}

function opPageFilter() {
    return {
        restrict: 'E',
        scope: {
            config: '=',
        },
        templateUrl: 'views/galaxy/common/filter.html',
        controller: function($scope, $rootScope, $injector) {
            $scope.filters = {};
            $scope.search = function() {
                var fields = $scope.config.fields;
                var data = {};
                var filters = angular.copy($scope.filters);
                for(var key in filters) {
                    var value = filters[key];
                    if(!value) continue;
                    if(fields[key] && fields[key].filterType === 'time_interval' && value == '$99') {
                        var beginField = fields[key].beginField;
                        var endField = fields[key].endField;
                        filters[beginField] = utils.datetime.format(filters[beginField], 'yyyy-MM-dd hh:00');
                        filters[endField] = utils.datetime.format(filters[endField], 'yyyy-MM-dd hh:00');
                        data[key] = fields[key].customizedKey || '99';
                    } else if(fields[key] && fields[key].filterType === 'date') {
                        data[key] = utils.datetime.format(value, 'yyyy-MM-dd' || fields[key].dateFormat);
                    }   else {
                        data[fields[key] && fields[key].filterAlias || key] = value;
                    }
                };
                $rootScope.$broadcast('filtersChanged', data);
            }

            $scope.loadOptions = function(filterItem) {
                if(filterItem.options) {
                    return;
                }
                /*
                var dataSource = filterItem.dataSource;
                console.log('dataSource:', dataSource);
                var params = dataSource.param;
                var resource = dataSource.resource;
                var callback = dataSource.callback;
                if(!resource) {
                    return;
                }
                var resourceService = $injector.invoke(resource);
                console.log('resource:', resourceService);
                resourceService.get(params).$promise.then(function(respons) {
                     console.log('resourceService:', response);
                });
                */
                if (filterItem.loadOptions) {
                    var args = {
                        formData: $scope.filters,
                    };
                    return $injector.invoke(filterItem.loadOptions, filterItem, args);
                }
            }
        }
    }
}

function opAction() {
    return {
        restrict: 'EA',
        scope: {
            item: '=',
            editable: '@',
            onRemove: '&',
            onEdit: '&',
            onCancel: '&',
            onApply: '&',
        },
        templateUrl: 'views/galaxy/common/action.html',
        controller: function ($scope, $element) {
        }
    };
}

/*
function opEditable() {
    return {
        restrict: 'EA',
        compile: function (element, attrs) {
            switch(attrs.input) {
                case 'text':
                    <div ng-show="machine._status!='EDITING'">{{ machine.rank }}</div>
                    <div ng-show="machine._status=='EDITING'">
                        <input ng-model="values.rank" class="input-table"/></div>
                    element.append('{{ ' + attrs.model + '.' + attrs.field + ' }}');
                    break;
                default:
                    break;
            }
        }
    };
}
*/

function opPager($parse) {
    return {
        restrict: 'E',
        scope: {
            totalItems: '=',
            itemsPerPage: '=',
            disableOptions: '=',
        },
        require: 'ngModel',
        templateUrl: 'views/galaxy/common/pagination.html',
        link: function(scope, element, attrs, ngModel) {
            scope.setValue = function(newValue) {
                scope.curPage = newValue;
                ngModel.$setViewValue(newValue);
            }

            scope.curPage = 1;
            scope.totalPages = 0;
            scope.pageOptions = ['10', '20', '100', '200'];

            scope.$watch('itemsPerPage', function(newValue) {
                if(!newValue) return;
                scope.totalPages = scope.totalItems ? Math.ceil(scope.totalItems / newValue) : 0;
                if(scope.totalPages < scope.curPage) {
                    scope.toPage(1);
                }
            });

            scope.$watch('totalItems', function(newValue) {
                if(!newValue && newValue !== 0) return;
                scope.totalPages = Math.ceil(scope.totalItems / scope.itemsPerPage);
                if(scope.totalPages < scope.curPage) {
                    scope.toPage(1);
                }
            });

            scope.prePage = function() {
                if(scope.curPage > 1) {
                    scope.curPage--;
                    scope.setValue(scope.curPage);
                }
            }

            scope.nextPage = function() {
                if(scope.curPage < scope.totalPages) {
                    scope.curPage++;
                    scope.setValue(scope.curPage);
                }
            }

            scope.toPage = function(page) {
                page = page || scope.curPage;
                if((page <= 0 || page > scope.totalPages) && page != 1
                    || isNaN(page) || page.toString().indexOf('.') > -1) {
                    scope.pageError = true;
                } else {
                    scope.pageError = false;
                    scope.setValue(page);
                }
            }
        },
        controller: function($scope, $rootScope) {
        }
    }
}

function opFilters() {
    return {
        restrict: 'E',
        //transclude: true,
        scope: {
            filters: '=',
            filter: '=',
            config: '=',
        },
        templateUrl: 'views/galaxy/common/filters.html',
        controller: function ($scope, $rootScope, $element, $parse) {
            $scope.labels = [];

            if (!$scope.config) {
                return;
            }

            $scope.field = null;
            function refresh(_filters) {
                // 先清除labels
                var labels = $scope.labels = [];
                // 选择第一列为默认的搜索
                var field = $scope.config.columnDefs[0];
                if (field != $scope.field) {
                    $scope.placeholder = field.filter && field.filter.placeholder;
                    $scope.field = field;
                }
                var filters = $scope.filters || {};
                $scope.query = filters[field.name] || '';

                var fields = $scope.config.fields;
                if (!fields) {
                    return;
                }
                filters = angular.extend({}, _filters);
                for (var name in filters) {
                    var value = filters[name];
                    var field = fields[name.replace(/\[.+\]$/, '')];
                    if (!field) {
                        continue;
                    }

                    if (field.type == 'options') {
                        // 转换
                        var options = field.options;
                        for (var i = 0; i < options.length; i++) {
                            if (value == options[i].id) {
                                var viewValue = options[i].label;
                                break;
                            }
                        }
                        var text = field.label + "等于'" + viewValue + "'";
                    }
                    else if (field.type == 'list') {
                        var data = ($rootScope.options || {})[field.name];
                        var items = (data && data.items) || [];
                        for (var i = 0; i < items.length; i++) {
                            if (items[i].id != value) {
                                continue;
                            }
                            // 解析模板
                            viewValue = $parse(field.template)({subItem:items[i]});
                            break;
                        }
                        var text = field.label + "为'" + viewValue + "'";
                    }
                    else {
                        var method = (field.filter && field.filter.method) || "包含";
                        var text = field.label + method + "'" + value + "'";
                    }
                    labels.push({
                        field: field,
                        text: text,
                        name: name,
                    });
                }
                $scope.labels = labels;


            }
            $scope.remove = function(label) {
                delete $scope.filters[label.name];
            }

            $scope.$watchCollection('filters', refresh);

            $scope.search = function() {
                var field = $scope.config.columnDefs[0];
                var value = $scope.query;
                if (value == '') {
                    delete $scope.filters[field.name];
                    return;
                }
                $scope.filters[field.name] = value;
            };
        },
    };
}

function ngEnter() {
    return function(scope, element, attrs) {
        element.bind("keydown keypress", function(event) {
            if(event.which === 13) {
                scope.$apply(function(){
                    scope.$eval(attrs.ngEnter);
                });
                event.preventDefault();
            }
        });
    };
}

function wrapper($window, $timeout) {
    return {
        restrict: 'A',
        //transclude: true,
        scope: {
            range: '=',
            glue: '=',
            onTop: '&',
            onBottom: '&',
        },
        //controller: function ($scope, element, attr) {
        link: function(scope, element, attr) {
            //console.log(scope, element, attr);
            var w = angular.element($window);
            var changeHeight = function() {
                element.css('height', (w.height() - attr.offsetY) + 'px' );
            };  
            w.bind('resize', function () {
                changeHeight();   // when window size gets changed
            });  

            var start = scope.range.start;

            var scrollTop = element[0].scrollTop;
            var scrollBottom = scrollTop - element[0].scrollHeight;

            function toBottom() {
                element.scrollTop(element[0].scrollHeight);
                scrollTop = element[0].scrollTop;
                scrollBottom = 0;
            }

            function toTop() {
                element.scrollTop(0);
                scrollTop = 0;
                scrollBottom = -element[0].scrollHeight;
            }

            scope.$on('scroll-bottom', toBottom);
            scope.$on('scroll-top', toTop);

            // 监听元素变化
            scope.$watch('range', function(newRange) {
                // 为了先渲染完
                $timeout(function() {
                    if (scope.glue == true) {
                        toBottom();
                    }
                    else {
                        var newTop = element[0].scrollTop;
                        var newHeight = element[0].scrollHeight;
                        if (newRange.start  < start) {
                            // 上面添加了元素
                            scrollTop = newHeight + scrollBottom;
                            element.scrollTop(scrollTop);
                        }
                        else {
                            // 下面添加了元素，不需要滚动
                            scrollBottom = newTop - newHeight;
                        }
                        start = newRange.start;
                    }
                });
            }, true);

            changeHeight(); // when page loads          
            element.bind('scroll', function(event, args) {
                if (scrollTop != event.target.scrollTop) {
                    // 说明是人为滚动
                    scope.glue = false;
                }
                // 滚动方向
                scrollTop = event.target.scrollTop;
                var scrollHeight = event.target.scrollHeight;
                scrollBottom = scrollTop - scrollHeight;

                //var pos = event.target.scrollTop;
                if (scrollTop == 0) {
                    scope.onTop();
                }
                else if (scrollTop == scrollHeight - element.height()) {
                    scope.onBottom();
                }
            });
        }
    };
}

/**
 *
 * Pass all functions into module
 */
angular
    .module('inspinia')
    .directive('pageTitle', pageTitle)
    .directive('sideNavigation', sideNavigation)
    .directive('iboxTools', iboxTools)
    .directive('minimalizaSidebar', minimalizaSidebar)
    .directive('vectorMap', vectorMap)
    .directive('sparkline', sparkline)
    .directive('icheck', icheck)
    .directive('iEnterKeyPress', iEnterKeyPress)
    .directive('iSpinner', iSpinner)
    .directive('ionRangeSlider', ionRangeSlider)
    .directive('dropZone', dropZone)
    .directive('responsiveVideo', responsiveVideo)

    //.directive('opEditable', opEditable)
    .directive('opAction', opAction)
    .directive('opGrid', opGrid)
    .directive('opForm', opForm)
    .directive('opRow', opRow)
    .directive('opCodeMode',opCodeMode)
    .directive('opPager', opPager)
    .directive('opFilters',opFilters)
    .directive('opPageFilter', opPageFilter)
    .directive('ngEnter',ngEnter)
    .directive('wrapper',wrapper)
