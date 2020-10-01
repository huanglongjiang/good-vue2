$(function(){
    $(document).on("click","#side .title",function(){

        $(this).parent("li").siblings().find("ul").slideUp("fast");
        $(this).next().slideToggle("fast");

        if(!$(this).find("i").eq(1).hasClass("fa-angle-right")){
            $(this).find("i").eq(1).removeClass("fa-angle-down").addClass("fa-angle-right");
        }else{
            $(this).find("i").eq(1).removeClass("fa-angle-right").addClass("fa-angle-down");
        }

        $(this).parent("li").siblings().find(".title i").eq(1).removeClass("fa-angle-down").addClass("fa-angle-right");
        
    })


    $(document).on("click","#side li ul li span",function(){
      
        $("#side li ul li").removeClass("active");
        $(this).parent().addClass("active");

        /*$("#side li ul li span").css("color","#adb5bd");
        $(this).css("color","#adb5bd");*/

        $("#btnmp3")[0].play();
    })


})  