/**
 * @author wanghaitao
 * @param sttime1 id
 * @param startTime 开始时间
 * @param endTime 结束时间
 * @param timeCallBack 回调函数
 *
 *  var _TimeCountDown = new TimeCountDown("sttime1",{ 
        startTime:'2016-07-30 10:07:55',        //开始时间
        endTime:'2016-07-30 10:08:00',          //结束时间     
        timeCallBack:"timeOverfun",  //回调函数
    });
 */

(function(window, undefined) {
	var TimeCountDown = function(container, params) {
		if(!(this instanceof TimeCountDown)) return new TimeCountDown(container, params);

		var defaults = {
			endTime: '', //title
			startTime: '', //请传入ID，或DOM对象
			Lid: '',
			leftTitle: "倒计时:", //左侧名称
			colonStat: false, //是否把小时分转换成：
			timeCallBack: null //关闭执行的回调函数 
		}
		params = params || {};
		var originalParams = {};
		for(var param in params) {

			if(typeof params[param] === 'object' && params[param] !== null && !(params[param].nodeType || params[param] === window || params[param] === document || (typeof Dom7 !== 'undefined' && params[param] instanceof Dom7) || (typeof jQuery !== 'undefined' && params[param] instanceof jQuery))) {
				originalParams[param] = {};
				for(var deepParam in params[param]) {
					originalParams[param][deepParam] = params[param][deepParam];
				}
			} else {
				originalParams[param] = params[param];
			}
		}
		for(var def in defaults) {
			if(typeof params[def] === 'undefined') {
				params[def] = defaults[def];
			} else if(typeof params[def] === 'object') {
				for(var deepDef in defaults[def]) {
					if(typeof params[def][deepDef] === 'undefined') {
						params[def][deepDef] = defaults[def][deepDef];
					}
				}
			}
		}
		var s = this;
		// Params
		s.params = params;
		s.container = container;
		s.currentBreakpoint = undefined;
		s.calculateTime = function() {
			var startTime = s.vert(this.params.startTime);
			var endTime = s.vert(this.params.endTime);
			var time = endTime - startTime; //时间差的毫秒数 ;
			return time;
		}
		s.vert = function(time) {
			if(typeof time == "undefined" || time == "") {
				return false;
			}
			var strtime = (time).replace(/-/g, "/");
			var date1 = new Date(strtime);
			return parseInt(date1.getTime());
		}
		s.nTime = s.calculateTime();
		s.countdown();

	};

	TimeCountDown.prototype = {
		countdown: function() {
			var interval = 1000; //毫秒      
			var time;
			this.nTime = this.nTime - interval;

			var leave1 = this.nTime; //计算天数后剩余的毫秒数
			var t = Math.floor(Math.floor((leave1 / (3600 * 1000)) / 24));
			var hleave = this.nTime % ((24 * 3600 * 1000));
			//把剩余毫秒数转换为小时
			var h = Math.floor(hleave / (3600 * 1000)) < 10 ? "0" + Math.floor(hleave / (3600 * 1000)) : Math.floor(hleave / (3600 * 1000));
			var leave2 = this.nTime % (3600 * 1000); //计算小时数后剩余的毫秒数
			//把转换小时之后，剩余毫秒数转换为分钟
			var m = Math.floor(leave2 / (60 * 1000)) < 10 ? "0" + Math.floor(leave2 / (60 * 1000)) : Math.floor(leave2 / (60 * 1000));

			//把转换分钟之后，剩余毫秒数转换为秒
			var leave3 = leave2 % (60 * 1000); //计算分钟数后剩余的毫秒数
			var s = Math.round(leave3 / 1000) < 10 ? "0" + Math.round(leave3 / 1000) : Math.round(leave3 / 1000);

			if(!this.params.colonStat) {
				if(t == 0) {
					time = this.params.leftTitle + "<span>" + h + "</span><label>时</label><span>" + m + "</span><label>分</label><span>" + s + "</span><label>秒<label>";

				} else {

					time = this.params.leftTitle + "<span>" + t + "</span><label>天</label><span>" + h + "</span><label>时</label><span>" + m + "</span><label>分</label><span>" + s + "</span><label>秒<label>";
				}
			} else {
				time = this.params.leftTitle + "<span>" + h + "</span><label>:</label><span>" + m + "</span><label>:</label><span>" + s + "</span><label><label>";
			}
			var callBackTime = t + h + m + s;
			document.querySelector("#" + this.container).innerHTML = time;
			if(callBackTime <= 0) {
				eval(this.params.timeCallBack);
				return false;
			}
			var that = this;
			setTimeout(function() {
				that.countdown();
			}, interval);
		}
	}
	window.TimeCountDown = TimeCountDown;
})(window, undefined);