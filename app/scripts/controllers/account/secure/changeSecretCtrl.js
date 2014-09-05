define(['controllers/module'], function (controllers) {
    "use strict";
    controllers.controller('changeSecretCtrl',['$scope', 'toaster', 'secureService',
        function ($scope, toaster, secureService) {

            $scope.qesOpts = [
                {id: '1', title: '家庭住址'},
                {id: '2', title: '你母亲的名字'},
                {id: '3', title: '你父亲的名字'}
            ];

            $scope.currentVertifyStatus = false;
            $scope.newVertifyStatus = false;

            $scope.secret = {};
            $scope.newSecret = {};

            $scope.vertifyQes = function (formInstance) {
                $scope.cuProcessing = true;

                secureService.vertifyQes(
                    $scope.secret,
                    function(res){
                        $scope.currentVertifyStatus = true;
                        $scope.cuProcessing = false;
                        toaster.pop('success','当前密保验证成功！');
                    },
                    function(data){
                        data.errors.forEach(function (error, index, array) {
                            formInstance[error.field].$error[error.name] = true;
                        });
                        formInstance.$setPristine();
                        toaster.pop('error','答案不正确！');
                        $scope.currentVertifyStatus = false;
                        $scope.cuProcessing = false;
                    }
                );
            };

            $scope.changeSecret = function() {
                $scope.newProcessing = true;

                secureService.changeSecret(
                    $scope.newSecret,
                    function(res) {
                        $scope.newVertifyStatus = true;
                        $scope.newProcessing = false;
                        toaster.pop('success','更换密保问题成功！');
                    },
                    function() {
                        toaster.pop('error','内部错误，请联系管理员！');
                        $scope.newVertifyStatus = false;
                        $scope.newProcessing = false;
                    }
                );

            }

        }]);
});