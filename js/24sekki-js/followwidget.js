// JavaScript Document

//霑ｽ蟆ｾ繧ｦ繧｣繧ｸ繧ｧ繝�ヨ
(function($) {
	$(document).ready(function() {
		/*
		Ads Sidewinder
		by Hamachiya2. https://d.hatena.ne.jp/Hamachiya2/20120820/adsense_sidewinder
		*/
		var main = $('main'); // 繝｡繧､繝ｳ繧ｫ繝ｩ繝�縺ｮID
		var side = $('#sidebar'); // 繧ｵ繧､繝峨ヰ繝ｼ縺ｮID
		var wrapper = $('#widget-tracking'); // 蠎�相繧貞桁繧隕∫ｴ�縺ｮID
		
		var x = 767;
		var inner_w = window.innerWidth;
		
		if(x < inner_w){
			if( main.length && side.length && wrapper.length ){ // 繝壹�繧ｸ繝�Φ繝励Ξ繝ｼ繝医〒�代き繝ｩ繝�陦ｨ遉ｺ繧ｿ繧､繝励ｒ驕ｸ繧薙□縺ｨ縺阪�繧ｨ繝ｩ繝ｼ蝗樣∩
				var sideMargin = {
					top: side.css('margin-top') ? side.css('margin-top') : 0,
					right: side.css('margin-right') ? side.css('margin-right') : 0,
					bottom: side.css('margin-bottom') ? side.css('margin-bottom') : 0,
					left: side.css('margin-left') ? side.css('margin-left') : 0
				};

				var w = $(window);
				var wrapperHeight = wrapper.outerHeight();
				var wrapperTop = wrapper.offset().top;
				var sideLeft = side.offset().left;

				var winLeft;
				var pos;

				var scrollAdjust = function() {
					var sideHeight = side.outerHeight();
					var mainHeight = main.outerHeight();
					var mainAbs = main.offset().top + mainHeight;
					var winTop = w.scrollTop();
					var winLeft = w.scrollLeft();
					var winHeight = w.height();
					var nf = (winTop > wrapperTop) && (mainHeight > sideHeight) ? true : false;
					var pos = !nf ? 'static' : (winTop + wrapperHeight) > mainAbs ? 'absolute' : 'fixed';
					if (pos === 'fixed') {
						side.css({
							position: pos,
							top: '',
							bottom: winHeight - wrapperHeight - 40,
							left: sideLeft - winLeft,
							margin: 0
						});

					} else if (pos === 'absolute') {
						side.css({
							position: pos,
							top: mainAbs - sideHeight,
							bottom: '',
							left: sideLeft,
							margin: 0
						});

					} else {
						side.css({
							position: pos,
							marginTop: sideMargin.top,
							marginRight: sideMargin.right,
							marginBottom: sideMargin.bottom,
							marginLeft: sideMargin.left
						});
					}
				};

				var resizeAdjust = function() {
					side.css({
						position:'static',
						marginTop: sideMargin.top,
						marginRight: sideMargin.right,
						marginBottom: sideMargin.bottom,
						marginLeft: sideMargin.left
					});
					sideLeft = side.offset().left;
					winLeft = w.scrollLeft();
					if (pos === 'fixed') {
						side.css({
							position: pos,
							left: sideLeft - winLeft,
							margin: 0
						});

					} else if (pos === 'absolute') {
						side.css({
							position: pos,
							left: sideLeft,
							margin: 0
						});
					}
				};
				w.on('load', scrollAdjust);
				w.on('scroll', scrollAdjust);
				w.on('resize', resizeAdjust);
			}
		}
	});
})(jQuery);
