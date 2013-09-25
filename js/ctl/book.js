;(function () {
	
	var self = APP.ctl.book = {};
	self.obj = null;
	self.scroll = null;
	self.list = [];
	
	self.index = function () {
    	self.obj = $('#book');
	    self.obj.find('#header').html($.tmpl(APP.TMPL.book.header));
		APP.util.render(self.obj);
		_clearData();

		_getList();
		self.renderList();
		self.fixScroll();

		_resize();
	};
	
	self.fixScroll = function () {
	    var h = Number($(window).height() - self.obj.find('#header').height());
	    var c = Number(self.obj.find('#contact').height());
		self.obj.find('#scroll').css({ 'height': h });
	    if (c <= h) {
	        if (self.scroll) self.scroll.refresh();
	        self.scroll = null;
	        return;
	    };
		self.scroll = APP.scroll(self.scroll, 'scroll');
	};
	
	var _click = function () {
	    if ($(this).data('action') == 'delete') {
    	    localStorage.removeObject(APP.cst.substt + $(this).data('id'), function () {
    	        _getList();
    	        self.renderList();
    	        self.fixScroll();
    	    });
	    };
	};
	
	var _resize = function () {
	  	$(window).unbind('orientationchange').bind('orientationchange', self.fixScroll);
		$(window).unbind('resize').bind('resize', self.fixScroll);
	};

	var _clearData = function () {
	   	self.obj.find('#clear').bind('click', function () {
            APP.util.cleanStorage(function() {
                _getList();
                self.renderList();
                self.fixScroll();
            });
		})
	};
	
	var _getList = function () {
        self.list = [];
        $.each(localStorage, function(key, value){
            if (key.toString().indexOf(APP.cst.substt) >= 0) {
                self.list.push(localStorage.getObject(key));
            };
        })
	};
	
	self.renderList = function () {
	    var data = APP.ctl.book.list;
	    var list = self.obj.find('#contact').html('');
	    
	    if (!data.length) {
	        return;
	    };
	    
        for (var i in data) {
            list.append($.tmpl(APP.TMPL.book.item, data[i]));
        };
        
        APP.util.render(list);
        self.obj.find('.click').unbind('click').bind('click', _click); //add click to util.render
		
	};
	
})();