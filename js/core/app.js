window.APP = {};
;(function () {
	
	var self = APP;
	self.ctl = {'popup': {}};
	self.isInit = false;

	self.init = function (onLoad) {
		
		if (self.isInit) {
			return;
		};
		
		APP.util.setStorage();
		_initTmpl();
	};
	
	var _initTmpl = function (i) {
	    if (!i) i = 0;
	    
	    var length = APP.cst.tmpl.length;
		var url = APP.cst.tmpl[i];
		
		$.get(url + '.tmpl', function (template) {
		    
		    $.template(url, template);
		    
		    if ((i + 1) == length) {
		        self.isInit = true;
		        
		        var layout = $('#layout');
		        layout.show().html($.tmpl(APP.TMPL.default));
		        
		        APP.ctl.book.index();
		    } else {
		        i ++;
		        _initTmpl(i);
		    };
		    
		});
	};
	
	self.scroll = function (scroll, id, param) {
		var obj = $('#' + id);
		if (!obj.length) {
			return;
		};
		
		param = $.extend({
			'vScrollbar': true,
			'vScroll': true,
			'checkDOMChanges': false,
			'bounce': false,
			'bounceLock': true,
			'hideScrollbar': false,
			'onTouchEnd': function (e) { e.preventDefault(); }
		}, param);
		
		if (!scroll) {
			scroll = new iScroll(id, param);
		};
		setTimeout(function () {
			scroll.refresh();
		});
		return scroll;
	};
	
	
})();
