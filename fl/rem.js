
function getRem(pWith,pRem){
	var html=document.getElementsByTagName("html")[0];
	var mWidth=document.body.clientWidth||document.documentElement.clientWidth;
	html.style.fontSize=mWidth/pWith*pRem+"px";
}
window.onload=function(){
	getRem(640,100);
}

window.onresize=function(){
	getRem(640,100);
}



