// JavaScript Document


// Android縺ｮ繝ｦ繝ｼ繧ｶ繝ｼ繧ｨ繝ｼ繧ｸ繧ｧ繝ｳ繝亥愛蛻･��CSS繝上ャ繧ｯ逕ｨ��
(function($){
	if ( navigator.userAgent.indexOf('Android') > 0 ) {
		$("body").addClass("android");
	}
})(jQuery);


//YouTube縺ｮ蜈ｨ逕ｻ髱｢陦ｨ遉ｺ蟇ｾ遲�
(function($){
	var remove = function(){
		$('#sidebar').removeClass('animate');
	};
	setTimeout(remove, 1700);
})(jQuery);


//繝医ャ繝励�謌ｻ繧九�繧ｿ繝ｳ
(function($){
  $(window).scroll(function(){
	  
    var now = $(window).scrollTop();
    //譛荳企Κ縺九ｉ迴ｾ蝨ｨ菴咲ｽｮ縺ｾ縺ｧ縺ｮ霍晞屬(now)縺�600莉･荳�
    if(now > 600){
      //[#page-top]繧偵ｆ縺｣縺上ｊ繝輔ぉ繝ｼ繝峨う繝ｳ縺吶ｋ
      $('#page-top').fadeIn('slow');
      //縺昴ｌ莉･螟悶□縺｣縺溘ｉ繝輔ぉ繝ｼ繝峨い繧ｦ繝医☆繧�
    }else{
      $('#page-top').fadeOut('slow');
    }
  });
  //繝懊ち繝ｳ(id:move-page-top)縺ｮ繧ｯ繝ｪ繝�け繧､繝吶Φ繝�
  $(document).on('click', '.totop', function(){
  //繝壹�繧ｸ繝医ャ繝励∈遘ｻ蜍輔☆繧�
  $('body,html').animate({
          scrollTop: 0
      }, 200);
  });
})(jQuery);

	
(function($){
	$(window).on('load resize',function(){

		var eventTrigger = $('.tabBtn-mag li');//繧､繝吶Φ繝医�蠑輔″驥代→縺ｪ繧玖ｦ∫ｴ�

		//鬮倥＆縺ｮ隱ｿ謨ｴ
		var parentDiv = $('.toppost-list-box-inner');//鬮倥＆繧剃ｸ弱∴繧玖ｦ∫ｴ�
		var hGet = $('.toppost-list-box .autoheight');//鬮倥＆繧呈戟縺｣縺ｦ縺�ｋ隕∫ｴ�
		var childrenH;//height險ｭ螳夂畑螟画焚縺ｮ螳｣險

		eventTrigger.on('click',function(){
			var numver = $(this).index();//繧ｯ繝ｪ繝�け縺輔ｌ縺溯ｦ∫ｴ�縺ｮindex逡ｪ蜿ｷ繧貞叙蠕�
			if($(this).hasClass('first-tab')){
				return;
			}else{
				$('.first-tab').removeClass('first-tab');
				$(this).addClass('first-tab');

				$('.hFind').removeClass('hFind');
				hGet.eq(numver).addClass('hFind');
			}

			//繧ｯ繝ｪ繝�け縺励◆隕∫ｴ�縺ｮ逡ｪ蜿ｷ縺ｨ蜷後§index逡ｪ蜿ｷ繧呈戟縺､蟄占ｦ∫ｴ�縺ｮ鬮倥＆繧定ｨｭ螳�
			childrenH = $('.hFind').outerHeight();//鬮倥＆繧貞叙蠕暦ｼ�margin繧貞性繧√◆��
			parentDiv.css({height:childrenH});//隕∫ｴ�縺ｮ鬮倥＆繧定ｦｪ隕∫ｴ�縺ｫ謖�ｮ�
		});
	});
})(jQuery);



//繝槭ぎ繧ｸ繝ｳ繧ｿ繧､繝励�繧､繝ｳ繝輔ぅ繝ｼ繝牙ｺ�相縺ｮ繧ｿ繝悶Ξ繝�ヨ遶ｯ譛ｫ縺ｮ髱櫁｡ｨ遉ｺ險ｭ螳�
(function($){
	$(document).ready(function() {
		var w_Size = window.innerWidth;
		if( w_Size <= 838 ){
			$(".pconly").remove();
		}
	});
})(jQuery);


//繧ｷ繝ｳ繧ｿ繝�け繧ｹ繝上う繝ｩ繧､繧ｿ繝ｼ縺ｮ陦檎分蜿ｷ繧ｯ繝ｩ繧ｹ繧偵▽縺代ｋ
(function($){
	$(document).ready(function() {
		$('.cps-post-main-box pre').addClass('line-numbers');
	});
})(jQuery);


//繧｢繧ｳ繝ｼ繝�ぅ繧ｪ繝ｳ繝懊ャ繧ｯ繧ｹ縺ｮ髢矩哩
(function($){
    $('.jin-ac-box01-title').click(function(){
		$(this).toggleClass("open");
        $(this).next().toggleClass("open");
    });
	$('.jin-ac-box02-title').click(function(){
		$(this).toggleClass("open");
        $(this).next().toggleClass("open");
    });
})(jQuery);

/*逕ｻ蜒上�螟夜Κ繝ｪ繝ｳ繧ｯ縺ｮ蠕後ｍ縺ｫ繧｢繧､繧ｳ繝ｳ縺後▽縺九↑縺�ｈ縺�↓縺吶ｋ
(function($){
	$(document).ready(function() {
		$('a').has('img').addClass('remove-icon');
	});
})(jQuery);
*/
