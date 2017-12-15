var scroll = {
	scrollWidth: 0,			// 屏幕宽度
	scrollArr: [],
	index: 0,				// 显示当前页面的索引
	slider: null,			// 滑动的元素
	start: {x:0, y:0},		// 记录起始的位置
	isScrolling: 0,			// 判断是垂直滚动还是水平滚动  0代表水平， 1代表垂直
	slideDistance: {x:0, y:0},		//记录手滑过的距离
	init: function(){
		this.scrollWidth = document.body.scrollWidth;	// 获取屏幕宽度
		this.scrollArr = [1,2,3,4,5];					// 初始化代表屏幕页面的数组
		this.index = 0;
		this.slider = document.getElementsByClassName('page-wrapper')[0];
		this.touchStart();
		this.touchMove();
		this.touchEnd();
	},
	
	touchStart: function() {
		var self = this;
		this.slider.addEventListener('touchstart', function(e){		// 记录起始位置
			self.start.x = e.touches[0].pageX;
			self.start.y = e.touches[0].pageY;
			self.isScrolling = 0;
			self.slider.classList.remove('animation');
		});
	},
	
	touchMove: function(){
		var self = this;
		this.slider.addEventListener('touchmove', function(e){
			//当屏幕有多个touch或者页面被缩放过，就不执行move操作
			if(e.targetTouches.length > 1 || e.scale && e.scale !== 1) return;	
			self.slideDistance.x = e.touches[0].pageX - self.start.x;
			self.slideDistance.y = e.touches[0].pageY - self.start.y;
			self.isScrolling = Math.abs(self.slideDistance.x) > Math.abs(self.slideDistance.y) ? 0:1;
			if(self.isScrolling === 0){
				e.preventDefault();
				if (!(self.index === 0 && self.slideDistance.x > 0)) {		// 如果在第一页向右滑动则不执行下面的代码
					self.slider.style.marginLeft = -self.index * self.scrollWidth + self.slideDistance.x + 'px';	
				}
			}
			
		});
	},
	
	touchEnd: function() {
		var self = this;
		this.slider.addEventListener('touchend', function(e){
			if (self.isScrolling === 0) {
				self.slider.classList.add('animation');
				if(self.slideDistance.x < -50 && self.index < 5) {	// 左滑
					self.slider.style.marginLeft = -(self.index+1) * self.scrollWidth + 'px';
					self.index++;
				}else if(self.slideDistance.x > 50 && self.index > 0) {	//右滑
					self.slider.style.marginLeft = -(self.index-1) * self.scrollWidth + 'px';
					self.index--;
				}
			}
		});
	}
};
			
scroll.init();