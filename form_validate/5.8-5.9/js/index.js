/*** Created by Administrator on 2017/5/10.*/
var news=document.getElementById("news");
//获取数据
var xhr=new XMLHttpRequest();
xhr.open("get","js/data.txt?_="+Math.random(),false);
xhr.onreadystatechange=function () {
    if(xhr.readyState===4&&xhr.status===200){
        window.data=public.toJsonObj(xhr.responseText);
    }
};
xhr.send(null);
//绑定数据
if(window.data&&window.data.length){
    var str=``;
    for(var i=0;i<data.length;i++){
        str+=`<li><div><img src="" photo="${data[i].src}" alt=""></div><div><h2>${data[i].title}</h2><p>${data[i].desc}</p></div></li>`;
    }
}
news.innerHTML=str;
//图片延迟加载
var imgList=document.getElementsByTagName("img");
function imgDelayLoad() {
    for(var i=0;i<imgList.length;i++){
        var H=public.win("scrollTop")+public.win("clientHeight");
        var h=imgList[i].parentNode.offsetHeight+public.offset(imgList[i].parentNode).top;
        if(H>h){
            imgLoad(imgList[i]);
            fadeIn(imgList[i]);
        }
    }
}
function imgLoad(img) {
    var curImg=document.createElement("img");
    curImg.src=img.getAttribute("photo");
    curImg.onload=function () {
        img.src=this.src;
    };
    curImg=null;
}
imgDelayLoad();
//触发滚动事件的时候还需要加载
window.onscroll=imgDelayLoad;
function fadeIn(ele) {
    ele.timer=window.setInterval(function () {
        var opacityVal=public.getCss(ele,"opacity");
        if(opacityVal>=1){
            window.clearInterval(ele.timer);
            return;
        }
        opacityVal+=0.01;
        public.setCss(ele,"opacity",opacityVal)
    },30)
}


