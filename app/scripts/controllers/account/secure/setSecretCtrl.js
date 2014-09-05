define(['controllers/module'], function (controllers) {
    "use strict";
    controllers.controller('setSecretCtrl',['$scope', 'toaster', 'secureService',
        function ($scope, toaster, secureService) {
            $scope.qesOpts = [
                {id: '1', title: '家庭住址'},
                {id: '2', title: '你母亲的名字'},
                {id: '3', title: '你父亲的名字'}
            ];

            $scope.setStatus = false;
            $scope.secret = {};

            $scope.setSecret = function (formInstance) {
                $scope.processing = true;

                secureService.bindSecret(
                    $scope.secret,
                    function(res){
                        $scope.processing = false;
                        $scope.setStatus = true;
                        toaster.pop('success','密保问题设置成功！');
                    },
                    function(data){
                        formInstance.$setPristine();
                        toaster.pop('error','处理错误，请联系管理员！');
                        $scope.processing = false;
                        $scope.setStatus = false;
                    }
                );
            };



        }]);
});