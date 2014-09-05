define(['app'], function(app) {
  return app.run(['$rootScope', function ($rootScope) {

      /*$rootScope.$state = $state;
      $rootScope.$stateParams = $stateParams;*/
    /**
     * $rootScope.doingResolve is a flag useful to display a spinner on changing states.
     * Some states may require remote data so it will take awhile to load.
     */
    var resolveDone = function () {
        $rootScope.doingResolve = false;
    };

    $rootScope.doingResolve = false;

    $rootScope.$on('$stateChangeStart', function () {
      $rootScope.doingResolve = true;
    });

    $rootScope.$on('$stateChangeSuccess', resolveDone);
    $rootScope.$on('$stateChangeError', resolveDone);
    $rootScope.$on('$statePermissionError', resolveDone);

  }])
      .run(['$rootScope', 'authService', function($rootScope,authService){
          return $rootScope.auth = authService;
      }]);

  /*.config(['$httpProvider',
      function ($httpProvider) {
          // Use x-www-form-urlencoded Content-Type
          $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
          $httpProvider.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded';

          // Override $http service's default transformRequest
          $httpProvider.defaults.transformRequest = [function(data)
          {
              *//**
               * The workhorse; converts an object to x-www-form-urlencoded serialization.
               * @param {Object} obj
               * @return {String}
               *//*
              var param = function(obj)
              {
                  var query = '';
                  var name, value, fullSubName, subName, subValue, innerObj, i;

                  for(name in obj)
                  {
                      value = obj[name];

                      if(value instanceof Array)
                      {
                          for(i=0; i<value.length; ++i)
                          {
                              subValue = value[i];
                              fullSubName = name + '[' + i + ']';
                              innerObj = {};
                              innerObj[fullSubName] = subValue;
                              query += param(innerObj) + '&';
                          }
                      }
                      else if(value instanceof Object)
                      {

                          for(subName in value)
                          {

                              subValue = value[subName];
                              if(subValue != null){
                                  // fullSubName = name + '[' + subName + ']';
                                  fullSubName = name + '.' + subName;
                                  // fullSubName =  subName;
                                  innerObj = {};
                                  innerObj[fullSubName] = subValue;
                                  query += param(innerObj) + '&';
                              }
                          }
                      }
                      else if(value !== undefined ) //&& value !== null
                      {
                          query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
                      }
                  }

                  return query.length ? query.substr(0, query.length - 1) : query;
              };

              return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
          }];

          $httpProvider.defaults.useXDomain = true;
          // delete $httpProvider.defaults.headers.common['X-Requested-With'];
      }]);*/
});