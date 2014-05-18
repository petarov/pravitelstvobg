angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {
})

.controller('NewsCtrl', function($scope, $ionicLoading, News) {

  $ionicLoading.show({
    template: 'Зареждане...'
  });

  News.all().then(function(resp) {
    $scope.news = resp;
    $ionicLoading.hide();
  },
  function(err) {
    $ionicLoading.hide();
    //TODO
    //
  });

})

.controller('NewsDetailCtrl', function($scope, $stateParams, News) {
  $scope.item = News.get($stateParams.id);
})

.controller('EventsCtrl', function($scope) {
})

.controller('DecisionsCtrl', function($scope) {
})

; //eof