angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {
})

.controller('NewsCtrl', function($scope, News) {
  $scope.news = News.all();
})

.controller('NewsDetailCtrl', function($scope, $stateParams, News) {
  $scope.item = News.get($stateParams.id);
})

.controller('EventsCtrl', function($scope) {
})

.controller('DecisionsCtrl', function($scope) {
})

; //eof