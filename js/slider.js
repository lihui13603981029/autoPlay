window.onload = function () {
	//1. 先获取元素
	//经典函数出入什么，返回什么
	function $(id) {return document.getElementById(id);}
	//获取最大盒子
	var js_box = $("js_box");
	//获取滚动的盒子
	var slider_main_block = $("slider_main_block");
	//获取所有的图片组 需要滚动的部分
	var imgs = [];
	var arr = slider_main_block.children;
	for (var i = 0; i < arr.length; i++) {
		imgs.push(arr[arr.length - 1 -i]);
	}
	//获得 控制span 的父盒子
	var slider_ctrl = $("slider_ctrl");
	var scrollWidth = 500;
	//2. 进行for循环，开始遍历所有的图片内容：
	for (var i = 0; i < imgs.length; i++) {
		var span = document.createElement("span");//创建 span
		span.className = "slider-ctrl-con";//添加类名
		span.innerHTML = "haha"; //这一句实现了倒序插入！
		slider_ctrl.insertBefore(span,slider_ctrl.children[1]);//在第二个span的前面插入
	
	}
	
	//3.遍历按钮
	//遍历5个按钮
	var spans = document.getElementsByTagName("span");
	spans[1].className = "slider-ctrl-con current";
	//span 是 5个按钮 他们都是span
	var iNow = 0;
	for (var k = 0;k < spans.length; k++) { //k 是索引号 spans[k] spans[0] 第一个span
		spans[k].onclick = function () {
			
			if (this.className == "slider-ctrl-prev") {
				// 当我们左侧点击的时候，当前的这张图片 先慢慢的走到右边 上一张 一定先快速走到左侧 （-310）的位置  然后慢慢走到舞台中间
				animate(imgs[iNow],{left : scrollWidth});
				--iNow < 0 ? iNow = imgs.length - 1 : iNow;
				imgs[iNow].style.left = -scrollWidth +"px";
				animate(imgs[iNow],{left : 0});
				setSquare();
			} else if (this.className == "slider-ctrl-next") {
				autoPlay();
			} else {
				var that = this.innerHTML -1;
				if (that > iNow) {
					animate(imgs[iNow],{left : -scrollWidth});
					imgs[that].style.left = -scrollWidth + "px";
				}
				iNow = that;
				animate(imgs[iNow],{left : 0});
				setSquare();
			}
			
		}
	}
	
	//4.设置setSquare函数
	function setSquare () {
		for (var i = 1; i < spans.length - 1; i++) {
			spans[i].className = "slider-ctrl-con";
		}
		spans[iNow + 1].className = "slider-ctrl-con current"; //记住 +1
	}
		function autoPlay () {
		animate(imgs[iNow],{left : -scrollWidth});
		++iNow > imgs.length - 1 ? iNow = 0 : iNow;
		imgs[iNow].style.left = scrollWidth + "px"; //立马执行  快速走到右侧
		animate(imgs[iNow],{left : 0});//下一张走的 0 的位置 慢慢走过来
		setSquare();
	}

	
	//5.设置定时器
	//其实定时器  就是右侧按钮
	var timer = null;
	timer = setInterval(autoPlay,2000);//开启定时器
	js_box.onmouseover = function () {
		clearInterval(timer);
	}
	js_box.onmouseout = function () {
		clearInterval(timer);
		timer = setInterval(autoPlay,2000);//开启定时器
	}
}