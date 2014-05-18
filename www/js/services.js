angular.module('starter.services', [])

/**
 * A simple example service that returns some data.
 */
.factory('NewsMock', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var news = [
    { id: 0, name: 'Scruff McGruff' },
    { id: 1, name: 'G.I. Joe' },
    { id: 2, name: 'Miss Frizzle' },
    { id: 3, name: 'Ash Ketchum' },
    { id: 4, name: 'Bla blaa' }
  ];

  return {
    all: function() {
      return news;
    },
    get: function(id) {
      // Simple index lookup
      return news[id];
    }
  }
})

.factory('News', function($q) {

  return {
    all: function() {
      var deferred = $q.defer();

      grss.fetch('http://localhost/news.rss', function(data, err) {
        if (err) {
          console.log(err);
          return;
        }

        if (data.items.length > 0) {
          deferred.resolve(data.items);
        } else {
          //TODO: err
        }

      });

      return deferred.promise;
    },

    // all: function() {
    //   return news;
    // },

    get: function(id) {
      // Simple index lookup
      return {}; //news[id];
    }
  }
})

; //eof