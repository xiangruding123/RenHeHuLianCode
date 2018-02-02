/*
取出对象的样式中的某个属性值
参数：
	obj 指某个对象
	attr 指该对象中的某个属性名
返回值：
	取出对象的样式中的某个属性值
*/
function getStyle(obj, attr){
	if(obj.currentStyle){
		return obj.currentStyle[attr];
	}else{
		return getComputedStyle(obj, null)[attr];
	}
}

/*
运动函数
参数：
	obj  指运动的对象
	json 指运动的对象的样式的属性名及属性值
		{attr:end, attr:end...}
		attr 指运动的对象的样式的属性名
		end  指运动的对象的样式的attr属性的属性值（目标值）
	fn	 指运动执行后，所触发的函数		
*/
function startMove(obj, json, fn){
	/*
	第二次执行该函数时，需要先清除定时器，如果定时器是var创建出来的，第二次的函数是没办法清除第一次函数的定时器的
	所以需要在obj对象上创建出一个属性来表示定时器，第二次执行该函数时，要先停止该对象的上一次的定时器，
	以防止多个定时器同时对对象起作用，
	当定时器没有达到目标值时，定时器是没有停止的，此过程中如果又执行了该函数，就会出现多定时器同时对该对象起作用，
	所以得在执行该函数时，先清除上一次的定时器。	
	
	在第二次执行函数时，如果第一次的定时器没有停止（未达到目标值），会有两个定时器同时对obj起作用
	所以得把上一次的定时器清除掉，用obj.timer可以把定时器保存到对象上，而用var timer则找不到上一次的定时器
	*/
	clearInterval(obj.timer);	
	obj.timer=setInterval(function(){	//开启定时器
		/*
		自己设计一个规则，用flag表示所有的属性值是否都已经到达了目标值
		flag=true 指都已到达		flag=false 表示至少存在一个属性没有达到目标值
		先假设为真，指都已达到，然后通过循环，看每一个属性是否达到，如果有属性没有达到，那么flag设为false
		循环结束后，判断flag的值，如果为真，表示所有属性均达到，均已达到时，清除定时器；
		如果为假，表示有属性没有达到，没有达到时，需要继续执行定时器函数。
		*/
		var flag=true;//该变量指所有的属性是否均以到达目标值，初始化为真，指已经到达了目标值。
		for(var attr in json){	//循环处理每一个属性
			var end = json[attr];
			//console.log(attr+":"+end);
			/*
			attr	指属性名
			end		指属性目标值
			*/
			var start=getStyle(obj, attr);	//取出起始值
			if(attr=="opacity"){	//处理透明度
				/*
				opacity的值：0指全完透明	1指完全显示
				因为下面取步长的代码计算的都是整数，所以透明度这块也应该转换为整数处理
				即把0当成完全透明	100当成完全显示		最后赋值时再除以100即可
				*/
				start=Math.round(parseFloat(start)*100);//如果不取整的话，将无法到达目标值
			}else{
				start=parseInt(start);
			}
			//console.log(start);
			//取出速度，（即起始点到目标点过度时的步长）每次执行该函数时，都重新拿新起始点与目标点的间距的六分之一作为步长
			var speed=(end-start)/6;	
			//从小到大过度时，因为是正数，所以小数应向上取整数，最后的步长值为+1；
			//从大到小过度时，因为是负数，所以小数应向下取整数，最后的步长值为-1；
			speed=(speed>0)?Math.ceil(speed):Math.floor(speed);
			//更新对象的属性
			//console.log(start+speed);
			if(attr=="opacity"){
				obj.style[attr]=(start+speed)/100;	//之前乘以了100，这回应除以100
				obj.style.filter='alpha(opacity:'+(start+speed)+')';	//透明度兼容写法
			}else{
				obj.style[attr]=start+speed+"px";	//attr是变量，表示一个属性名，所以得用style[attr]来获取
			}
			// style.attr 指在样式中找名字叫做attr的属性，显然不存在该属性，所以说这么写是错误的
			//console.log(speed);
			if(start==end){//如果已经过度到目标值，则清除定时器
				//clearInterval(obj.timer);
			}else{
				flag=false;//没有达到目标值
			}
		}
		if(flag){//如果已经过度到目标值，则清除定时器
			clearInterval(obj.timer);//如果已经过度到目标值，则清除定时器
			if(fn){//如果存在函数
				fn();//运动后，执行的函数
			}
		}	
	}, 60)	//每隔60毫秒执行一次函数			
}
