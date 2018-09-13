var floatAd = (function () {
    var timer= null;
    return {
        init(ele) {
            var _this = this;
            this.$box = document.querySelector(ele);
            this.$close = this.$box.querySelector('.close');
            this.$time = this.$close.querySelector('i');
            this.$img = this.$close.nextElementSibling;
            // 定义速度
            this.speedX = 2;
            this.speedY = 2;
            // 要等图片加载完成以后才可以计算宽高
            this.$img.onload = function() {
                _this.event();
                window.onresize(); 
                _this.move();
                _this.countTime();
            }

        },
        event: function () {
            var self = this;
            // 点击关闭按钮,关闭广告
            this.$close.onclick = function () {
                self.close();
            }
            this.$box.onmouseenter = function() {
                self.stop();
            }
            this.$box.onmouseleave = function() {
                self.move();
            }
            // 改变浏览器尺寸，触发事件
            window.onresize = function() {
                self.maxX = window.innerWidth - self.$box.offsetWidth;
                self.maxY = window.innerHeight - self.$box.offsetHeight;
            }
        },
        // 广告开始浮动
        move: function () {

            var _this = this;
            this.$box.timer = setInterval(function() {
                var x = _this.$box.offsetLeft  + _this.speedX;
                var y = _this.$box.offsetTop + _this.speedY;
                //  边界处理
                if(x <= 0) {
                    x = 0;
                    _this.speedX *= -1;
                } else if(x >= _this.maxX) {
                    x = _this.maxX;
                    _this.speedX *= -1;
                }
                if(y <= 0) {
                    y = 0;
                    _this.speedY *= -1;
                } else if(y >= _this.maxY) {
                    y = _this.maxY;
                    _this.speedY *= -1;
                }
                _this.$box.style.left = x + 'px';
                _this.$box.style.top = y + 'px';
            }, 10)
        },
        // 广告停止
        stop: function () {
            clearInterval(this.$box.timer);
        },
        // 关闭广告
        close: function () {
            this.$box.style.display = 'none';
            this.stop();
            clearInterval(timer);

        },
        countTime: function () {
            var time= 60;
            var _this = this;
            timer = setInterval(function() {
                time--;
                _this.$time.innerHTML = time;
                if(time < 1) {
                    _this.close()
                }
            }, 1000)
        }
    }
}())