$(function(){
    $(document).on("click","#side .title",function(){

        $(this).parent("li").siblings().find("ul").slideUp("fast");
        $(this).next().slideToggle("fast");

        if(!$(this).find("i").hasClass("zx-icon-next")){
            $(this).find("i").removeClass("zx-icon-down").addClass("zx-icon-next");
        }else{
            $(this).find("i").removeClass("zx-icon-next").addClass("zx-icon-down");
        }

        $(this).parent("li").siblings().find(".title i").removeClass("zx-icon-down").addClass("zx-icon-next");
        
    })


    $(document).on("click","#side li ul li span",function(){
      
        $("#side li ul li").removeClass("active");
        $(this).parent().addClass("active");

        /*$("#side li ul li span").css("color","#adb5bd");
        $(this).css("color","#adb5bd");*/

        $("#btnmp3")[0].play();
    })


})  