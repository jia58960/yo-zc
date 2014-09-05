define(['./module'],function(services){
    "use strict";

    services.factory('authorization',['$scope', '$rootScope', '$state', function($scope, $rootScope, $state){

        return {
            authorize: function(){

                var loginStatus = $scope.auth.isLoggedIn();
                if (loginStatus) {
                    console.log('cookieOk');
                    //已登录
                    if ($rootScope.toState.data.roles && $rootScope.toState.data.roles.length > 0 && !$scope.auth.isInAnyRole($rootScope.toState.data.roles)) {
                        //角色不对头
                        $state.go('public.accessdenied');
                    }
                } else {
                    console.log('cookieNotOk');
                    //未登录
                    $state.go('anon.login');
                }

            }
        }
    }])
});