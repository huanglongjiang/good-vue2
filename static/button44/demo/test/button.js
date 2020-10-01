//pop弹出代码
$(function(){

	function target_popup(i){
	    $("div").remove(".panel-backdrop");
	    var backdrop='<div class="panel-backdrop"></div>'
	    $("body").append(backdrop);
	    $(i).css("display","block")
	}


	$(document).on("click","[data-popover='modal']",function(){
		$("div").remove(".panel-backdrop");
		var backdrop='<div class="panel-backdrop"></div>'
		$("body").append(backdrop);
		var i=$(this).attr("data-target");
		$(i).fadeIn("fast");


	})





	$(document).on("click","[data-popover='modal']",function(){
		$("div").remove(".panel-backdrop");
		var backdrop='<div class="panel-backdrop"></div>'
		$("body").append(backdrop);
		var i=$(this).attr("data-target");
		$(i).fadeIn("fast");
		
		
		

	})

	$(document).on("click","[data-close='modal']",function(){

		$("div").remove(".panel-backdrop");
		$(this).parents("[data-modal='zx']").fadeOut("fast");
	})

	$(document).on("click",".panel-backdrop-modal",function(){
        //$("div").remove(".panel-backdrop");
        $(".panel-backdrop").fadeOut("fast");
        $("[data-modal='zx']").fadeOut("fast");
    })


	$(document).on("click","[data-target='tab']",function(){
		var i=$(this).index();
		$("[data-content='modal']").hide();
		$("[data-content='modal']").eq(i).show();
	})

})

function target_popup(i){
	$("div").remove(".panel-backdrop");
	var backdrop='<div class="panel-backdrop"></div>'
	$("body").append(backdrop);
	$(i).css("display","block")
}

//pop弹出代码

/*遮罩图层*/
function backdrop(){
	var backdrop='<div class="panel-backdrop panel-backdrop-modal"></div>'
		$("div").remove(".panel-backdrop");
		$("div").remove("#success");
		$("div").remove("#error");
		$("div").remove("#warning");
	    $("body").append(backdrop);
}
/*遮罩图层*/

/*成功提示框*/
function target_success(title){
	var success="";
		success+='<div id="success" class="popover-success" data-modal="zx">';
		success+='	<div class="popover-success-top">';
		success+='		<div class="popover-success-ico"></div>';
		success+='		<div class="popover-success-title1">操作成功</div>';
		success+='		<div class="popover-success-title2">'+title+'</div>';
		success+='	</div>';
		success+='	<div class="popover-success-bottom">';
		success+='		<div class="button button-primary button-sm" data-close="modal">关闭</div>';
		success+='	</div>';
		success+='</div>';

	    backdrop();
	    $("body").append(success).fadeIn("fast");;
}
/*成功提示框*/

/*错误提示框*/
function target_error(title){
	var error="";

		error+='<div id="error" class="popover-danger" data-modal="zx">';
		error+='	<div class="popover-danger-top">';
		error+='		<div class="popover-danger-ico"></div>';
		error+='		<div class="popover-danger-title1">操作失败</div>';
		error+='		<div class="popover-danger-title2">'+title+'</div>';
		error+='	</div>';
		error+='	<div class="popover-danger-bottom">';
		error+='		<div class="button button-primary button-sm" data-close="modal">关闭</div>';
		error+='	</div>';
		error+='</div>';

	    backdrop();
	    $("body").append(error).fadeIn("fast");;
}
/*错误提示框*/

/*警告提示框*/
function target_warning(title){
	var warning="";
		warning+='<div id="warning" class="popover-warning" data-modal="zx">';
		warning+='	<div class="popover-warning-top">';
		warning+='		<div class="popover-warning-ico"></div>';
		warning+='		<div class="popover-warning-title1">操作成功</div>';
		warning+='		<div class="popover-warning-title2">'+title+'</div>';
		warning+='	</div>';
		warning+='	<div class="popover-warning-bottom">';
		warning+='		<div class="button button-default button-sm" data-close="modal">关闭</div>';
		warning+='		<div class="button button-primary button-sm" data-close="modal" data-go="yes">确定</div>';
		warning+='	</div>';
		warning+='</div>';


	    backdrop();
	    $("body").append(warning).fadeIn("fast");;
}
/*警告提示框*/

/*操作成功提示！*/
function success(){
	target_success('你已<span class="color-danger">成功创建</span>该项目！success')
	$("#success").find("[data-close='modal']").click(function(){

		alert("success")
	})
}

function success2(){
	target_success('你已成功创建该项目！success2')
}
/*操作成功提示！*/

/*操作错误提示！*/
function error(){
	target_error('您没有权限删除该项目！error')
	$("#error").find("[data-close='modal']").click(function(){

		alert("success")
	})
}

function error2(){
	target_error('您没有权限删除该项目！error2')
}
/*操作错误提示！*/

/*操作警告提示！*/
function warning(){
	target_warning('您确定要删除该项目吗？warning')
	$("#warning").find("[data-go='yes']").click(function(){
		alert("success")
	})
}

function warning2(){
	target_warning('您确定要删除该项目吗？warning2')
}
/*操作警告提示！*/