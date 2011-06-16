/* 
* Part of Nitriques Solutions inc. (http://www.nitriques.com) jQuery plug-in bundle
* 
* Use this plugin to dynamically modifies target elements' font-size. Compatible with
* jQuery Cookie plugin to save the user preferences
* 
* Usage $('.buttons').ntr$fontSize(opts);
* 
* Examples:
* 
* 1- Default: toggle between 1, 1.1, 1.2, 1.3, 1.4, 0.8, 0.9 (80% to 140%) the original font size
*             on <p>
* $('#plustext').ntr$fontSize();
* 
* 2- With options: toggle with default sizes on selected <p> only
* $('#plustext').ntr$fontSize({
* 	elements: p:not(.fixed-font-size)
* });
* 
* 2- With options: toggle all <p> only between 100% to 60%
* $('#plustext').ntr$fontSize({
* 	size: [1, 0.9, 0.8, 0.7, 0.6]
* 
*   OR
*   
*   size: function () {
*      var x, a = [];
*      for (x=1; x<=0.6; x-=0.1) {
*        a.push(x);
*      }
*      return a
*   }
* 
* });
* 
* Liscence under the The Code Project Open License (CPOL)
* http://www.codeproject.com/info/cpol10.aspx

* Name: jquery.fontsize.js
* Date: 2011-06-16
* Version: 1.0

* Pre-requisites: none;
*     Optionally: jquery.cookie.js

* 
* Version 1.0
* 	Initial version

*/
(function ($, undefined) {
	
	var defaults = {
			sizes: [1, 1.1, 1.2, 1.3, 0.8, 0.9],
			elements: 'p',
			useCookie: true
	};
	
	$.fn.extend({ // jQuery plugin
	    ntr$fontSize: function(options) {

			var opts = $.extend({}, defaults, options),
				p = 0,
				key = 'font-size',
				key_u = 'font-size-unit',
				clas = '[fontSize] ',
				cookie = key + new Date().getTime(),
				t = $(this);
			
			if (!t || !t.length) {
				//console.log(clas + 'target element not found');
				return;
			}
			
			// validate cookie plugin
			opts.useCookie = opts.useCookie && $.cookie;
	
			function adujstFontSize(e) {
				// update pointer
				if (++p >= opts.sizes.length) {
					p = 0;
				}
				
				console.log(clas + p);
				
				// for each elements
				$(opts.elements).each(function() {
					var t = $(this),
						s = parseFloat(t.data(key)),
						u = t.data(key_u),
						newSize = (s * opts.sizes[p]) + u;
					
					console.log(clas + newSize);
					
					t.css(key, newSize);
				});
				
				if (e && opts.useCookie) {
					$.cookie(cookie, p, { expires: 30, path: '/' });
				}
				
				if (e) {
					e.preventDefault();
				}
				
				return false;
			}
			
			
			// init code
			// for each elements, get their current size
			$(opts.elements).each(function() {
				var t = $(this),
					s = t.css(key), // raw size
					u = s.replace(/[0-9]*/, '') ; // unit
				
				// get numeric value
				s = parseFloat(s, 10);
				
				//console.log(clas + s + ' ' + u);
				
				// save this data
				t.data(key, s);
				t.data(key_u, u);
			});
			
			// try retreive value
			if (opts.useCookie) {
				var c = $.cookie(cookie);
				
				c = parseInt(c);
				
				if (c >= 0 && c < opts.sizes.length) {
					// update position
					p = c;
					// adjust font to good size
					adujstFontSize(null);
				}
			}
			
			// bind event
			t.click(adujstFontSize);
		}
	}); // extend

})(jQuery);