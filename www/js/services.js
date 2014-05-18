angular.module('starter.services', [])

/**
 * Fetch news items for given source
 * @param  {[type]} $q       [description]
 * @param  {[type]} NSOURCES [description]
 * @return {[type]}          [description]
 */
.factory('News', function($q, NSOURCES) {
  return {
    all: function(source, forceUpdate) {
      var deferred = $q.defer()
        , url = ''
        , storedData = storage.get(source.name)
        , update = forceUpdate === true;

      // return cached data
      if (storedData && !update) {
        deferred.resolve(storedData);
        return deferred.promise;
      }

      // fetch data from http
      grss.fetch('http://192.168.1.125/news.rss', function(data, err) {
        if (err) {
          console.error(err);
          deferred.reject('Проблем при зареждане на информацията! Проверете интернет връзката си.');
        } else if (data.items.length > 0) {
          
          // normalize data items props
          for (var i = 0; i < data.items.length; i++) {
            data.items[i].id = i;
            data.items[i].pubDate = moment(data.items[i].pubDate).format("DD-MM-YYYY HH:mm");
          };
          
          // remove prev data
          if (storedData) {
            storage.remove(source.name);
          }
          // save new data
          storage.save(source.name, data.items);

          // resolve promise
          deferred.resolve(data.items);

        } else {
          deferred.reject('Няма налична нова информация! Опитайте по-късно.');
        }

      });

      return deferred.promise;
    },

    get: function(source, id) {
      var deferred = $q.defer();

      var storedData = storage.get(source.name);
      var item = storedData && storedData[id];
      if (item) {
        deferred.resolve(item);
      } else {
        deferred.reject('Новината не може да бъде открита! Моля обновете.');
      }

      return deferred.promise;
    }
  }
})

; //eof