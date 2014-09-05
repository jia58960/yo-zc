define(['controllers/module'], function (controllers) {
    "use strict";
    controllers.controller('retrievePayPwdCtrl',['$scope', 'toaster', 'secureService',
        function ($scope, toaster, secureService) {
            $scope.retrieveStatus = false;
            $scope.qesOpts = [
                {id: '1', title: '家庭住址'},
                {id: '2', title: '你母亲的名字'},
                {id: '3', title: '你父亲的名字'}
            ];

            $scope.secret = {
            };

            $scope.retrievePayPwd = function (formInstance) {
                $scope.processing = true;
                secureService.retrievePayPwd(
                    $scope.secret,
                    function(res){
                        toaster.pop('success','支付密码重置成功！');
                        $scope.processing = false;
                        $scope.retrieveStatus = true;
                    },
                    function(data){
                        data.errors.forEach(function (error, index, array) {
                            formInstance[error.field].$error[error.name] = true;
                        });
                        formInstance.$setPristine();
                        $scope.processing = false;
                        console.info('post error - ', data);
                        toaster.pop('error','密保问题回答错误！');

                    }
                );
            };

        }]);
});