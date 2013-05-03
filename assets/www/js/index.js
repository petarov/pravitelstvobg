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
    		if (error) {
    			console.log('all ok');
    		} else {
    			
    		}
    	});
	
    	app.receivedEvent('tap');
	},
	/**
	 * Update DOM on a Received Event
	 */
    receivedEvent: function(id) {
    
		/* keep footer visible at all times 
		 * $(':jqmData(role=footer)').fixedtoolbar( { tapToggle: false } );
		 */
    
//        var parentElement = document.getElementById(id);
//        var listeningElement = parentElement.querySelector('.listening');
//        var receivedElement = parentElement.querySelector('.received');
//
//        listeningElement.setAttribute('style', 'display:none;');
//        receivedElement.setAttribute('style', 'display:block;');
    	
        console.log('Received Event: ' + id);
    }
};
