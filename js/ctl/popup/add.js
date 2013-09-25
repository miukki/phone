;(function () {

	var self = APP.ctl.popup.add = {};
	self.obj = null;
	self.data = null;

	self.open = function (data) {
		self.data = $.extend({}, data);
		
		APP.popup.open({
			'id': 'add',
			'title': '',
			'callback': _render,
			'width': '60%',
			'height': '43%',
			'data': self.data,
		});	
	};

	var _render = function (popup) {
		self.obj = popup;
		_getData();
	};
	
	var _getData = function () {
		self.obj.find('#form').submit( function(e) {
		    event.preventDefault();
		    
		    var obj = {};
		    var arr = $(this).serializeArray();

		    for(var i in arr) {
		      var item = arr[i];
		      obj[item.name] = item.value;
		    };
            
            obj[APP.cst.usrname] = APP.util.capFL(obj[APP.cst.usrname]);
            obj[APP.cst.usrtel] = _getN(obj[APP.cst.usrtel]);
            
            if (!obj[APP.cst.usrtel] || !obj[APP.cst.usrname]) {
                $(this).find('#error').html('error!');
                return; 
            };
		    
		    var index = Object.keys(localStorage).length;
		    if (index) {
		      +index;
		    };
		    
		    obj = $.extend(obj, {'id': index });

		    localStorage.setObject(APP.cst.substt + obj.id, obj, function () {
                APP.ctl.book.list.push(localStorage.getObject(APP.cst.substt + obj.id));
                APP.ctl.book.renderList();
                APP.popup.close({'id': 'add'});
                APP.ctl.book.fixScroll();
		    });
            
		});
	};
	
	var _getN = function (n) {
        n = n.toString().replace(/\D/g,'');
        if (n.length >= 10) {
            return n;
        } else {
            return false;
        };
	    
	};
	
})();