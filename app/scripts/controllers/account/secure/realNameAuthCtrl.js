define(['controllers/module','services/account/secure/secureService'],function (controllers) {
    "use strict";
    controllers.controller('realNameAuthCtrl',['$scope','$state', 'toaster', 'ipCookie', 'secureService', '$timeout', function ($scope, $state, toaster, ipCookie, secureService, $timeout) {
        console.log('realNameAuthCtrl');

            $scope.processing = true;
            $scope.user = ipCookie('user');

            secureService.getRealNameAuthData (
                $scope.user,
                function (res) {
                    $scope.realNameData = res;
                    $scope.processing = false;
                },
                function () {
                    $scope.realNameData = {};
                }
            );

            //vertify processing

            $scope.vertifyPro = false;
            $scope.realNameAuth = {};

            $scope.realNameVerify = function(formInstance){

                $scope.vertifyPro = true;

                $timeout(
                    function(){
                        secureService.realNameAuthVertify(
                            $scope.realNameAuth,
                            function (res) {
                                $scope.vertifyPro = false;
                                $scope.authStatus = true;
                            },
                            function(data, status, headers, config) {
                                data.errors.forEach(function (error, index, array) {
                                    formInstance[error.field].$error[error.name] = true;
                                });
                                toaster.pop('error','认证失败！');
                                $scope.vertifyPro = false;
                                $scope.authStatus = false;
                            }
                        )
                    },3000)

            }

    }])
});