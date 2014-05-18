// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.constant('NSOURCES', {
  NEWS: {name: 'news', url: 'http://www.government.bg/cgi-bin/e-cms/rss.pl'},
  EVENTS: {name: 'events', url: 'http://www.government.bg/cgi-bin/e-cms/rss.pl?ch=0003'},
  DECISIONS: {name: 'decisions', url: 'http://www.government.bg/cgi-bin/e-cms/rss.pl?ch=0004'}
})

.run(function($ionicPlatform) {
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

    // init local storage
    storage.init();     
    // init date-time lib
    moment.lang('bg', {
      relativeTime : {
        future: "след %s",
        past:   "преди %s",
        s:  "секунди",
        m:  "минута",
        mm: "%d минути",
        h:  "час",
        hh: "%d часа",
        d:  "денy",
        dd: "%d дни",
        M:  "месец",
        MM: "%d месеца",
        y:  "година",
        yy: "%d години"
      }
    });
    moment.lang('bg');
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

    // setup an abstract state for the tabs directive
    .state('tab', {
      url: "/tab",
      abstract: true,
      templateUrl: "templates/tabs.html"
    })

    // Each tab has its own nav history stack:

    .state('tab.dash', {
      url: '/dash',
      views: {
        'tab-dash': {
          templateUrl: 'templates/tab-dash.html',
          controller: 'DashCtrl'
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
          templateUrl: 'templates/tab-events.html',
          controller: 'EventsCtrl'
        }
      }
    })

    .state('tab.decisions', {
      url: '/decisions',
      views: {
        'tab-decisions': {
          templateUrl: 'templates/tab-decisions.html',
          controller: 'DecisionsCtrl'
        }
      }
    })    

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/dash');

});

