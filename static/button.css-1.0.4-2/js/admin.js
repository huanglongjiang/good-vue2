$(function(){
    $("#side .title").click(function(){
        $(this).parent("li").siblings().find("ul").slideUp("fast");
        $(this).next().slideToggle("fast");

        if(!$(this).find("i").hasClass("fa-angle-down")){
            $(this).find("i").removeClass("fa-angle-up").addClass("fa-angle-down");
        }else{
            $(this).find("i").removeClass("fa-angle-down").addClass("fa-angle-up");
        }

        $(this).parent("li").siblings().find(".title i").removeClass("fa-angle-up").addClass("fa-angle-down");

        $(this).parent("li").siblings().find(".title").removeClass("active");
        $(this).addClass("active");
        
    })
})

function Classstyle(style){

    localStorage.setItem('className',style);
    location.reload() 
    var url="css/button-"+style+".css"
    $("#link-button").attr("href",url);
}

$(function(){

    var style=localStorage.getItem("className");
    if (style==null) {
        $("#link-button").attr("href","css/button.css");
    }else{
        var url="css/button-"+style+".css";
        $("#link-button").attr("href",url);
    }
    
})
$(function() {
    $("#toTop").scrollToTop(1000);
});

(function(a) {
    a.fn.scrollToTop = function(c) {
        var d = {
            speed: 800
        };
        c && a.extend(d, {
            speed: c
        });
        return this.each(function() {
            var b = a(this);
            a(window).scroll(function() {
                100 < a(this).scrollTop() ? b.fadeIn() : b.fadeOut()
            });
            b.click(function(b) {
                b.preventDefault();
                a("body, html").animate({
                    scrollTop: 0
                },
                d.speed)
            })
        })
    }
})(jQuery); 