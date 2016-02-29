angular
    .module('inspinia')
    .filter('safe', function() {
        return function(value) {
            return value;
        };
    })
    .filter('int', function() {
        return function(value) {
            return parseInt(value);
        };
    })
    .filter('floor', function() {
        return function(value) {
            var integer = parseInt(value);
            if (integer < value) {
                return integer + 1;
            }
        };
    })
    .filter('timeid', function() {
        return function(value, origin) {
            if (!value) {
                return '';
            }
            if (origin) {
                var basedate = new Date(value);
            }
            else {
                var basedate = new Date(value * 1000);
            }
            var yearNow = basedate.getFullYear()
            var monthNow = basedate.getMonth() + 1;
            monthNow = (monthNow < 10 ? '0' : '') + monthNow
            var dayNow = basedate.getDate();
            dayNow = (dayNow < 10 ? '0' : '') + dayNow
            var hourNow = basedate.getHours();
            hourNow = (hourNow < 10 ? '0' : '') + hourNow
            var minuteNow = basedate.getMinutes();
            minuteNow = (minuteNow < 10 ? '0' : '') + minuteNow
            var secondNow = basedate.getSeconds();
            secondNow = (secondNow < 10 ? '0' : '') + secondNow
            return yearNow + '' + monthNow + '' + dayNow + ''
                + hourNow + '' + minuteNow + '' + secondNow;
        }
    })
    .filter('fromtimestamp', function() {
        return function(value, origin) {
            if (!value) {
                return '';
            }
            if (origin) {
                var basedate = new Date(value);
            }
            else {
                var basedate = new Date(value * 1000);
            }
            var yearNow = basedate.getFullYear()
            var monthNow = basedate.getMonth() + 1;
            monthNow = (monthNow < 10 ? '0' : '') + monthNow
            var dayNow = basedate.getDate();
            dayNow = (dayNow < 10 ? '0' : '') + dayNow
            var hourNow = basedate.getHours();
            hourNow = (hourNow < 10 ? '0' : '') + hourNow
            var minuteNow = basedate.getMinutes();
            minuteNow = (minuteNow < 10 ? '0' : '') + minuteNow
            var secondNow = basedate.getSeconds();
            secondNow = (secondNow < 10 ? '0' : '') + secondNow
            return yearNow + '-' + monthNow + '-' + dayNow 
                + '\n' + hourNow + ':' +   minuteNow + ':' + secondNow;
        }
    })

    .filter('count', function() {
        return function(value) {
            if (!value) {
                return 0;
            }
            if (value.length !== undefined) {
                return value.length;
            }
            return Object.keys(value).length || 0;
        };
    })

    .filter('padding', function() {
        var F = "                 ";
        return function(input, n, fill) {
            input = input || "";
            fill = fill || " ";
            if (input.length >= n) {
                return input
            }
            if (fill.repeat) {
                var s = fill.repeat(n - input.length);
            }
            else {
                var s = F.substr(0, n - input.length);
            }
            return input + s;
        };
    })

    .filter('default', function() {
        return function(value, default_value) {
            if (value === null) {
                return default_value;
            }
            return value;
        }
    })

    .filter('truncate', function () {
        return function (input, chars, breakOnWord) {
            if (isNaN(chars)) return input;
            if (chars <= 0) return '';
            if (input && input.length > chars) {
                input = input.substring(0, chars);

                if (!breakOnWord) {
                    var lastspace = input.lastIndexOf(' ');
                    //get last space
                    if (lastspace !== -1) {
                        input = input.substr(0, lastspace);
                    }
                }else{
                    while(input.charAt(input.length-1) === ' '){
                        input = input.substr(0, input.length -1);
                    }
                }
                return input + '…';
            }
            return input;
        };
    })
            
    .filter('filesizeformat', function() {
        return function(bytes, precision) {
            if (bytes == 0) {
                return bytes;
            }
            if (isNaN(parseFloat(bytes)) || !isFinite(bytes)) return '-';
            if (typeof precision === 'undefined') precision = 1;
            var units = ['bytes', 'kB', 'MB', 'GB', 'TB', 'PB'],
            number = Math.floor(Math.log(bytes) / Math.log(1024));
            return (bytes / Math.pow(1024, Math.floor(number))).toFixed(precision) 
                +  ' ' + units[number];
        }
    })
    .filter('orderObjectBy', function() {
        return function(items, field, reverse, convert) {
            var filtered = [];
            angular.forEach(items, function(item) {
                filtered.push(item);
            });
            filtered.sort(function (a, b) {
                var x = a[field];
                var y = b[field];
                if (convert) {
                    x = window[convert](x);
                    y = window[convert](y);
                }
                return (x > y ? 1 : -1);
            });
            if(reverse) filtered.reverse();
            return filtered;
        };
    })
    .filter('newline', function(){
        return function(value) {
            return value.replace(/\n/g, '<br/>');
        }
    })

