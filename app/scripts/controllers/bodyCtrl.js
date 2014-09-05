define(['./module','../services/anon/authService'],
    function (controllers) {
    'use strict';
    controllers.controller('bodyCtrl',['$rootScope','$scope','authService','$http','$timeout','$state','ipCookie', function ($rootScope, $scope, authService, $http, $timeout, $state,ipCookie) {
        console.log('bodyCtrl');
        /*****
            carousel
        *****/
        $scope.slideshow = {};
        $scope.slideshow.slides = [
            'images/nature_7.jpg',
            'images/abstract_8.jpg',
            'images/nature_3.jpg',
            'images/abstract_2.jpg',
            'images/nature_9.jpg'
        ];
        var logId = 0;
        $scope.slideshow.log = [];
        $scope.slideshow.start = function(){
            $scope.slideshow.log.push({ id: ++logId, message: 'start' });
        };
        $scope.slideshow.before = function(){
            $scope.slideshow.log.push({ id: ++logId, message: 'before' });
        };
        $scope.slideshow.after = function(){
            $scope.slideshow.log.push({ id: ++logId, message: 'after' });
        };
        $scope.slideshow.end = function () {
            $scope.slideshow.log.push({ id: ++logId, message: 'end' });
        };



        /*****
            login
         *****/
        if(ipCookie('user')) {
            $scope.user=ipCookie('user');
            $rootScope.isLogged = true;
        }

        $scope.login = {
            working: false,
            wrong: false
        };

        $scope.logout = function () {
            authService.logoutUser(
                function(){
                    $rootScope.isLogged = false;
                    $state.go('site.index');
                },
                function(){
                    $rootScope.error('退出失败！');
                }
            );
        };

    }]);
});
