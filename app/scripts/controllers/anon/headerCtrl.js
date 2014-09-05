define(['../module','../../services/anon/authService'],
    function (controllers) {
    "use strict";

    controllers.controller('headerCtrl',['$rootScope','$scope','authService', 'ipCookie','$state', function ($rootScope, $scope, authService, ipCookie, $state) {
        console.log('headerCtrl');
        if(ipCookie('user')) {

            $scope.user = ipCookie('user');

            $rootScope.isLogged = true;
        }
        $scope.logout = function (){
            console.log('logout');
            authService.logoutUser(
                function(){
                    $rootScope.isLogged = false;
                    $state.go('site.index');
                },
                function(){
                    $rootScope.error('退出失败！');
                }
            );
        }
    }])
});