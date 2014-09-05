define(['controllers/module'], function (controllers) {
    "use strict";
    controllers.controller('modifyLoginPwdCtrl',['$scope','$state', 'toaster', 'ipCookie', 'secureService', function($scope, $state, toaster, ipCookie, secureService){
        console.log('modifyLoginPwdCtrl');
        $scope.user = {
            userName: ipCookie('user').userName
        };
        $scope.modifyStatus = false;
        $scope.updateLoginPwd = function(formInstance) {

            $scope.processing = true;

            secureService.modifyLoginPwd (
                $scope.user,
                function (res) {
                    $scope.processing = false;
                    $scope.modifyStatus = true;
                    toaster.pop('success','密码修改成功!');

                },
                function (data, status, headers, config) {
                    data.errors.forEach(function (error, index, array) {
                        formInstance[error.field].$error[error.name] = true;
                    });
                    formInstance.$setPristine();
                    console.info('post error - ', data);
                    toaster.pop('error', '修改登录密码失败！');
                    $scope.processing = false;
                }
            );
        }
    }])
});