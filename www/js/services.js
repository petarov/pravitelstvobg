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

angular.module('pbg.services', [])

/**
 * Fetch news items for given source
 * @param  {[type]} $q       [description]
 * @param  {[type]} NSOURCES [description]
 * @return {[type]}          [description]
 */
.factory('News', function($q, NSOURCES, RSS) {
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
      RSS.all(source.url).then(function(data) {
        if (data.items.length > 0) {
          
          // normalize data items props
          for (var i = 0; i < data.items.length; i++) {
            data.items[i].id = i;
            data.items[i].pubDate = moment(Date.parse(data.items[i].pubDate))
              .format("DD-MM-YYYY HH:mm");
          };

          // date-time as text info
          var dt = moment(Date.parse(data.lastUpdate));
          if (dt.isValid()) {
            var day = moment(dt).utc()
              , now = new moment().utc()
              , text = day.isBefore(now) ? day.from(now) : day.format("DD-MM-YYYY HH:mm");
            data.lastUpdate = text;
          }
          
          // remove prev data
          if (storedData) {
            storage.remove(source.name);
          }
          // save new data
          storage.save(source.name, data);

          // resolve promise
          deferred.resolve(data);

        } else {
          deferred.reject('Няма налична нова информация! Опитайте по-късно.');
        }

      },
      function(err) {
        console.error(err);
        deferred.reject('Проблем при зареждане на информацията! Проверете интернет връзката си.');
      });

      return deferred.promise;
    },

    get: function(sourceName, id) {
      var deferred = $q.defer();

      var storedData = storage.get(sourceName);
      var item = (storedData && storedData.items) && storedData.items[id];
      if (item) {
        deferred.resolve(item);
      } else {
        deferred.reject('Новината не може да бъде открита! Моля обновете.');
      }

      return deferred.promise;
    }
  }
})

.factory('RSS', function($q, $http) {
  return {
    all: function(url) {
      var deferred = $q.defer();

      $http.get(url).success(function(data) {

        // format items
        var result = {lastUpdate: '', items: []};
        $xml = $(data);
        
        result.lastUpdate = $xml.find('lastBuildDate').text();
        
        $xml.find('item').each(function() {
          var node = {};
          node.title = $(this).find('title').text();
          node.desc = $(this).find('description').text(); //.replace(/<(?:.|\n)*?>/gm, '');
          node.pubDate = $(this).find('pubDate').text();
          node.link = $(this).find('link').text();
          result.items.push(node);
        });
        
        // resolve 
        deferred.resolve(result);
      }).error(function(err) {
        deferred.reject(err);
      });

      return deferred.promise;
    }
  }
})

; //eof