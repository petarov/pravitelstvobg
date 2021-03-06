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

var storage = {

  init: function() {
    this.storage = window.localStorage;
  },
  save: function(dataType, items) {
    if (dataType && this.storage) {
      this.storage.setItem(dataType, JSON.stringify(items));
    }
  },
  get: function(dataType) {
    if (dataType && this.storage) {
      var value = this.storage.getItem(dataType);
      if (value) {
        return JSON.parse(this.storage.getItem(dataType));
      }
    }

    return null;
  },
  remove: function(dataType) {
    if (dataType && this.storage) {
      this.storage.removeItem(dataType);
    }
  },
  clear: function() {
    if (this.storage) {
      this.storage.clear();
    }
  }
};