;(function() {
	
	var self = APP.popup = {};
	var _t = 0;
	
	self.open = function (param) {
		param = $.extend({
			'id': '',
			'data': {},
			'callback': null,
			'close': true,
			'width': '50%',
			'height': '50%',
			'top': 0,
			'left': 0,
			'tpl': '',
			'title': '',
			'reposition': true,
			'position': 'center',
			'className': ''
		}, param);
		
		var popupId = param.id;
		var tpl = APP.TMPL.popup.ctl + param.id;
		var container = $('#popup').html('');
		var popup = $.tmpl(APP.TMPL.popup.common, param);
		var content = popup.find('#popupContent');
		
		content.append($.tmpl(tpl, param.data, param));
		container.append(popup);
		popup.css({ 'width': _convert(param).width, 'height': _convert(param).height });
		
		var dimmer = $('#dimmer');
		var title = popup.find('#title');
		
		if (!param.title) {
			title.hide();
		};
		
		self.position(popup, param);
		
		dimmer.show();	
		container.show();

		$(window).unbind('mouseup blur touchend touchcancel');
		
		if (param.callback) {
			param.callback(popup);
		};
		
		if (param.close) {
			clearTimeout(_t);
			_t = setTimeout(function () {
				dimmer.bind('click', { 'param': param }, function (e) {
					var param = e.data.param;
					delete(param.id);
					self.close(param);
					return false;
				});
			}, 500);
		};
		if (param.reposition) {
			$(window).bind('resize', function () {
			    self.resize(popup, param);
			});
		};
	};
	
	var _convert = function (param) {
		var w = $(window);
		var obj = {};
		if ('string' == typeof(param.width) && param.width.match('%')) {
			obj.width = w.width() * Number(param.width.replace('%', '') / 100);
		};
		if ('string' == typeof(param.height) && param.height.match('%')) {
			obj.height = w.height() * Number(param.height.replace('%', '') / 100);
		};
		return obj;
	};
	
	self.close = function (param) {
		clearTimeout(_t);
		
		param = $.extend({ 
			'id': '', 
			'dimmer': true
		}, param);
		
		if (param.id) {
			var popup = $('#popup-' + param.id);
			popup.remove();
		} else {
			$('#popup').html('');
		};

		var children = $('#popup').children();
		if (!children.length && param.dimmer) {
			$('#dimmer').unbind('click').hide();
			$(window).unbind('resize');
		};
		
	};
	
	self.resize = function (popup, param) {
		param = $.extend({ 'width': 0, 'height': 0 }, param);
		var css = {};
		if (param.width) css.width = _convert(param).width;
		if (param.height) css.height = _convert(param).height;
		popup.css(css);
		self.position(popup, param);
	};
	
	
	self.position = function (popup, param) {
		param = $.extend({ 
			'offsetX': 0, 
			'offsetY': 0,
			'top': 0,
			'left': 0,
			'target': false
		}, param);
		 
        if (!param.target || (
                                (param.position != 'center') && 
                                (param.position != 'top') && 
                                (param.position != 'bottom') && 
                                (param.position != 'left') && 
                                (param.position != 'right')
                             )) {
            param.position = 'center';
        };
        
		var w = $(window);
		var offset = param.target ? param.target.offset() : { 'left': 0, 'top': 0 };
		var x, y;
		
		switch (param.position) {
			case 'center':
				x = Math.round(w.width() / 2 - popup.width() / 2);
				y = Math.round(w.height() / 2 - popup.height() / 2);
				break;
			case 'top':
				x = offset.left + Number(param.target.width()) / 2 - popup.width() / 2  + param.offsetX;
				y = offset.top - popup.height() + param.offsetY;
				break;
			case 'bottom':
				x = offset.left + Number(param.target.width()) / 2 - popup.width() / 2  + param.offsetX;
				y = offset.top + Number(param.target.height()) + param.offsetY;
				break;
			case 'left':
				x = offset.left - popup.width() - param.offsetX;
				y = offset.top + Number(param.target.height()) / 2 - popup.height() / 2 + param.offsetY;
				break;
			case 'right':
				x = offset.left + Number(param.target.width()) + param.offsetX;
				y = offset.top + Number(param.target.height()) / 2 - popup.height() / 2 + param.offsetY;
				break;
		};
		
		y = param.top || y;
		x = param.left || x;
		
		popup.css({ 'top': y, 'left': x });
	};
})();