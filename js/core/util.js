;(function () {
	
	APP.util = {
		'render': function (obj) {
			APP.util.renderPopupObj(obj);
		},
		
		'renderPopupObj': function (obj) {
			var objects = obj && obj.length ? obj.find('.pop') : $('.pop');
			if (!objects.length) {
				return;
			};
			
			$.each(objects, function (i, item) {
				var obj = $(item);
				obj.bind('click', function () {
					var data = $.extend({ 'target': $(this) }, $(this).data());
					var ctl = APP.ctl.popup[data.popupId];
					if (ctl && ctl.open) {
						ctl.open(data);
					};
				});
			});
		},
		
		'cleanStorage': function (callback) {
		    localStorage.clear();
		    if (!Object.keys(localStorage).length && callback) {
		        callback();
		    };
		},
		
		'setStorage': function () {
		    Storage.prototype.setObject = function(key, value, callback) {
                this.setItem(key, JSON.stringify(value));
		        if (callback) {
                    callback();
    			};
            };
            Storage.prototype.getObject = function(key) {
                var value = this.getItem(key);
                return value && JSON.parse(value);
            };
            Storage.prototype.removeObject = function (key, callback) {
                this.removeItem(key);
                var value = this.getObject(key);
                if (!value && callback) {
                    callback();
                };
            };  
		},
		
		'capFL': function (str) {
		    return str.charAt(0).toUpperCase() + str.slice(1);
		},
		
		
	};
	
})();