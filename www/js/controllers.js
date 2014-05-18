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

angular.module('pbg.controllers', [])

.controller('AboutCtrl', function($scope) {
})

.controller('NewsCtrl', function($scope, $ionicLoading, NSOURCES, News) {

  $scope.updateNews = function(force) {
    $ionicLoading.show({
      template: 'Зареждане...'
    });

    News.all(NSOURCES.NEWS, force).then(function(resp) {
      $scope.news = resp.items;
      $scope.lastUpdate = resp.lastUpdate;
      $ionicLoading.hide();
    },
    function(err) {
      $ionicLoading.hide();
      //TODO
      //
    });    
  };

  $scope.updateNews(false);

})

.controller('NewsDetailCtrl', function($scope, $stateParams, NSOURCES, News) {
  News.get(NSOURCES.NEWS, $stateParams.id).then(function(resp) {
    $scope.item = resp;
  },
  function(err) {
    $scope.item = {title: err};
  });
})

.controller('EventsCtrl', function($scope) {
})

.controller('DecisionsCtrl', function($scope) {
})

; //eof