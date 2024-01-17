jQuery(function($) {
    var headerHight = 100;
    if( rtocScrollAnimation.rtocScrollAnimation == 'on' ){
        $('#rtoc-mokuji-wrapper a[href^="#"]').click(function(){
            var speed = 480;
            var href= $(this).attr("href");
            var target = $(href == "#" || href == "" ? 'html' : href);
            var position = target.offset().top;
            $("html, body").animate({scrollTop:position - headerHight}, speed, "swing");
            return false;
        });   
    }
});
