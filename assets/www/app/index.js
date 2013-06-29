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
	Options: {
		VIBRATE: 100,
		VIBRATE_CLICK: 100
	},
	/**
	 * Entry point
	 */
    initialize: function() {
		// init local storage
		storage.init(); 
		// adjust moment.js BG localization
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
		moment().lang('bg');
		
        this.bindEvents();
    },
    /** 
     * Bind any events that are required on startup. Common events are:
     * 'load', 'deviceready', 'offline', and 'online'.
     */
    bindEvents: function() {
    	document.addEventListener('deviceready', this.onDeviceReady, false);
    	
        document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
//        document.addEventListener('touchstart', function(e) { e.preventDefault(); }, false);
//        document.addEventListener('touchend', function(e) { e.preventDefault(); }, false);
//        document.addEventListener('touchdown', function(e) { e.preventDefault(); }, false);
        
        $(document).on('pagebeforeshow', 'div:jqmData(role="page")', this.onPageLoad);
        $(document).on('click', "a:jqmData(icon='refresh')", this.onRefresh);
        $(document).on('click', "a:jqmData(role='ilink')", this.onGotoLink);
    },
    /**
     * The scope of 'this' is the event. In order to call the 'receivedEvent'
     * function, we must explicitly call 'app.receivedEvent(...);'
     */
    onDeviceReady: function() {
    	// speed optimization
    	$.mobile.pageContainer = $('#container');
    	$.mobile.defaultPageTransition = 'none'; // 'slide';
    	$.mobile.defaultDialogTransition = 'none';
    	// $.mobile.buttonMarkup.hoverDelay = 50;
    	
    	// http://jquerymobile.com/demos/1.2.0/docs/pages/phonegap.html
    	$.support.cors = true;
    	$.mobile.allowCrossDomainPages = true;
    	$.mobile.page.prototype.options.domCache = true;
    	
		$.mobile.loader.prototype.options.text = "Зареждане ...";
		$.mobile.loader.prototype.options.textVisible = true;
		$.mobile.loader.prototype.options.theme = "b";
		$.mobile.loader.prototype.options.html = "";
		
		// set version info
		cordova.exec(function(text) {
			$('#version').text('Версия: ' + text);
		}, function(error) {
			$('#version').text('');
		}, 
		"Version", "GetVersionName", []);		
    },
    /**
     * Update items as soon as page load event is triggered
     */
    onPageLoad: function(event, data) {
    	var pageInfo = app.getCurrentPageInfo();
    	// check for valid page
    	if (pageInfo != null) {
	    	var pageData = storage.get(pageInfo.storageName);
	    	if (pageData) {
	    		app.updateListView(pageInfo, pageData);
	    	}
    	}
    },
    /**
     * Get all latest news entries for given section
     */
    onRefresh: function() {
    	
    	var pageInfo = app.getCurrentPageInfo();
    	if (!pageInfo) {
    		return;
    	}
    	
    	$.mobile.loading( 'show', {
    		text: 'Зареждане ...',
    		textVisible: true,
    		theme: 'b',
    		html: ""
    	});

    	grss.fetch(pageInfo.url, function(pageData, error) {
			// vibrate signal
			navigator.notification.vibrate(app.Options.VIBRATE);
    		if (error) {
    			// Notify
    			navigator.notification.alert(
    				    'Проблем при зареждане на информацията! Проверете интернет връзката си.',
    				    null,		// callback
    				    'Грешка',	// title
    				    'OK'		// buttonName
    				);    			
    		} else {
    			if (pageData.items.length > 0) {
    				// remove old data
    		    	var oldPageData = storage.get(pageInfo.storageName);
    		    	if (oldPageData) {
    		    		storage.remove(pageInfo.storageName);
    		    	}
    				// save new data
    				storage.save(pageInfo.storageName, pageData);
    				// update UI items
    				app.updateListView(pageInfo, pageData);
    			} else {
    				// Notify
        			navigator.notification.alert(
        				    'Няма налична нова информация! Опитайте по-късно.',	// message
        				    null,		// callback
        				    'Грешка',	// title
        				    'OK'		// buttonName
        				);        				
    			}
    		}
    		
    		$.mobile.loading('hide');
    	});
	},
	/**
	 * Open an RSS item link in an InAppBrowser instance
	 */
	onGotoLink: function(event) {
		event.preventDefault();

		// vibrate signal
		navigator.notification.vibrate(app.Options.VIBRATE_CLICK);		
		
		var ref = window.open($(this).attr('href'), '_blank', 'location=no');
	},
    /**
     * Get information about the currently selected tab-page
     */
    getCurrentPageInfo: function() {
    	var pageInfo = {};
		pid = $.mobile.activePage.attr('id');
	
		switch(pid) {
		case "page-n":
			pageInfo.url = grss.URL_NEWS;
			pageInfo.storageName = storage.DataTypes.NEWS;
			break;
		case "page-e":
			pageInfo.url = grss.URL_EVENTS;
			pageInfo.storageName = storage.DataTypes.EVENTS;
			break;
		case "page-d":
			pageInfo.url = grss.URL_DECISIONS;
			pageInfo.storageName = storage.DataTypes.DECISIONS;
			break;
		default:
			// we're not updating...
			return null;
		}
		
		pageInfo.id = pid;
		
		return pageInfo;
    },
    /**
     * Update RSS items on currently selected tab-page
     */
    updateListView: function(pageInfo, pageData) {
    	
    	var $page = $("div[id='" + pageInfo.id + "']");
    	var $content = $page.children( ":jqmData(role=content)" );

    	// set last update info
    	var mark = '<div id="wrapper"><div id="scroller">';
    	if (pageData.lastUpdate) {
    		var day = moment(pageData.lastUpdate);
			mark += '<div data-role="lastUpdate" class="datetime">от ' + moment().startOf('hour').fromNow() + '</div>';
    	}
		
		// add items
//		var tpl = '<li data-corners="false" data-shadow="false" data-iconshadow="true" data-wrapperels="div" data-icon="arrow-r" data-iconpos="right" data-theme="c" class="ui-btn ui-btn-icon-right ui-li-has-arrow ui-li ui-btn-up-c"><div class="ui-btn-inner ui-li"><div class="ui-btn-text"><a href="$$LINK$$" class="ui-link-inherit" data-role="ilink"><h3 class="ui-li-heading">$$TITLE$$</h3><p class="ui-li-desc">$$DESC$$</p></a></div><span class="ui-icon ui-icon-arrow-r ui-icon-shadow">&nbsp;</span></div></li>';
//		mark += '<ul data-role="listview" data-inset="true" data-filter="false">';
//		var tpl = '<li data-corners="false" data-shadow="false" data-iconshadow="true" data-wrapperels="div" data-icon="arrow-r" data-iconpos="right" data-theme="c">';
//		tpl += '<a href="$$LINK$$"><h3>$$TITLE$$</h3><p>$$DESC$$</p></a></li>';
		
		var tpl = '<li data-corners="false" data-shadow="false" data-iconshadow="true" data-wrapperels="div" \
			data-icon="arrow-r" data-iconpos="right" data-theme="c" \
			class="ui-btn ui-btn-icon-right ui-li-has-arrow ui-li ui-btn-up-c"> \
			<div class="ui-btn-inner ui-li"> \
				<div class="ui-btn-text"> \
					<a href="$$LINK$$" data-role="ilink" class="ui-link-inherit"> \
					<span>$$TITLE$$</span></a></div><span class="ui-icon ui-icon-arrow-r ui-icon-shadow">&nbsp;</span> \
				</div></li>';
		
		mark += '<ul class="ui-listview" data-role="listview" data-inset="true" data-filter="false">';
		
		var items = pageData.items;
		for (var i = 0; i < items.length; i++) {
			var entry = tpl;
			entry = entry.replace('$$TITLE$$', items[i].title);
//			entry = entry.replace('$$DESC$$', items[i].desc);
			entry = entry.replace('$$LINK$$', items[i].link);
			mark += entry;
		}
		mark += '</ul>';
		mark += '</div></div>';
		
		// inject
    	$content.html(mark);
    	// enhance
//    	$page.page();
    	
    	$content.find( ":jqmData(role=listview)" ).listview();
    	
    	this.scroller = new iScroll($content[0]);
    	this.scroller.refresh();
    }
};
