define(['controllers/module'], function (controllers) {
    "use strict";
    controllers.controller('bindEmailCtrl',['$scope', 'toaster', 'secureService', 'ipCookie',
        function ($scope, toaster, secureService, ipCookie) {

            $scope.checkEmailData = true;

            $scope.bindStatus = false;
            $scope.user = ipCookie('user');

            secureService.getEmailData (
                $scope.user,
                function (res) {
                    $scope.emailData = res;
                    console.log(res);
                    $scope.checkEmailData = false;
                },
                function () {
                    toaster.pop('error','处理错误！');
                    $scope.emailData = {};
                }
            );

            $scope.email = {};
            $scope.bindEmail = function (formInstance) {

                $scope.processing = true;

                secureService.bindEmail(
                    $scope.email,
                    function(res){
                        $scope.processing = false;
                        $scope.bindStatus = true;
                        toaster.pop('success','已发送验证邮件，请注意查收！');
                    },
                    function(data){
                        console.log(data);
                        data.errors.forEach(function (error, index, array) {
                            formInstance[error.field].$error[error.name] = true;
                        });
                        formInstance.$setPristine();
                        console.info('post error - ', data);
                        toaster.pop('error','邮箱已注册！');
                        $scope.processing = false;
                        $scope.bindStatus = false;
                    }
                );
            };



        }]);
});