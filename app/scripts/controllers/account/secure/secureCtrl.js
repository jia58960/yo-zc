define(['controllers/module','services/account/secure/secureService'],function (controllers) {
    controllers.controller('secureCtrl',['$scope', '$state', 'toaster', 'ipCookie', 'secureService', function ($scope, $state, toaster, ipCookie, secureService) {

            secureService.getSecureData(
                {uid: ipCookie('user').userName},
                function (res) {
                    $scope.secureEntity = res;
                    console.log(res);
                },
                function () {
                    toaster.pop('error', '数据获取失败！')
                }
            );
    }])
});