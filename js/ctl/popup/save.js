;(function () {

	var self = APP.ctl.popup.save = {};
	self.obj = null;
	self.data = null;

	self.open = function (data) {
		self.data = $.extend({}, data);
		
		APP.popup.open({
			'id': 'save',
			'title': '',
			'callback': _render,
			'width': '40%',
			'height': '40%',
			'data': self.data,
		});	
	};

	var _render = function (popup) {
		self.obj = popup;
		
	};
	
})();