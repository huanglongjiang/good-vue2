//pop弹出代码
$(function(){

	$(document).on("click","[data-popover='modal']",function(){
		$("div").remove(".panel-backdrop");
		var backdrop='<div class="panel-backdrop"></div>'
		$("body").append(backdrop);
		var i=$(this).attr("data-target");
		$(i).fadeIn("fast");
		
		
		

	})

	$(document).on("click","[data-close='modal']",function(){

		$("div").remove(".panel-backdrop");
		//$(this).parents("[data-modal='zx']").css("display","none");
		$(this).parents("[data-modal='zx']").fadeOut("fast");

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
//

jQuery('.animation-bar-lg').each(function(){
	jQuery(this).find('.bar').animate({
	
		width:jQuery(this).attr('data-percent')
	},2000,function(){
		console.log(jQuery(this).attr('data-percent'))
	});
});