/**
 * Created by Administrator on 2017/5/9.
 */
var public=(
    function () {
        //1、将类数组转为数组
        function toArray(likeArray) {
            var ary=[];
            try{
                return Array.slice.call(likeArray,0)
            }catch(e){
                for(var i=0;i<likeArray.length;i++){
                    ary.push(likeArray[i]);
                }
                return ary;
            }
        };
        //2、将JSON字符串转为JSON对象
        function toJsonObj(jsonStr) {
            try{
                return JSON.parse(jsonStr);
            }catch(e){
                return eval("("+jsonStr+")");
            }
        }
        //3、求当前元素距离body的偏移量
        function offset(curEle) {
            var L=curEle.offsetLeft;
            var T=curEle.offsetTop;
            var p=curEle.offsetParent;
            while (p){
                if(window.navigator.userAgent.indexOf("MSIE 8")==-1){
                    L+=p.clientLeft;
                    T+=p.clientTop;
                }
                L+=p.offsetLeft;
                T+=p.offsetTop;
                p=p.offsetParent;
            }
            return {left:L,top:T}
        }
        //4、获取或者设置当前浏览器的盒子模型属性
        function win(attr,value) {
            if(typeof value=="undefined"){
                return document.documentElement[attr]||document.body[attr];
            }else{
                document.documentElement[attr]=value;
                document.body[attr]=value;
            }
        }
        //5、获取随机数的方法
        function getRandom(n,m) {
            n=Number(n);
            m=Number(m);
            if(isNaN(n)||isNaN(m)){
                return Math.random();
            }
            if(n>m){
               n=n+m;
               m=n-m;
               n=n-m;
            }

            return Math.round(Math.random()*(m-n)+n);
        }
        //6、getCss
        function getCss(curEle,attr){
            var val=null;
            if("getComputedStyle" in window){
                //在标准浏览器中，window下有"getComputedStyle"这个属性
                val=window.getComputedStyle(curEle)[attr];
            }else{
                if(attr=="opacity"){
                    val=curEle.currentStyle["filter"];
                    var reg=/^alpha\(opacity=(\d+(?:\.\d+)?)\)$/;
                    val=reg.test(val)?RegExp.$1/100:1;
                }else{
                    val=curEle.currentStyle[attr];
                }
            }
            //val里面就存着我们想要的属性值，但是还要做进一步处理，把单位是px,pt,deg,em,rem,pp 返回值是数字
            var re=/^-?\d+(?:\.\d+)?(?:px|pt|deg|em|rem|pp)?$/g;
            if(re.test(val)){
                val=parseFloat(val);
            }
            return val;
        }
        //7、setCss
        function setCss(ele,attr,value) {
            //当attr是"opacity"设置两次，要兼容IE6-8
            if(attr=="opacity"){
                ele.style.opacity=value;
                ele.style.filter="alpha(opacity="+value*100+")";
                return;
            }
            //当浮动的时候我们需要特殊处理
            if(attr=="float"){
                ele.style.cssFloat=value;//标准浏览器
                ele.style.styleFloat=value;//IE6-8
                return;
            }
            var reg=/^(width|height|left|right|top|bottom|(margin|padding)(Top|Bottom|Left|Right)?)$/g;
            if(reg.test(attr)){
                if(!isNaN(value)){
                    value+="px";
                }
            }
            ele.style[attr]=value;
        }
        //8、setGroupCss
        function setGroupCss(ele, obj) {
        obj = obj || [];
        if (obj.toString() == "[object object]") {
            for (var key in obj) {
                this.setCss(ele,key,obj[key]);
            }
        }
    }
    return{
        toArray:toArray,
        toJsonObj:toJsonObj,
        offset:offset,
        win:win,
        getRandom:getRandom,
        getCss:getCss,
        setCss:setCss,
        setGroupCss:setGroupCss
    }
})();