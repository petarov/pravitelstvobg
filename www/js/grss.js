/*
 * The MIT License
 *
 * Copyright (c) 2013 Petar Petrov
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

var grss = {
  
  URL_NEWS: 'http://www.government.bg/cgi-bin/e-cms/rss.pl',
  URL_EVENTS: 'http://www.government.bg/cgi-bin/e-cms/rss.pl?ch=0003',
  URL_DECISIONS: 'http://www.government.bg/cgi-bin/e-cms/rss.pl?ch=0004',
  
  /**
   * Fetch RSS info
   */
  fetch: function(url, callback) {
    $.ajax({dataType: 'xml',
      type: 'GET',
      url: url, 
      cache: false
      }).done(function(data) {
      
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
        
        // fix links
//        var text = $(this).text();
//        text = text.replace(/href=\"\//g, 'target=\"_blank\" href=\"' + that.config.github.url);
//        // push 2 display
//        that.commits.push({content: text});
//        // check limit
//        if (that.commits().length > that.config.github.maxPosts)
//          return false;
      });
      
      // notify
      if (callback)
        callback(result, null);
      
      }).fail(function(error) {
        if (callback)
          callback(null, error);
      });     
  }
    
};