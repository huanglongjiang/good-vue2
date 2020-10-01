$(function(){
	//弹出中间图层也弹出遮罩图层
	$(document).on("click","[data-popover='modal']",function(){
		$("div").remove(".panel-backdrop");
		var backdrop='<div class="panel-backdrop"></div>'
		$("body").append(backdrop);
		var i=$(this).attr("data-target");
		$(i).show("fast");
	})

	//只弹出中间图层
	$(document).on("click","[data-popover='modals']",function(){
		var i=$(this).attr("data-target");
		$(i).show("fast");
	})


	//关闭图层同时也关闭遮罩图层——(遮罩图层为半透明)
	$(document).on("click","[data-close='modal']",function(){
		$("div").remove(".panel-backdrop");
		$(this).parents("[data-modal='zx']").hide("fast");

	})

	//关闭图层同时也关闭遮罩图层——(遮罩图层为全透明)
	$(document).on("click","[data-close='modalx']",function(){
		$("div").remove(".panel-backdrop2");
		$(this).parents("[data-modal='zx']").hide("fast");

	})


	// 只关闭当前图层，不关闭遮罩图层
	$(document).on("click","[data-close='modals']",function(){
		$(this).parents("[data-modal='zx']").hide("fast");
	})

	//弹出右侧图层	
	$(document).on("click","[data-popover='modal-animate']",function(){
		$("div").remove(".panel-backdrop");
		var backdrop='<div class="panel-backdrop panel-backdrop-animate"></div>'
		$("body").css("overflow","hidden")
		$("body").append(backdrop);

		var i=$(this).attr("data-target");
		$(i).animate({"right":"0px"},300);

	})

	//右侧弹出层关闭按钮
	$(document).on("click","[data-close='modal-animate']",function(){

		$("body").css("overflow","auto");
		$("div").remove(".panel-backdrop");
		$(this).parents("[data-modal='zx-animate']").animate({"right":"-1000px"},300);

	})

	//点击遮罩图层关闭右侧模态框
	$(document).on("click",".panel-backdrop-animate",function(){
		$("body").css("overflow","auto");
		$("div").remove(".panel-backdrop");
		$("[data-modal='zx-animate']").animate({"right":"-1000px"},300);
	})
})
	
//js代码弹出中间图层
function target_popup(i){
    $("div").remove(".panel-backdrop");
    var backdrop='<div class="panel-backdrop"></div>'
    $("body").append(backdrop);
    $(i).show("fast");
}
//js代码打开右侧模态框
function target_popup_animate(i){
	$("div").remove(".panel-backdrop");
	var backdrop='<div class="panel-backdrop"></div>'
	$("body").append(backdrop);
	$(i).animate({"right":"0px"},300);
	$(i).css("display","block")
}

//js代码关闭中间图层
function close_popup(i){
	$("div").remove(".panel-backdrop");
	$(i).hide("fast");
}

//js代码关闭右侧模态框
function close_popup_animate(i){
	$("body").css("overflow","auto");
	$("div").remove(".panel-backdrop");
	$(i).animate({"right":"-1000px"},300);
}



var target_popover={
	// 遮罩图层
	backdrop:function(){
		var html="";
			html+='<div class="panel-backdrop"></div>';
			return html;
	},
	backdrop2:function(){
		var html="";
			html+='<div class="panel-backdrop2" style="display: block;z-index: 110"></div>';
			return html;
	},
	// 加载提示图层
	loading:function(title){		
		var html="";
			html+='<div class="loading zoomIn animated01" style="z-index: 111">';
			html+='<div class="i font-size-45 zx-icon-spinner"></div>';
			html+='<div class="text font-size-18">'+title+'</div>';
			html+='</div>';
			html+=this.backdrop2();

			return $("body").append(html); 
	},
	loading1:function(title){		
		var html="";
			html+='<div class="loading zoomIn animated01" style="z-index: 111">';
			html+='<div class="i font-size-45 zx-icon-spinner6"></div>';
			html+='<div class="text">'+title+'</div>';
			html+='</div>';
			html+=this.backdrop2();

			return $("body").append(html);
	},
	loading2:function(title){		
		var html="";
			html+='<div class="loading zoomIn animated01" style="z-index: 111">';
			html+='<div class="i font-size-45 zx-icon-spinner3"></div>';
			html+='<div class="text">'+title+'</div>';
			html+='</div>';
			html+=this.backdrop2();

			return $("body").append(html); 
	},
	// 操作结果提示图层

	//半透明遮罩图层、关闭按钮遮罩图层消失
	success:function(title){
		$("div").remove("#success");
		var html="";
			html+='<div id="success" class="popover-success zoomIn animated01" data-modal="zx" style="z-index: 111;">';
			html+='	<div class="popover-success-top">';
			html+='		<div class="popover-success-ico"></div>';
			html+='		<div class="popover-success-title1">操作成功</div>';
			html+='		<div class="popover-success-title2 font-size-18">'+title+'</div>';
			html+='	</div>';
			html+='	<div class="popover-success-bottom">';
			html+='		<div class="button button-primary button-sm" data-close="modal">关闭</div>';
			html+='	</div>';
			html+='</div>';
			html+=this.backdrop();
			
			return $("body").append(html);
	},
	//无遮罩图层、关闭按钮遮罩图层消失——(父级遮罩图层为半透明)
	success1:function(title){
		$("div").remove("#success");
		var html="";
			html+='<div id="success" class="popover-success zoomIn animated01" data-modal="zx" style="z-index: 111;">';
			html+='	<div class="popover-success-top">';
			html+='		<div class="popover-success-ico"></div>';
			html+='		<div class="popover-success-title1">操作成功</div>';
			html+='		<div class="popover-success-title2 font-size-18">'+title+'</div>';
			html+='	</div>';
			html+='	<div class="popover-success-bottom">';
			html+='		<div class="button button-primary button-sm" data-close="modal">关闭</div>';
			html+='	</div>';
			html+='</div>';
			
			return $("body").append(html);
	},
	//无遮罩图层、关闭按钮遮罩图层消失——(父级遮罩图层为全透明)
	success2:function(title){
		$("div").remove("#success");
		var html="";
			html+='<div id="success" class="popover-success zoomIn animated01" data-modal="zx" style="z-index: 111;">';
			html+='	<div class="popover-success-top">';
			html+='		<div class="popover-success-ico"></div>';
			html+='		<div class="popover-success-title1">操作成功</div>';
			html+='		<div class="popover-success-title2 font-size-18">'+title+'</div>';
			html+='	</div>';
			html+='	<div class="popover-success-bottom">';
			html+='		<div class="button button-primary button-sm" data-close="modalx">关闭</div>';
			html+='	</div>';
			html+='</div>';
			
			return $("body").append(html);
	},
	//半透明遮罩图层、关闭按钮遮罩图层消失
	error:function(title){
		$("div").remove("#error");
		var html="";
			html+='<div id="error" class="popover-danger zoomIn animated01" data-modal="zx" style="z-index: 111;">';
			html+='	<div class="popover-danger-top">';
			html+='		<div class="popover-danger-ico"></div>';
			html+='		<div class="popover-danger-title1">操作失败</div>';
			html+='		<div class="popover-danger-title2 font-size-18">'+title+'</div>';
			html+='	</div>';
			html+='	<div class="popover-danger-bottom">';
			html+='		<div class="button button-primary button-sm" data-close="modal">关闭</div>';
			html+='	</div>';
			html+='</div>';
			html+=this.backdrop();
			
			return $("body").append(html);
	},
	//无遮罩图层、关闭按钮遮罩图层消失——(父级遮罩图层为半透明)
	error1:function(title){
		$("div").remove("#error");
		var html="";
			html+='<div id="error" class="popover-danger zoomIn animated01" data-modal="zx" style="z-index: 111;">';
			html+='	<div class="popover-danger-top">';
			html+='		<div class="popover-danger-ico"></div>';
			html+='		<div class="popover-danger-title1">操作失败</div>';
			html+='		<div class="popover-danger-title2 font-size-18">'+title+'</div>';
			html+='	</div>';
			html+='	<div class="popover-danger-bottom">';
			html+='		<div class="button button-primary button-sm" data-close="modalx">关闭</div>';
			html+='	</div>';
			html+='</div>';
			
			return $("body").append(html);
	},

	//无遮罩图层、关闭按钮遮罩图层消失——(父级遮罩图层为全透明)
	error2:function(title){
		$("div").remove("#error");
		var html="";
			html+='<div id="error" class="popover-danger zoomIn animated01" data-modal="zx" style="z-index: 111;">';
			html+='	<div class="popover-danger-top">';
			html+='		<div class="popover-danger-ico"></div>';
			html+='		<div class="popover-danger-title1">操作失败</div>';
			html+='		<div class="popover-danger-title2 font-size-18">'+title+'</div>';
			html+='	</div>';
			html+='	<div class="popover-danger-bottom">';
			html+='		<div class="button button-primary button-sm" data-close="modal">关闭</div>';
			html+='	</div>';
			html+='</div>';
			
			return $("body").append(html);
	},
	//半透明遮罩图层、关闭按钮时遮罩图层不关闭
	info:function(title){
		$("div").remove("#info");
		var html="";
			html+='<div id="info" class="popover-info zoomIn animated01" data-modal="zx" style="z-index: 111;">';
			html+='	<div class="popover-info-top">';
			html+='		<div class="popover-info-ico"></div>';
			html+='		<div class="popover-info-title1">操作提示</div>';
			html+='		<div class="popover-info-title2 font-size-18">'+title+'</div>';
			html+='	</div>';
			html+='	<div class="popover-info-bottom">';
			html+='		<div class="button button-default button-sm" data-close="modal">取消</div>';
			html+='		<div class="button button-primary button-sm" data-close="modals" data-go="yes">确定</div>';
			html+='	</div>';
			html+='</div>';
			html+=this.backdrop();
			
			return $("body").append(html);
	},
	//半透明遮罩图层、关闭按钮时遮罩图层关闭
	info1:function(title){
		$("div").remove("#info");
		var html="";
			html+='<div id="info" class="popover-warning zoomIn animated01" data-modal="zx" style="z-index: 111;">';
			html+='	<div class="popover-warning-top">';
			html+='		<div class="popover-warning-ico"></div>';
			html+='		<div class="popover-warning-title1">操作提示</div>';
			html+='		<div class="popover-warning-title2 font-size-18">'+title+'</div>';
			html+='	</div>';
			html+='	<div class="popover-warning-bottom">';
			html+='		<div class="button button-default button-sm" data-close="modal">取消</div>';
			html+='		<div class="button button-primary button-sm" data-close="modal" data-go="yes">确定</div>';
			html+='	</div>';
			html+='</div>';
			html+=this.backdrop();
			
			return $("body").append(html);
	},
	//全透明遮罩图层(取消按钮关闭遮罩图层,确定按钮不关闭遮罩图层)
	info2:function(title){
		$("div").remove("#info");
		var html="";
			html+='<div id="info" class="popover-warning zoomIn animated01" data-modal="zx" style="z-index: 111;">';
			html+='	<div class="popover-warning-top">';
			html+='		<div class="popover-warning-ico"></div>';
			html+='		<div class="popover-warning-title1">操作提示</div>';
			html+='		<div class="popover-warning-title2 font-size-18">'+title+'</div>';
			html+='	</div>';
			html+='	<div class="popover-warning-bottom">';
			html+='		<div class="button button-default button-sm" data-close="modalx">取消</div>';
			html+='		<div class="button button-primary button-sm" data-close="modals" data-go="yes">确定</div>';
			html+='	</div>';
			html+='</div>';
			html+=this.backdrop2();
			
			return $("body").append(html);
	},
	remove:function(key){
		$("div").remove(key);
	},
	remove1:function(key){
		$("div").remove(".panel-backdrop");
		$("div").remove(".panel-backdrop2");
		$("div").remove(key);
	},
	close:function(key){
		$("div").remove(".panel-backdrop");
		$("div").remove(".panel-backdrop2");
		$("div").remove(key);
	}
	
}

function model(n,title){
	//var i=eval("target_popover."+n);
	//target_popover."(title)

	switch(n)
		{
		//警告提示框	
		case "info":
			title=title==undefined?"10000":title;
		  	target_popover.info(title)
		  	break;

	  	case "info1":
			title=title==undefined?"10000":title;
		  	target_popover.info1(title)
		  	break;

	  	case "info2":
			title=title==undefined?"10000":title;
		  	target_popover.info2(title)
		  	break;

		
		//成果提示框
		case "success":
			title=title==undefined?"10000":title;
		  	target_popover.success(title)
		  	break; 

		case "success1":
			title=title==undefined?"10000":title;
		  	target_popover.success1(title)
		  	break;

		case "success2":
			title=title==undefined?"10000":title;
		  	target_popover.success2(title)
		  	break;

		//失败提示框
		case "error":
			title=title==undefined?"10000":title;
		  	target_popover.error(title)
		  	break;   	

		case "error1":
			title=title==undefined?"10000":title;
		  	target_popover.error1(title)
		  	break;  

		case "error2":
			title=title==undefined?"10000":title;
		  	target_popover.error2(title)
		  	break;   	 	
		  		
		//加载提示框  		
		case "loading":
			title=title==undefined?"10000":title;
		  	target_popover.loading(title)
			setTimeout(function(){
				target_popover.remove1(".loading")
			},1000)
		  	break;  
		case "Loginloading":
			title=title==undefined?"10000":title;
		  	target_popover.loading(title)
		  	break;
		case "remove":
		  	target_popover.remove(title)
		  	break;  
		case "remove1":
		  	target_popover.remove1(title)
		  	break;  
		case "close":
		  	target_popover.close(title)
		  	break;    	  	 	 	
		  		
		default:
		  	//console.log(9999)
	}
}







/*
function close(){
	target_popover.close("#error")
}
function loading(){
	target_popover.loading()

	setTimeout(function(){
		target_popover.remove2(".loading")
		target_popup("#model1")
	},3000)
}
function loading3(){
	target_popover.loading3()
	setTimeout(function(){
		target_popover.remove2(".loading")
	},3000)
}
function loading4(){
	target_popover.loading4()
	setTimeout(function(){
		target_popover.remove2(".loading")
	},3000)
}
function success(){
	target_popover.success("3333333333")
}
function error(){
	target_popover.error("3333333333")
}
function warning(){
	target_popover.warning("3333333333")
	$("#warning").find("[data-go='yes']").click(function(){
		alert("success")
	})
}*/