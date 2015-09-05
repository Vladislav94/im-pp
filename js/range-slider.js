(function($){
	$.fn.rangePlugin = function(options){
	 	var opts = $.extend({
	 		sliderName: '.slider',
	 		sliderInner: '.slider-inner',
	 		slideName: '.slide',
	 		rangeWrap: '.range-slider',
	 		rangeTrack: '.range-track',
	 		rangeDrag: '.range-drag'
		}, options);


		$(opts.sliderInner).each(function(){
			var $slider = $(opts.sliderName).width();

			var thisSlideW = $(this).find(opts.slideName).outerWidth(true);
			var thisSlideSize = $(this).find(opts.slideName).size();

			if ($slider >= thisSlideW*thisSlideSize) {
				console.log('true');
				$(this).parent().next().css('display', 'none');
			} else {
				$(this).parent().next().css('display', 'block');
			}

			$(this).width(thisSlideW*thisSlideSize);
		});

		// if resize - reset

		$(this).find(opts.rangeDrag).css('left', 0);
		$(this).find(opts.rangeTrack).css('width', 0);
		$(this).find(opts.sliderInner).css('left', 0);


		//click

		$(opts.rangeWrap).on('click', function(e){
			var rangeW = $(this).width(),
					sliderW = $(this).prev().width(),
					offsetRangeX = $(this).offset().left,
					slideInnerW = $(this).prev().find(opts.sliderInner).width()-sliderW,
					cursorPos = e.pageX - offsetRangeX,
					cursorProc = cursorPos*100,
					posProc = cursorProc/rangeW,
					sliderProc = slideInnerW/100;

			if (cursorPos > rangeW || cursorPos < 0) {
				return
			};

			$(this).find(opts.rangeDrag).animate({'left' : cursorPos}, 300);
			$(this).find(opts.rangeTrack).animate({'width' : cursorPos}, 300);
			$(this).prev().find(opts.sliderInner).animate({
				'left' : -sliderProc*posProc
			}, 300);

		});

		// move

		$(this).find(opts.rangeWrap).bind('mousedown touchstart', function(){
			$(this).prev().addClass('mouse-down');
			var rangeW = $(this).width(),
					sliderW = $(this).prev().width(),
					offsetRangeX = $(this).offset().left,
					slideInnerW = $(this).prev().find(opts.sliderInner).width()-sliderW,
					sliderProc = slideInnerW/100;

			$(document).bind('mousemove touchmove', function(e){
				var cursorPos = e.pageX - offsetRangeX || e.originalEvent.touches[0].pageX - offsetRangeX;
				var cursorProc = cursorPos*100;
				var posProc = cursorProc/rangeW;
				if ( cursorPos <= 0) {
					$('.mouse-down').next().find(opts.rangeDrag).css('left', 0);
					$('.mouse-down').next().find(opts.rangeTrack).css('width', 0);
					$('.mouse-down').find(opts.sliderInner).css({
						'left' : 0
					});

					return
				};

				if ( cursorPos > rangeW) {
					$('.mouse-down').next().find(opts.rangeDrag).css('left', rangeW);
					$('.mouse-down').next().find(opts.rangeTrack).css('width', rangeW);
					$('.mouse-down').find(opts.sliderInner).css({
						'left' : -slideInnerW
					});

					return
				};

				$('.mouse-down').next().find(opts.rangeDrag).css('left', cursorPos);
				$('.mouse-down').next().find(opts.rangeTrack).css('width', cursorPos);
				$('.mouse-down').find(opts.sliderInner).css('left', -sliderProc*posProc);
			});
			return false
		});
		
		// clean event
		$(document).bind('touchend mouseup' , function(){
			$(document).unbind('mousemove, touchmove');
			$(opts.sliderName).removeClass('mouse-down');
		});

	};
})(jQuery);





