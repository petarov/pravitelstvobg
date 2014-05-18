angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {
})

.controller('NewsCtrl', function($scope, $ionicLoading, NSOURCES, News) {

  $ionicLoading.show({
    template: 'Зареждане...'
  });

  News.all(NSOURCES.NEWS).then(function(resp) {
    $scope.news = resp;
    $ionicLoading.hide();
  },
  function(err) {
    $ionicLoading.hide();
    //TODO
    //
  });



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