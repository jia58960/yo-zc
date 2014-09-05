define(['../module','../../services/anon/authService'],
    function (controllers) {
    "use strict";

    controllers.controller('loginCtrl',['$rootScope','$scope', '$state','toaster','$http', '$timeout', function ($rootScope,$scope, $state,toaster,$http, $timeout) {
        console.log('loginCtrl');

        $rootScope.isLogged = false;

        $scope.login = {
            working: false,
            wrong: false
        };

        $scope.loginFn = function () {

            $scope.login.working = true;
            $scope.login.wrong = false;

            $scope.auth.login(
                $scope.login,
                function(res) {
                    $rootScope.isLogged = true;
                    $state.go('site.index');
                    $rootScope.error = null;
                },
                function(err){
                    $scope.login.wrong = true;
                    $timeout(function () {
                        $scope.login.wrong = false;
                    },
                    2000);
                },
                function(){
                    $scope.login.working = false;
                }
            );

        };

        $scope.logout = function () {
            $scope.auth.logoutUser(
                function(){
                    $rootScope.isLogged = false;
                    $state.go('site.index');
                    $rootScope.error = null;
                },
                function(){
                    $rootScope.error('退出失败！');
                }
            );
        };


    }])
});