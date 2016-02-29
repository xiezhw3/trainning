angular
    .module('inspinia')
    .factory('Agent', ['$resource',
        function($resource){
            var base = "/proxy/agent"
            return $resource(base + "/",
                             {
                             },
                             {
                                'getData': {
                                    method: 'GET',
                                    url: base + '/',
                                    // isArray: true,
                                    params: {
                                        from_time: '@from_time',
                                        to_time: '@to_time',
                                        ips: '@ips'
                                    },
                                },
                             });
    }])
    ;
