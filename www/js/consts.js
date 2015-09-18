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

angular.module('pbg.consts', [])

.constant('NSOURCES', {
  NEWS: {
    name: 'news', 
    storeName: 'news20',
    // url: 'http://localhost/news.rss?'
    url: 'http://www.government.bg/cgi-bin/e-cms/rss.pl?'
  },
  EVENTS: {
    name: 'events', 
    storeName: 'events20',
    // url: 'http://localhost/events.rss?'
    url: 'http://www.government.bg/cgi-bin/e-cms/rss.pl?ch=0003&'
  },
  DECISIONS: {
    name: 'decisions', 
    storeName: 'decisions20',
    url: 'http://www.government.bg/cgi-bin/e-cms/rss.pl?ch=0004&'
  }
})

; // eof