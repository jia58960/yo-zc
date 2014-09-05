define(['controllers/module','services/anon/authService'], function (controllers) {
    "use strict";
    controllers.controller('registerCtrl', ['$scope', '$http', 'toaster', '$state', function ($scope, $http, toaster, $state) {

        $scope.registerStatus = false;
        $scope.vertifyStatus = false;


        //$scope.sendMailProcess = false;
        //$scope.sendmailEnd =false;

        $scope.user = {
            roles: ['user']
        };
        $scope.progress = 33;
        $scope.term =  true;

        $scope.register = function (formInstance) {
            $scope.processing = true;

            $scope.auth.register(
                $scope.user,
                function(data, status, headers, config){
                    console.info('post success - ', data);
                    $scope.processing = false;
                    $scope.registerStatus = true;
                    $scope.progress = 66;
                },

                function(data, status, headers, config){
                    data.errors.forEach(function (error, index, array) {
                        formInstance[error.field].$error[error.name] = true;
                    });
                    formInstance.$setPristine();
                    console.info('post error - ', data);
                    toaster.pop('error','用户名已注册！');
                    $scope.processing = false;
                }
            );
        };

        $scope.mobileVertify = true; //默认为手机验证方式
        $scope.emailVertify = false;

        $scope.toggle = function () {
          if ($scope.mobileVertify)  {
              $scope.emailVertify = true;
              $scope.mobileVertify = false;
          } else {
              $scope.mobileVertify = true;
              $scope.emailVertify = false;
          }
        };

        $scope.mobileV = {};
        $scope.emailV = {};
        //手机验证
        $scope.mobileVertifyPro = function (formInstance) {
            $scope.mobileVertifyProcessing = true;

            $scope.auth.mobileVertify(
                {   user:$scope.user,
                    vertify:$scope.mobileV
                },
                function(res){

                    $scope.vertifyStatus = true;
                    $scope.mobileVertifyProcessing = false;
                    $scope.progress = 100;
                    toaster.pop('success','手机验证成功！');

                },
                function(data, status, headers, config){
                    data.errors.forEach(function (error, index, array) {
                        formInstance[error.field].$error[error.name] = true;
                    });
                    formInstance.$setPristine();
                    console.info('post error - ', data);
                    toaster.pop('error','验证出错！');
                    $scope.mobileVertifyProcessing = false;
                }
            )
        };

        $scope.emailVertifyStatus = false;
        //邮箱验证
        $scope.emailVertifyPro = function (formInstance) {
            $scope.emailVertifyProcessing = true;

            $scope.auth.emailVertify(
                {   user:$scope.user,
                    vertify:$scope.emailV
                },
                function(res){
                    $scope.emailVertifyProcessing = false;
                    $scope.emailVertifyStatus = true;
                },
                function(data, status, headers, config){
                    data.errors.forEach(function (error, index, array) {
                        formInstance[error.field].$error[error.name] = true;
                    });
                    formInstance.$setPristine();
                    console.info('post error - ', data);
                    toaster.pop('error','验证出错！');
                    $scope.emailVertifyProcessing = false;
                    $scope.emailVertifyStatus = false;
                }
            )
        };

    }])
});