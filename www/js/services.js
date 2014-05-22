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

var convertDate2Text = function(date) {
  // date-time as text info
  var dt = moment(Date.parse(date));
  if (dt.isValid()) {
    var day = moment(dt).utc()
      , now = new moment().utc()
      , text = day.isBefore(now) ? day.from(now) : day.format("DD-MM-YYYY HH:mm");
      return text;
  }
  return date;
};

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
        , storedData = storage.get(source.storeName)
        , update = forceUpdate === true;

      // return cached data
      if (storedData && !update) {
        storedData.fromCache = true;
        deferred.resolve(storedData);
        return deferred.promise;
      }

      // fetch data from http
      RSS.all(source.url + new Date().getTime()).then(function(data) {
        if (data.items.length > 0) {
          
          // normalize data items props
          for (var i = 0; i < data.items.length; i++) {
            data.items[i].id = i;
            data.items[i].textDate = convertDate2Text(data.items[i].pubDate);
            data.items[i].pubDate = moment(Date.parse(data.items[i].pubDate))
              .format("DD-MM-YYYY HH:mm");
          };

          // date-time as text info
          data.lastUpdate = convertDate2Text(data.lastUpdate);
          
          // remove prev data
          if (storedData) {
            storage.remove(source.storeName);
          }
          // save new data
          storage.save(source.storeName, data);

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

    get: function(storeName, id) {
      var deferred = $q.defer();

      var storedData = storage.get(storeName);
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

/**
 * Fetch RSS data for given url
 * @param  {[type]} $q    [description]
 * @param  {[type]} $http [description]
 * @return {[type]}       [description]
 */
.factory('RSS', function($q, $http) {

  var e = document.createElement('div');
  function unescapeHtml(text) {
    e.innerHTML = text;
    return e.childNodes.length === 0 ? text : e.childNodes[0].nodeValue;    
  };

  function parseXml(xml) {
     var dom = null;
     if (window.DOMParser) {
        try { 
           dom = (new DOMParser()).parseFromString(xml, "text/xml"); 
        } 
        catch (e) { 
          console.error(e);
          dom = null; 
        }

     } else if (window.ActiveXObject) {
        try {
           dom = new ActiveXObject('Microsoft.XMLDOM');
           dom.async = false;
           if (!dom.loadXML(xml)) // parse error ..

              window.alert(dom.parseError.reason + dom.parseError.srcText);
        } 
        catch (e) { 
          console.error(e);
          dom = null; 
        }

     }
     return dom;
  };

  return {
    all: function(url) {
      var deferred = $q.defer();

      $http.get(url).success(function(data) {
        var result = {
          lastUpdate: '', 
          items: []
        };

        // parse xml data to DOM object
        var parsed = parseXml(data);
        if (!parsed) {
          deferred.reject('Гришка при четена на листа с новини! Моля опитайте по-късно.');
          return deferred.promise;
        }
        // convert DOM object to JSON string
        var json = xml2json(parsed);
        // fix nasty bug during convertion
        // TODO: fix in xml2json
        json = json.replace('undefined', '');
        // get JSON object
        json = JSON.parse(json);
        // get list of news items
        result.items = json.rss.channel.item;

        for (var i = 0; i < result.items.length; i++) {
          var item = result.items[i];
          // escape title 2 times, since it &-s were already escaped
          // when the xml was being parsed
          item.title = unescapeHtml(unescapeHtml(item.title));
          item.link = unescapeHtml(item.link);
        };
        
        result.lastUpdate = json.rss.channel.pubDate;

        // resolve promise
        deferred.resolve(result);

      }).error(function(err) {
        deferred.reject(err);
      });

      return deferred.promise;
    }
  }
})

; //eof