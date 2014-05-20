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

angular.module('pbg', ['ionic', 'pbg.controllers', 'pbg.services'])

.constant('NSOURCES', {
  // NEWS: {name: 'news', url: 'http://www.government.bg/cgi-bin/e-cms/rss.pl'},
  // EVENTS: {name: 'events', url: 'http://www.government.bg/cgi-bin/e-cms/rss.pl?ch=0003'},
  // DECISIONS: {name: 'decisions', url: 'http://www.government.bg/cgi-bin/e-cms/rss.pl?ch=0004'}
  // Tests
  NEWS: {name: 'news', url: 'http://localhost:81/rss/rss.xml'},
  EVENTS: {name: 'events', url: 'http://localhost:81/rss/rss.02.xml'},
  DECISIONS: {name: 'decisions', url: 'http://localhost:81/rss/rss.04.xml'}  
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
      url: '/news/:route/:id',
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

    .state('tab.decisions', {
      url: '/decisions',
      views: {
        'tab-decisions': {
          templateUrl: 'templates/tab-news.html',
          controller: 'DecisionsCtrl'
        }
      }
    })    

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/news');

});

