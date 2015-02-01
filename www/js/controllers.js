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

var isApp = function() {
  /**
   * Do not rely on this for any significant operations!
   */
  var isApp = document.URL.indexOf('http://') === -1 && 
    document.URL.indexOf('https://') === -1;
  return isApp;
}

var updateNews = function(force, $scope, $ionicLoading, source, News) {

    // $ionicLoading.show({
    //   template: 'Зареждане...'
    // });
    News.all(source, force).then(function(resp) {
      $scope.news = resp.items;
      $scope.lastUpdate = resp.lastUpdate;

      // $ionicLoading.hide();
      $scope.$broadcast('scroll.refreshComplete');
      
      // show badge only if we did a fresh update
      $scope.badge = {};
      $scope.badge.show = force || resp.fromCache !== true;
      $scope.badge.count = resp.items.length;
    },
    function(err) {
      // $ionicLoading.hide();
      $scope.$broadcast('scroll.refreshComplete');
      // Notify user
      if (isApp()) {
        navigator.notification.alert(
          err, // message
          null,   // callback
          'Грешка', // title
          'OK'    // buttonName
          );
      } else {
        console.log(err);
      }
    });

};

var showNewsItem = function($scope, $stateParams, News, storeName) {
  News.get(storeName, $stateParams.id).then(function(resp) {
    $scope.item = resp;
  },
  function(err) {
    $scope.item = {title: err};
  });
  $scope.go2Uri = function(uri) {
    // open news item in an InAppBrowser instance
    var ref = window.open(uri, '_blank', 'location=no');    
  };
  $scope.shareIt = function(item) {
    if (isApp()) {
      window.plugins.socialsharing.share(
        item.title || '', 
        'Споделено от приложението PravitelstvoBG',
        null,
        item.link || '');
    }
  };
};

angular.module('pbg.controllers', ['pbg.consts'])

.controller('AboutCtrl', ['$scope', function($scope) {
  cordova && cordova.getAppVersion(function (version) {
    $scope.appVersion = version;
  });
  $scope.uriLicense = 'http://opensource.org/licenses/MIT';
  $scope.uriGbg = 'http://www.government.bg';
  $scope.go2Uri = function(uri) {
    // open news item in an InAppBrowser instance
    var ref = window.open(uri, '_blank', 'location=no');    
  };  
}])

.controller('NewsCtrl', ['$scope', '$ionicLoading', 'NSOURCES', 'News', 
  function($scope, $ionicLoading, NSOURCES, News) {

  $scope.tabTitle = 'Новини';
  $scope.route = NSOURCES.NEWS.name;
  $scope.onRefresh = function(force) {
    updateNews(force, $scope, $ionicLoading, NSOURCES.NEWS, News);
  };

  $scope.onRefresh(false);
}])

.controller('NewsDetailCtrl', ['$scope', '$stateParams', 'NSOURCES', 'News', 
  function($scope, $stateParams, NSOURCES, News) {

  showNewsItem($scope, $stateParams, News, NSOURCES.NEWS.storeName);
}])

.controller('EventsCtrl', ['$scope', '$ionicLoading', 'NSOURCES', 'News', 
  function($scope, $ionicLoading, NSOURCES, News) {

  $scope.tabTitle = 'Събития';
  $scope.route = NSOURCES.EVENTS.name;
  $scope.onRefresh = function(force) {
    updateNews(force, $scope, $ionicLoading, NSOURCES.EVENTS, News);
  };

  $scope.onRefresh(false);
}])

.controller('EventsDetailCtrl', ['$scope', '$stateParams', 'NSOURCES', 'News', 
  function($scope, $stateParams, NSOURCES, News) {

  showNewsItem($scope, $stateParams, News, NSOURCES.EVENTS.storeName);
}])

.controller('DecisionsCtrl', ['$scope', '$ionicLoading', 'NSOURCES', 'News', 
  function($scope, $ionicLoading, NSOURCES, News) {

  $scope.tabTitle = 'Решения';
  $scope.route = NSOURCES.DECISIONS.name;
  $scope.onRefresh = function(force) {
    updateNews(force, $scope, $ionicLoading, NSOURCES.DECISIONS, News);
  };

  $scope.onRefresh(false);
}])

.controller('DecisionsDetailCtrl', ['$scope', '$stateParams', 'NSOURCES', 'News', 
  function($scope, $stateParams, NSOURCES, News) {

  showNewsItem($scope, $stateParams, News, NSOURCES.DECISIONS.storeName);
}])

; //eof