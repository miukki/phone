;(function () {

	var self = APP.ctl.popup.add = {};
	self.obj = null;
	self.data = null;

	self.open = function (data) {
		self.data = $.extend({'id': '', 'usrname': '', 'usrtel': ''}, data);
		if (self.data.action  == 'edit') {
    		var item = localStorage.getObject(APP.cst.substt + self.data.id);
    		self.data = $.extend(self.data, item);
		};
		
		APP.popup.open({
			'id': 'add',
			'title': '',
			'callback': _render,
			'width': '60%',
			'height': '43%',
			'data': self.data,
			'target': (self.data.action && (self.data.action  == 'edit')) ? self.data.target : false,
			'position': (self.data.action && (self.data.action  == 'edit')) ? 'left' : 'center',
			'className': (self.data.action && (self.data.action  == 'edit')) ? 'editpop': 'addpop'
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
		    
		    if (self.data.action && (self.data.action  == 'add')) {
    		    self.data.id = Object.keys(localStorage).length;
    		    if (self.data.id) {
    		      +self.data.id;
    		    };
		    };
		    
		    obj = $.extend(obj, {'id': self.data.id });

		    localStorage.setObject(APP.cst.substt + obj.id, obj, function () {
                APP.ctl.book.getList();
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