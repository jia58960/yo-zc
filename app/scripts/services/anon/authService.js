define(['../module'], function (services) {
    "use strict";
    services.factory('authService', ['ipCookie', '$http', function (ipCookie, $http) {
        console.log('authservice');
        var currentUser = ipCookie('user') || {userName:'',roles:null};

        console.log(currentUser);

        //ipCookie.remove('user');

        function changeUser (user){
            angular.extend('currentUser',user);
        }

        return {

            isLoggedIn: function() {
                return ipCookie('user');
            },

            vertify: function(vertify, success, error) {
                $http.post('/registerVertify', vertify).success(function(res) {
                    success(user);
                }).error(error);
            },

            register: function(user, success, error) {
                $http.post('/register', user).success(function(res) {
                    changeUser(res);
                    success(user);
                }).error(error);
            },
            emailVertify: function(data, success, error) {
                $http.post('/emailVertify', data).success(function(res) {
                    success(res);
                }).error(error);
            },

            mobileVertify:function(data, success, error) {
                $http.post('/mobileVertify', data).success(function(res) {
                    success(res);
                }).error(error);
            },
            login: function(user, success, error, fina) {
                $http.post('/login', user).success(

                    function(user){
                        ipCookie.remove('user');
                        changeUser(user);
                        //console.log(user);
                        ipCookie('user',{'userName':user.userName,'roles':user.roles},{ expires: 21 });
                        success(user);
                    })
                    .error(error)
                    .finally(fina);
                },
            logoutUser: function (success,error) {
                $http.post('/logout','').success(
                   function(){
                       changeUser({
                           'userName':''
                       });
                       ipCookie.remove('user');
                       success();
                   }
                )
                .error(error);
            },
            isInRole: function(role) {
                if (!currentUser.roles) return false;

                return currentUser.roles.indexOf(role) != -1;
            },
            isInAnyRole: function(roles) {
                console.log('is in any role');
                console.log(currentUser);
                if (!currentUser.roles) return false;

                for (var i = 0; i < roles.length; i++) {
                    if (this.isInRole(roles[i])) return true;
                }

                return false;
            },
            user: currentUser
        };

    }]);
});

