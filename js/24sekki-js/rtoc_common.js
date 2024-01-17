jQuery(function($) {

	// Add animation class 
	var mokujiWarpper = document.getElementById('rtoc-mokuji-wrapper');
	var mokujiTitle = document.getElementById('rtoc-mokuji-title');

	// 繧ｹ繝ｩ繧､繝峨い繝九Γ繝ｼ繧ｷ繝ｧ繝ｳ
	var OpenClose = document.querySelector('.rtoc_open_close');
	var listWrapper = document.querySelector('.level-1');

	// 髢矩哩繝懊ち繝ｳ
	if (OpenClose != null){
		if( OpenClose.classList.contains('rtoc_open') ){
			OpenClose.textContent = rtocCloseText.rtocCloseText;
		} else if( OpenClose.classList.contains('rtoc_close') ){
			OpenClose.textContent = rtocOpenText.rtocOpenText;
			listWrapper.classList.add('is_close');
		}
		OpenClose.addEventListener('click', () => {
			listWrapper.classList.toggle('is_close');
			if ( listWrapper.classList.contains('is_close') ){
				OpenClose.textContent = rtocOpenText.rtocOpenText;
			} else {
				OpenClose.textContent = rtocCloseText.rtocCloseText;
			}
		});
	}

// if( rtocAddonOn.rtocAddonOn == 'on' ){
//     mokujiWarpper.classList.add('addon_on');
// } else if( rtocAddonOn.rtocAddonOn  == 'off' ){
//     mokujiWarpper.classList.add('addon_off');
// }

// if( rtocAddonDesign.rtocAddonDesign == 'design1' ){
//     mokujiWarpper.classList.add('addon1');
// } else if( rtocAddonDesign.rtocAddonDesign  == 'design2' ){
//     mokujiWarpper.classList.add('addon2');
// } else if( rtocAddonDesign.rtocAddonDesign  == 'design3' ){
//     mokujiWarpper.classList.add('addon3');
// } else if( rtocAddonDesign.rtocAddonDesign  == 'design4' ){
//     mokujiWarpper.classList.add('addon4');
// } else if( rtocAddonDesign.rtocAddonDesign  == 'design5' ){
//     mokujiWarpper.classList.add('addon5');
// } else if( rtocAddonDesign.rtocAddonDesign  == 'design6' ){
//     mokujiWarpper.classList.add('addon6');
// } else if( rtocAddonDesign.rtocAddonDesign  == 'design7' ){
//     mokujiWarpper.classList.add('addon7');
// }

// if( mokujiWarpper.classList.contains('addon5') || mokujiWarpper.classList.contains('addon7') ){
//     $('.level-1 > .rtoc-item').before('<li class="rtoc-chapter"></li>');
//     var AddonSection  = document.querySelectorAll('.rtoc-chapter');
//     for (var s = 0 ; s<AddonSection.length; s++){
//         AddonSection[s].insertAdjacentHTML('afterbegin', '<span class="rtoc-chapter-text">'+rtocAddonSection.rtocAddonSection+'</span>');
//     }
// } 
// const rtocSvgLeft = '<svg class="rtoc_left" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 9.89 8.93"><defs><style>.cls-1{fill:none;stroke:#707070;stroke-linecap:round;stroke-miterlimit:10;stroke-width:0.5px;}</style></defs><g><g><g><line class="cls-1" x1="0.25" y1="0.9" x2="8.03" y2="8.68"/><line class="cls-1" x1="6.37" y1="0.25" x2="9.64" y2="5.9"/></g></g></g></svg>';
// const rtocSvgRight = '<svg class="rtoc_right" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 9.91 8.93"><defs><style>.cls-1,.cls-2{fill:none;stroke:#707070;stroke-linecap:round;stroke-width:0.5px;}</style></defs><g><g><g><line class="cls-1" x1="9.66" y1="0.9" x2="1.87" y2="8.68"/><line class="cls-2" x1="3.51" y1="0.25" x2="0.25" y2="5.9"/></g></g></g></svg>';
// if( mokujiWarpper.classList.contains('addon6')  && mokujiWarpper.classList.contains('addon_on') ){
//     $('.addon6 #rtoc-mokuji-title span').prepend(rtocSvgLeft);
//     $('.addon6 #rtoc-mokuji-title span').append(rtocSvgRight);
// }
// $("#rtoc-mokuji-wrapper:has(.rtoc_center)").addClass("rtoc_text_parent");
