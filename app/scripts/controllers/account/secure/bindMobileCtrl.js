define(['controllers/module'], function (controllers) {
    "use strict";
    controllers.controller('bindMobileCtrl',['$scope', 'toaster', 'secureService',
        function ($scope, toaster, secureService) {
            $scope.bindStatus = false;
            $scope.user = {};

            $scope.bindMobile = function (formInstance) {
                $scope.processing = true;

                secureService.bindMobile(
                    $scope.user,
                    function(res){
                        $scope.processing = false;
                        $scope.bindStatus = true;
                        toaster.pop('success','绑定手机成功！');
                    },
                    function(data){
                        data.errors.forEach(function (error, index, array) {
                            formInstance[error.field].$error[error.name] = true;
                        });
                        formInstance.$setPristine();
                        console.info('post error - ', data);
                        toaster.pop('error','验证码错误！');
                        $scope.processing = false;
                        $scope.bindStatus = false;
                    }
                );
            };



        }]);
});