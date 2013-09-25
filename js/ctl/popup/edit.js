;(function () {

	var self = APP.ctl.popup.edit = {};
	self.obj = null;
	self.data = null;

	self.open = function (data) {
		self.data = $.extend({}, data);
		
		APP.popup.open({
			'id': 'edit',
			'title': '',
			'callback': _render,
			'width': '40%',
			'height': '40%',
			'data': self.data,
			'target': self.data.target,
			'position': 'left'
		});	
	};

	var _render = function (popup) {
		self.obj = popup;
		
	};
	
})();