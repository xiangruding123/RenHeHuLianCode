

$(function(){
	$.ajax({
		type: 'post',
		url: 'http://192.168.0.174:8080/SportPower/app/notice/queryNoticeNewsTypeList.action?userId=402880fa5bf1407c015bf1407ce50000',
		data: {
			token: "token",
			mid: "mid",
			flag: "wap"
		},
		dataType: 'json',
		success: function(data) {
			if(data.message === "ok") {
				console.log(data);
				var html = template.render("tplList",data);
				$("#tpl_list").html(html);
			}
		},
		error: function(xhr) {
			console.log("ajax error!//数据没出来 导致的页面没有数据");
		}
	});
});



