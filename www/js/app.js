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

'uses strict';

angular.module('pbg', ['ionic', 'pbg.controllers', 'pbg.services'])

.run(['$ionicPlatform', function($ionicPlatform) {
  
  // init local storage
  storage.init();     
  // init date-time lib
  moment.lang('bg');

  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
}])

.config(['$stateProvider', '$urlRouterProvider', '$ionicConfigProvider', 
  function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

  $stateProvider
  .state('tab', {
    url: "/tab",
    abstract: true,
    templateUrl: "templates/tabs.html"
  })
  .state('tab.about', {
    url: '/about',
    views: {
      'tab-about': {
        templateUrl: 'templates/tab-about.html',
        controller: 'AboutCtrl'
      }
    }
  })
  .state('tab.news', {
    url: '/news',
    views: {
      'tab-news': {
        templateUrl: 'templates/tab-news.html',
        controller: 'NewsCtrl'
      }
    }
  })
  .state('tab.news-detail', {
    url: '/news/:id',
    views: {
      'tab-news': {
        templateUrl: 'templates/news-detail.html',
        controller: 'NewsDetailCtrl'
      }
    }
  })
  .state('tab.events', {
    url: '/events',
    views: {
      'tab-events': {
        templateUrl: 'templates/tab-news.html',
        controller: 'EventsCtrl'
      }
    }
  })
  .state('tab.events-detail', {
    url: '/events/:id',
    views: {
      'tab-events': {
        templateUrl: 'templates/news-detail.html',
        controller: 'EventsDetailCtrl'
      }
    }
  })    
  .state('tab.decisions', {
    url: '/decisions',
    views: {
      'tab-decisions': {
        templateUrl: 'templates/tab-news.html',
        controller: 'DecisionsCtrl'
      }
    }
  })
  .state('tab.decisions-detail', {
    url: '/decisions/:id',
    views: {
      'tab-decisions': {
        templateUrl: 'templates/news-detail.html',
        controller: 'DecisionsDetailCtrl'
      }
    }
  });
  $ionicConfigProvider.backButton.text('').previousTitleText(false);
  $urlRouterProvider.otherwise('/tab/news');
}]);

