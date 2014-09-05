define(['../module','../../services/account/accountService'],
    function (controllers) {
        "use strict";
        controllers.controller('accountCtrl',['$scope', 'toaster','$state','accountService','ipCookie', function($scope, toaster,$state, accountService, ipCookie){
            console.log('accountCtrl');

            if (!$scope.auth.isLoggedIn()) {
                $state.go('anon.login');
                toaster.pop('error', "", '用户未登录');
            } else {
                accountService.getAccountData(
                    {uid: ipCookie('user').userName},
                    function (res) {
                        $scope.accountInfo = res;
                    },
                    function () {
                        toaster.pop('error', '获取数据失败！')
                    }
                )
            }
        }])
    }
);