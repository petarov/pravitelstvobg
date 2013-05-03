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

var app = {
    initialize: function() {
        this.bindEvents();
    },
    /** 
     * Bind any events that are required on startup. Common events are:
     * 'load', 'deviceready', 'offline', and 'online'.
     */
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        
        $("a:jqmData(icon='refresh')").bind('tap', this.onRefresh);
    },
    /**
     * The scope of 'this' is the event. In order to call the 'receivedEvent'
     * function, we must explicity call 'app.receivedEvent(...);'
     */
    onDeviceReady: function() {
    	
    	// http://jquerymobile.com/demos/1.1.0/docs/pages/phonegap.html
    	$.support.cors = true;
    	$.mobile.allowCrossDomainPages = true;
    	$.mobile.defaultPageTransition = 'none';
    	$.mobile.page.prototype.options.domCache = true;
    	
        app.receivedEvent('deviceready');
    },
    /**
     * Get all latest news entries for given section
     */
    onRefresh: function() {

    	grss.fetch(grss.URL_EVENTS, function(results, error) {
//	    	var $page = $("div:jqmData(role='page')");
	    	var $page = $("div[id='page-n']");
	    	var $content = $page.children( ":jqmData(role=content)" );
	    	
    		if (error) {
    			$content.html('<p>Error loading!</p>');
    		} else {
    			if (results.length > 0) {
    				
    				var tpl = '<ul data-role="listview" data-inset="true" data-filter="false"><li data-corners="false" data-shadow="false" data-iconshadow="true" data-wrapperels="div" data-icon="arrow-r" data-iconpos="right" data-theme="c" class="ui-btn ui-btn-icon-right ui-li-has-arrow ui-li ui-btn-up-c"><div class="ui-btn-inner ui-li"><div class="ui-btn-text"><a href="$$LINK$$" class="ui-link-inherit"><h3 class="ui-li-heading">$$TITLE$$</h3><p class="ui-li-desc">$$DESC$$</p></a></div><span class="ui-icon ui-icon-arrow-r ui-icon-shadow">&nbsp;</span></div></li></ul>';
    				var mark = '';
    				
    				for (var i = 0; i < results.length; i++) {
    					var entry = tpl;
    					entry = entry.replace('$$TITLE$$', results[i].title);
    					entry = entry.replace('$$DESC$$', results[i].title);
    					entry = entry.replace('$$LINK$$', results[i].link);
    					mark += entry;
    				}
    				// inject
    		    	$content.html(mark);
    		    	// enhance
    		    	$page.page();
    		    	$content.find( ":jqmData(role=listview)" ).listview();
    			
    			} else {
    				// TODO
    				alert('No new items!');
    			}
    		}
    	});
	
    	app.receivedEvent('tap');
	},
	/**
	 * Update DOM on a Received Event
	 */
    receivedEvent: function(id) {
    	console.log('Received Event: ' + id);
    	
    	if (id == 'deviceready') {
    		// keep footer visible at all times
//    		$(':jqmData(role=header)').fixedtoolbar( { tapToggle: false } );
//    		$(':jqmData(role=footer)').fixedtoolbar( { tapToggle: false } );
    	}
    }
};
