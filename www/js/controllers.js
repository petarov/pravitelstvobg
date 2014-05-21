/*
 * The MIT License
 *
 * Copyright (c) 2014 Petar Petrov
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

var updateNews = function($scope, $ionicLoading, source, News) {
  $scope.updateNews = function(force) {
    $ionicLoading.show({
      template: 'Зареждане...'
    });

    News.all(source, force).then(function(resp) {
      $scope.news = resp.items;
      $scope.lastUpdate = resp.lastUpdate;
      $ionicLoading.hide();
      // show badge only if we did a fresh update
      $scope.badge = {};
      $scope.badge.show = force || resp.fromCache !== true;
      $scope.badge.count = resp.items.length;
    },
    function(err) {
      $ionicLoading.hide();
      // Notify user
      navigator.notification.alert(
        err, // message
        null,   // callback
        'Грешка', // title
        'OK'    // buttonName
        );  
    });
  };

  $scope.updateNews(false);
};

var showNewsItem = function($scope, $stateParams, News, route) {
  console.log(route);
  News.get(route, $stateParams.id).then(function(resp) {
    $scope.item = resp;
  },
  function(err) {
    $scope.item = {title: err};
  });
};

angular.module('pbg.controllers', [])

.controller('AboutCtrl', function($scope) {
  cordova.getAppVersion(function (version) {
    $scope.appVersion = version;
  });  
})

.controller('NewsCtrl', function($scope, $ionicLoading, NSOURCES, News) {
  $scope.tabTitle = 'Новини';
  $scope.route = NSOURCES.NEWS.name;

  updateNews($scope, $ionicLoading, NSOURCES.NEWS, News);
})
.controller('NewsDetailCtrl', function($scope, $stateParams, NSOURCES, News) {
  showNewsItem($scope, $stateParams, News, NSOURCES.NEWS.name);
})

.controller('EventsCtrl', function($scope, $ionicLoading, NSOURCES, News) {
  $scope.tabTitle = 'Събития';
  $scope.route = NSOURCES.EVENTS.name;

  updateNews($scope, $ionicLoading, NSOURCES.EVENTS, News);
})
.controller('EventsDetailCtrl', function($scope, $stateParams, NSOURCES, News) {
  showNewsItem($scope, $stateParams, News, NSOURCES.EVENTS.name);
})

.controller('DecisionsCtrl', function($scope, $ionicLoading, NSOURCES, News) {
  $scope.tabTitle = 'Решения';
  $scope.route = NSOURCES.DECISIONS.name;

  updateNews($scope, $ionicLoading, NSOURCES.DECISIONS, News);
})
.controller('DecisionsDetailCtrl', function($scope, $stateParams, NSOURCES, News) {
  showNewsItem($scope, $stateParams, News, NSOURCES.DECISIONS.name);
})

; //eof