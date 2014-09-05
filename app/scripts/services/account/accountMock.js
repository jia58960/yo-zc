define(['../module'],
    function(services){
        "use strict";

        services.run(['$httpBackend', '$log', function ($httpBackend, $log){

            $httpBackend.whenGET(/^\/mockData\//).passThrough();

        }])
    }
);