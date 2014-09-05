define(['services/module'],
    function(services){
        "use strict";
        services.service('accountService', ['$http', function($http){
            console.log('accountService');

            return {
                getAccountData: function(para,success,error){
                    console.log(para);
                    var path = para.uid + '.json';
                    console.log(path);
                    $http.get('/mockData/account/'+path).success(function(res) {
                        success(res);
                    }).error(error);

                }
            }
        }])
    }
);