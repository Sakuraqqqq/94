function startMove(e, json, fn) { //e表对象，json表{attr1:itarget1,attr2:itarget2,···}，fn表回调函数
            clearInterval(e.timer); //清除定时器，e.timer表示给每个对象定义一个定时器，避免共用一个定时器
            e.timer = setInterval(function () {
                for (var attr in json) { //定义attr为json中的变量，即属性，遍历所有属性。避免一个属性变化完后，其他属性也停止变化
                    var flag = true; //假设所有属性都已经满足icur == json[attr]时，flag为true
                    //取当前的值
                    var icur = 0;
                    if (attr == 'opacity') {
                        icur = Math.round(parseFloat(getStyle(e, attr)) * 100);
                    } else {
                        icur = parseInt(getStyle(e, attr));
                    }
                    //算速度
                    var speed = (json[attr] - icur) / 5;
                    speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
                    //检测停止
                    if (icur != json[attr]) { //json[attr]表示iTarget,即如果当前存在属性值不等于目标值,flag值为false
                        flag = false;
                    }
                    if (attr == 'opacity') {
                        e.style.opacity = (icur + speed) / 100;
                        e.style.filter = "alpha(opacity:" + icur + speed + ")";
                    } else {
                        e.style[attr] = icur + speed + "px";
                    }
                }
                if (flag) { //flag为true，即所有当前属性值等于目标值时时，执行下面的方法
                    clearInterval(e.timer3);
                    if (fn) {
                        fn();
                    }
                }
            }, 50)
        }
        //获取样式,兼容处理
        function getStyle(obj, attr) {
            if (obj.currentStyle) {
                return obj.currentStyle[attr];
            } else {
                return getComputedStyle(obj, false)[attr];
            }
        }