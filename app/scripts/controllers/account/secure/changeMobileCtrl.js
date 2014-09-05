define(['controllers/module'], function (controllers) {
    "use strict";
    controllers.controller('changeMobileCtrl',['$scope', 'toaster', 'secureService',
        function ($scope, toaster, secureService) {

            $scope.currentVertifyStatus = false;
            $scope.newVertifyStatus = false;

            $scope.user = {
                'currentMobile': '13480657523'
            };

            $scope.verfityCurrentMobile = function (formInstance) {
                $scope.cuProcessing = true;
                secureService.vertifyCurrentMobile(
                    $scope.user,
                    function(res){
                        $scope.currentVertifyStatus = true;
                        $scope.cuProcessing = false;
                    },
                    function(data){
                        data.errors.forEach(function (error, index, array) {
                            formInstance[error.field].$error[error.name] = true;
                        });
                        formInstance.$setPristine();
                        console.info('post error - ', data);
                        toaster.pop('error','验证码错误！');
                        $scope.cuProcessing = false;
                    }
                );
            };

            $scope.newMobileVertify = function (formInstance) {
                $scope.newProcessing = true;

                secureService.vertifyNewMobile(
                    $scope.user,
                    function(res){
                        $scope.newVertifyStatus = true;
                        $scope.newProcessing = false;
                    },
                    function(data){
                        data.errors.forEach(function (error, index, array) {
                            formInstance[error.field].$error[error.name] = true;
                        });
                        formInstance.$setPristine();
                        console.info('post error - ', data);
                        toaster.pop('error','验证码错误！');
                        $scope.newProcessing = false;
                    }
                );
            };

        }]);
});