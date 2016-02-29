function agentCtrl($rootScope, $scope, Agent, $q, $interval, notify, $modal) {
    $scope.notifyError = function(message) {
        notify({message: message, classes: 'alert alert-danger'})
    }

    $scope.reload = function(from_time, to_time, ips, info_type, info_keys) {
        if (from_time > to_time) {
            $scope.notifyError("开始时间不能大于截止时间") 
            return;
        }
        if (to_time - from_time > 60 * 60) {
            $scope.notifyError("监控数据时间区间不能大于一小时") 
            return;
        }

        $scope.displayData = {}
        $scope.data = Agent.getData({
          from_time: from_time,
          to_time: to_time,
          ips: ips
        });
        $q.all([$scope.data.$promise]).then(function() {
            angular.forEach($scope.data.data, function(machineData, ip) {
                $scope.displayData[ip] = extractMachineData(machineData);
            });
            if ((!$scope.ips || utils.isEmpty($scope.ips)) && $scope.data.ips) {
                $scope.ips = $scope.data.ips
                $scope.displayIps = [$scope.data.ips[0]]
            }
            if (utils.isEmpty(ips) && $scope.ips)
                ips = [$scope.ips[0]]
            $scope.render(ips, info_type, info_keys);
        });

        var extractMachineData = function(machineData) {
            var displayData = init(machineData);
            angular.forEach(machineData, function(oneInfo) {
                angular.forEach(oneInfo, function(dataValue, dataType){
                    if (dataType !== "_id" && dataType !== "ip" && dataType !== "create_time") {
                        angular.forEach(dataValue[dataType+"_info"], function(infoValue, info) {
                            displayData[dataType][info]['data'].push(
                                [
                                    oneInfo['create_time'] * 1000,
                                    infoValue
                                ]);
                        });
                    }
                });
               
            });
            return displayData;
        }
        
        var init = function(machineData) {
            var displayData = {}
            angular.forEach(machineData[0], function(dataValue, dataType){
                if (dataType !== "_id" && dataType !== "ip" && dataType !== "create_time") {
                    displayData[dataType] = {}
                    angular.forEach(dataValue[dataType+"_info"], function(infoValue, info) {
                        displayData[dataType][info] = {
                            "name": info,
                            "data": [],
                        }
                    });
                }
            });
            return displayData;
        }
    }
    
    $scope.chartType = 'line'
    $scope.render = function(ips, info_type, info_keys) {
        $scope.dataTypes = []
        $scope.highchartsNG = {}

        if (!ips || utils.isEmpty(ips))
            return;

        if (ips.length == 1)
            var rec_type = 'display'
        else
            var rec_type = 'compare'

        angular.forEach($scope.displayData[ips[0]], function(record, type) {
            if (info_type == "all" || info_type == type) {
                $scope.dataTypes.push(type);
                $scope.highchartsNG[type] = {
                    options: {
                        chart: {
                            type: $scope.chartType
                        },
                    },
                    series: [],
                    title: {
                        text: type
                    },
                    loading: false,
                    xAxis: {
                       type: 'datetime'
                    }, 
                    credits: {
                        enabled: false
                    }
                };
                if (rec_type == "compare") {
                    $scope.highchartsNG[type].useHighStocks = true;
                    $scope.highchartsNG[type].rangeSelector = { enabled: true };
                    $scope.highchartsNG[type].navigator = { enabled: true };
                }
                angular.forEach(ips, function(ip) {
                    angular.forEach($scope.displayData[ip][type], function(value, key){
                        if (info_keys[0] == "all" || info_keys.indexOf(key) != -1) {
                            if (rec_type == "compare")
                                value.name = ip + "-" + value.name
                            $scope.highchartsNG[type].series.push(value)
                        }
                    });
                });
            }
        });            
    }


    $scope.loadCurrent = function(ips, info_type, info_keys) {
        var now = (new Date()).getTime() / 1000
        var from_time = now - 20 * 60
        var to_time = now
        $scope.reload(from_time, to_time, ips, info_type, info_keys);
    }

    $scope.infoType = 'all'
    $scope.infoKeys = ['all']
    $scope.displayIps = []

    $scope.start = function() {
       var now = (new Date()).getTime() / 1000
       var from_time = now - 20 * 60
       var to_time = now 
       $scope.reload(from_time, to_time, $scope.displayIps, $scope.infoType, $scope.infoKeys);
         
       $scope.promise = $interval(function() {
           now = (new Date()).getTime() / 1000
           from_time = now - 20 * 60
           to_time = now 
           $scope.reload(from_time, to_time, $scope.displayIps, $scope.infoType, $scope.infoKeys);
       }, 1000 * 20);
    }
 
     $scope.stop = function() {
         if (typeof $scope.promise === 'undefined')
             return;
         $interval.cancel($scope.promise)
     }
}

function dashboardCtrl($scope, $q, $interval) {
    $scope.$parent.infoType = 'all'
    $scope.$parent.infoKeys = ['all']
    $scope.$parent.chartType = 'line'

    $scope.stop();
    $scope.start()
    $scope.fromTimeOnTimeSet = function(newDate, oldDate) {
        $scope.from_time = moment(newDate).valueOf() / 1000;
        if ($scope.to_time) {
           $scope.stop();
           $scope.reload($scope.from_time, $scope.to_time, $scope.displayIps,
                                $scope.infoType, $scope.infoKeys) 
        }
    }
    $scope.toTimeOnTimeSet = function(newDate, oldDate) {
        $scope.to_time = moment(newDate).valueOf() / 1000;
        if ($scope.from_time) {
            $scope.stop();
            $scope.reload($scope.from_time, $scope.to_time, $scope.displayIps,
                                $scope.infoType, $scope.infoKeys)
        }
    }
}

function machineInfoCtrl($scope, $q, $interval) {
    $scope.$parent.infoType = $scope.$state.current.data.type
    $scope.$parent.infoKeys = ['all']
    $scope.stop()
    $scope.start()

    $scope.monitorOutput = {}
    $scope.ipListOutput = []
    $q.all([$scope.data.$promise]).then(function() {
        if ($scope.ips && utils.isEmpty($scope.monitorOutput)) {
            $scope.monitorInput = {}
            // 默认每台机器的监控数据类型是一样的
            angular.forEach($scope.data.data[$scope.$parent.displayIps[0]][0], function(info_data, info_type) {
                if (info_type != '_id' && info_type != 'create_time' && info_type != 'ip') {
                    $scope.monitorInput[info_type] = []
                    $scope.monitorOutput[info_type] = []
                    angular.forEach(info_data[info_type+"_info"], function(value, type) {
                        $scope.monitorInput[info_type].push({name: type, maker: info_type, ticked: false})
                    });
                }
            });
        }
        if ($scope.ips && utils.isEmpty($scope.ipListInput)) {
            $scope.ipListInput = []
            angular.forEach($scope.ips, function(ip) {
               $scope.ipListInput.push({name: ip, maker: "", ticked: false}); // TODO 以后可加上机器名
            });
        }
    });

    $scope.monitorLang = {
        selectAll: "Select all",
        selectNone      : "Select none",
        nothingSelected : "All monitor type",
        reset           : "Undo all",
        search          : "Type here to search...",
    }
    $scope.ipsLang = {
        selectAll: "Select all",
        selectNone      : "Select none",
        nothingSelected : $scope.$parent.displayIps[0] || "No ip slected",
        reset           : "Undo all",
        search          : "Type here to search...",
    }

    $scope.update = function() {
        var infoKeys = []
        var displayIps = []

        angular.forEach($scope.monitorOutput[$scope.$parent.infoType], function(choseItem) {
            infoKeys.push(choseItem.name)
        });
        angular.forEach($scope.ipListOutput, function(choseItem) {
            displayIps.push(choseItem.name)
        });

        $scope.$parent.infoKeys = infoKeys;
        $scope.$parent.displayIps = displayIps;

        if (utils.isEmpty($scope.$parent.infoKeys))
            $scope.$parent.infoKeys = ['all']
        if (utils.isEmpty($scope.$parent.displayIps) && $scope.ips)
            $scope.$parent.displayIps = [$scope.ips[0]]
        $scope.loadCurrent($scope.$parent.displayIps, $scope.$parent.infoType, $scope.$parent.infoKeys)
    }
    
    $scope.selectAllOrNone = function(type) {
        if (type === 'ips')
            $scope.$parent.displayIps = []
        else
            $scope.monitorOutput[$scope.$parent.infoType] = []
        $scope.update()
    }


    $scope.fromTimeOnTimeSet = function(newDate, oldDate) {
        $scope.from_time = moment(newDate).valueOf() / 1000;
        if ($scope.to_time) {
           $scope.stop();
           $scope.reload($scope.from_time, $scope.to_time, $scope.displayIps,
                                $scope.infoType, $scope.infoKeys) 
        }
    }
    $scope.toTimeOnTimeSet = function(newDate, oldDate) {
        $scope.to_time = moment(newDate).valueOf() / 1000;
        if ($scope.from_time) {
            $scope.stop();
            $scope.reload($scope.from_time, $scope.to_time, $scope.displayIps,
                                $scope.infoType, $scope.infoKeys)
        }
    }

    $scope.chartTypes = {
        options: ['line', 'spline', 'scatter', 'bar', 'column', 'areaspline', 'area', 'spline'],
        selected: "line",
    }
    
    $scope.$watch('chartTypes.selected', function() {
        $scope.$parent.chartType = $scope.chartTypes.selected
        $scope.render($scope.displayIps, $scope.infoType, $scope.infoKeys)
    });
}
