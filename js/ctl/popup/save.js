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
		self.obj.find('#save').bind('click', _save);
	};
	var _save  = function () {
	    var data = APP.ctl.book.list;
	    if (!data.length) {
	        self.obj.find('#error').html('Contact list is empty');
	        return;
	    };
	    _toCSV(data);
	};
	
	var _toCSV = function(data) {
      var csvData = [];
      var tmpArr = [];
      var tmpStr = '';
      
      for (var i in data) {
          var item = data[i];
          for (var k in item) {
              tmpStr = item[k];
              tmpArr.push('"' + tmpStr + '"');
          };
      };
      csvData.push(tmpArr.join(','))
      var output = csvData.join('\n');
      var uri = 'data:application/csv;charset=UTF-8,' + encodeURIComponent(output);
      window.open(uri, 'csvWindow');
    }
	
})();