/**
 * Custom Responsive Carousel
 * https://github.com/jdeathe/Dynamic-carousel
 * Based on original code by:
 * ! (c) Mat Marquis (@wilto). MIT License. http://wil.to/3a
 */
(function( $, undefined ) {
	var inst = 0;
	
	$.fn.getPercentage = function() {
		var oPercent = this.attr('style').match(/margin\-left:(.*[0-9])/i) && parseInt(RegExp.$1);
		
		return oPercent;
	};
	
	$.fn.adjRounding = function(slide) {
		var $el = $(this),
			$slides = $el.find( slide ),
			diff = $el.parent().width() - $slides.eq(0).width();
		
		if (diff !== 0) { 
			$($slides).css( "position", "relative" );
			
			for (var i = 0; i < $slides.length; i++) {
				$slides.eq(i).css( "left", (diff * i) + "px" );
			}
		}

		return this;
	};

	$.fn.transitionSupport = function () {
		dBody = (document.body || document.documentElement);
		dBody.setAttribute('style', 'transition:top 1s ease;-webkit-transition:top 1s ease;-moz-transition:top 1s ease;');
		return !! (dBody.style.transition || dBody.style.webkitTransition || dBody.style.msTransition || dBody.style.OTransition || dBody.style.MozTransition);
	};

	$.fn.rcarousel = function(config) {
		
		// Prevent re-init:
		if( this.data( "rcarousel-initialized" ) ) { return; }
		
		// Carousel is being initialized:
		this.data( "rcarousel-initialized", true );

		var defaults = {
			slider			: '.slider',
			slide			: '.slide',
			prevSlide		: null,
			nextSlide		: null,
			slideHed		: null,
			addPagination	: false,
			addNav			: ( config != undefined && ( config.prevSlide || config.nextSlide ) ) ? false : true,
			namespace		: 'rcarousel',
			speed			: 300,
			rotate			: false,
			startSlide		: 1,
			lazy			: false,
			lazyFadeDuration: 300,
			autoRotate		: false,
			autoHeight		: false
		},
		opt               = $.extend(defaults, config),
		$slidewrap        = this,
		imgLoaded         = false,
		rcarousel = {
			init : function() {				
				inst++;
								
				$slidewrap.each(function(carInt) {
						var $wrap      = $(this),
							$slider    = $wrap.find(opt.slider),
							$slide     = $wrap.find(opt.slide),			
							slidenum   = $slide.length,
							transition = "all " + ( opt.speed / 1000 ) + "s ease",
							tmp        = 'rcarousel-' + inst + '-' + carInt,
							start      = opt.startSlide < 1 ? 1 : opt.startSlide > slidenum ? slidenum : parseInt(opt.startSlide);

						if( $slide.length <= 1 ) {
							return; /* No sense running all this code if the carousel functionality is unnecessary. */
						}
						
						$wrap
							.css({
								overflow             : "hidden",
								width                : "100%"
							})
							.attr('role' , 'application');
						
						$slider
							.attr( 'id', ( $slider[0].id || 'rcarousel-' + inst + '-' + carInt ) )
							.css({
								"marginLeft"         : -(100 * (start - 1)) + "%",
								"float"              : "left",
								"width"              : 100 * slidenum + "%",
								"-webkit-transition" : transition,
								"-moz-transition"    : transition,
								"-ms-transition"     : transition,
								"-o-transition"      : transition,
								"transition"         : transition
							})
							.bind( 'rcarouselmove' , rcarousel.move )
							.bind( 'nextprev'     , rcarousel.nextPrev )
							.bind( 'navstate'     , rcarousel.navState )
							.bind( 'loadimages'   , rcarousel.loadImages);

						$slide
							.css({
								"float": "left",
								width: (100 / slidenum) + "%"				
							})
							.each(function(i) {
								var $el = $(this);

								$el.attr({
									role : "tabpanel document",
									id   : tmp + '-slide' + i
								});

								if( opt.addPagination ) {
									$el.attr('aria-labelledby', tmp + '-tab' + i);
								}
							});
	
						// Build and insert navigation/pagination, if specified in the options:
						opt.addPagination   && rcarousel.addPagination();
						opt.addNav 			&& rcarousel.addNav();
						
						$slider.trigger( "navstate", { current: -(100 * (start - 1)) });

						if (opt.lazy == false) {
							$slider.trigger('loadimages');
						}
				});
			},
			loadImages: function () {
				if (imgLoaded == true) {
					return;
				}

				var $el = $(this);
				$images = $el.find(opt.slide + ' img');
				$images.each(function (index) {
					$(this).removeClass('lazy');
					title = $(this).attr('title');
					if (index != opt.startSlide - 1 && typeof title !== 'undefined') {
						$(this).hide();
						img = title.replace('Image: ', '');
						$(this).removeAttr('title').attr('src', img).fadeIn(opt.lazyFadeDuration);
					}
				});
				imgLoaded = true;
			},
			addNav : function() {
				$slidewrap.each(function(i) {						
					var $oEl = $(this),
						$slider = $oEl.find(opt.slider),
						$slide = $oEl.find(opt.slide),
						slidenum = $slide.length,
						start = opt.startSlide < 1 ? 1 : opt.startSlide > slidenum ? slidenum : parseInt(opt.startSlide),
						currentSlider = $slider[start - 1].id,
						navMarkup = [
							'<ul class="slidecontrols" role="navigation">',
							'	<li role="presentation"><a href="#' + currentSlider + '" class="' + opt.namespace + '-next">Next</a></li>',
							'	<li role="presentation"><a href="#' + currentSlider + '" class="' + opt.namespace + '-prev">Prev</a></li>',
							'</ul>'
							].join(''),
						nextprev = {
							nextSlide : '.' + opt.namespace + '-next',
							prevSlide : '.' + opt.namespace + '-prev'
						};

					opt = $.extend(opt, nextprev);
					
					$oEl.prepend(navMarkup);
				});
			},
			addPagination : function() {
				$slidewrap.each(function(i) {
					var $oEl        = $(this),
						$pagination = $('<ul class="' + opt.namespace + '-tabs" role="tablist navigation" />'),
						$slides     = $oEl.find(opt.slide),
						slideNum    = $slides.length,
						associated  = 'rcarousel-' + inst + '-' + i;
						
					while( slideNum-- ) {
						var hed = $slides.eq(slideNum).find( opt.slideHed ).text() || 'Page ' + ( slideNum + 1 ),
							tabMarkup = [
								'<li role="presentation">',
									'<a href="#' + associated + '-slide' + slideNum +'"',
									' aria-controls="' + associated + '-slide' + slideNum +'"',
									' id="' + associated + '-tab' + slideNum + '" role="tab">' + hed + '</a>',
								'</li>'
							].join('');
						
						$pagination.prepend(tabMarkup);
					};
					
					$oEl.prepend( '<div id="carousel_pagination" class="pagination" style="display:inline-block;margin:0" />' );
					
					$pagination
						.appendTo('#carousel_pagination')
						.find('li').keydown( function(e) {
							var $el      = $(this),
								$prevTab = $el.prev().find('a'),
								$nextTab = $el.next().find('a');

							switch( e.which ) {
								case 37:
								case 38:		
									$prevTab.length && $prevTab.trigger('click').focus();
									e.preventDefault();
									break;
								case 39: 
								case 40:
									$nextTab.length && $nextTab.trigger('click').focus();
									e.preventDefault();
									break;
							}
						})
						.find('a').click( function(e) {
							var $el = $(this);
							
							if( $el.attr('aria-selected') == 'false' ) { 
								var current = $el.parent().index(),
									move    = -( 100 * ( current ) ),
									$slider = $oEl.find( opt.slider );

								$slider.trigger( 'rcarouselmove', { moveTo: move });
							}
							e.preventDefault();
						});
				});
			},
			roundDown : function(oVal) {
				var val = parseInt(oVal, 10);

				return Math.ceil( (val - (val % 100 ) ) / 100) * 100;
			},
			navState : function(e, ui) {
				var $el          = $(this),
					$slides      = $el.find(opt.slide),
					ind          = -(ui.current / 100),
					$activeSlide = $slides.eq(ind);
								
				$el.attr('aria-activedescendant', $activeSlide[0].id);

				// Update state of active tabpanel:
				$activeSlide
					.addClass( opt.namespace + "-active-slide" )
					.attr( 'aria-hidden', false )
					.siblings()	
						.removeClass( opt.namespace + "-active-slide" )
						.attr( 'aria-hidden', true );
						
				// Update state of next/prev navigation:
				if( ( !!opt.prevSlide || !!opt.nextSlide ) ) {
					var $target = $('[href*="#' + this.id + '"]');
					
					$target.removeClass( opt.namespace + '-disabled' );

					if( ind == 0 ) {
						$target.filter(opt.prevSlide).addClass( opt.namespace + '-disabled' );
					} else if( ind == $slides.length - 1 ) {
						$target.filter(opt.nextSlide).addClass( opt.namespace + '-disabled' );
					}
				}
								
				// Update state of pagination tabs:
				if( !!opt.addPagination ) {
					var tabId = $activeSlide.attr('aria-labelledby'),
						$tab  = $('#' + tabId );
					
					$tab
						.parent()
						.addClass(opt.namespace + '-active-tab active')
						.siblings()
						.removeClass(opt.namespace + '-active-tab active')
						.find('a')
							.attr({
								'aria-selected' : false,
								'tabindex' : -1
							});
							
					$tab.attr({
						'aria-selected' : true,
						'tabindex' : 0
					});
				}
			},
			move : function(e, ui) {
				var $el = $(this);

				$el
					.trigger(opt.namespace + "-beforemove")
					.trigger("navstate", { current: ui.moveTo })
					.trigger('loadimages');
				
				if( $el.transitionSupport() ) {

					$el
						.adjRounding( opt.slide ) /* Accounts for browser rounding errors. Lookin’ at you, iOS Safari. */
						.css('marginLeft', ui.moveTo + "%")
						.one("transitionend webkitTransitionEnd OTransitionEnd", function() {
							//if (opt.autoHeight) {
							//	
							//	$el.css('height', $el.find(opt.slide).eq(-(ui.moveTo/100)). );
							//}
							$(this).trigger( opt.namespace + "-aftermove" );
						});
						
				} else {					
					$el
						.adjRounding( opt.slide )
						.animate({ marginLeft: ui.moveTo + "%" }, { duration : opt.speed, queue : false }, function() {
							$(this).trigger( opt.namespace + "-aftermove" );
						});
				}
			},
			nextPrev : function(e, ui) {				
				var $el = $(this),
					left = ( $el ) ? $el.getPercentage() : 0,
					$slide = $el.find(opt.slide),
					constrain = ui.dir === 'prev' ? left != 0 : -left < ($slide.length - 1) * 100,
					maxLeft = -($slide.length - 1) * 100;
					$target = $( '[href="#' + this.id + '"]');

				if (!$el.is(":animated") && constrain ) {

					if ( ui.dir === 'prev' ) {
						left = ( left % 100 != 0 ) ? rcarousel.roundDown(left) : left + 100;
					} else {
						left = ( ( left % 100 ) != 0 ) ? rcarousel.roundDown(left) - 100 : left - 100;
					}

					$el.trigger('rcarouselmove', { moveTo: left });

					$target
						.removeClass( opt.namespace + '-disabled')
						.removeAttr('aria-disabled');

					switch( left ) {
						case (maxLeft):
							$target.filter(opt.nextSlide)
								.addClass( opt.namespace + '-disabled')
								.attr('aria-disabled', true);
							break;
						case 0:
							$target.filter(opt.prevSlide)
								.addClass( opt.namespace + '-disabled')
								.attr('aria-disabled', true);
							break;
					}
				} else {
					var reset = (opt.rotate && ui.dir === 'next') ? 0 : ((opt.rotate && ui.dir === 'prev') ? maxLeft : rcarousel.roundDown(left));

					$el.trigger('rcarouselmove', { moveTo: reset });
				}

			}
		};
	
		rcarousel.init(this);

		$(opt.nextSlide + ',' + opt.prevSlide)
			.bind('click', function(e) {				
				var $el = $(this),
					link = this.hash,
					dir = ( $el.is(opt.prevSlide) ) ? 'prev' : 'next',
					$slider = $(link);

					if ( $el.is('.' + opt.namespace + '-disabled') ) { 
						return false;
					}

					$slider.trigger('nextprev', { dir: dir });
				
				e.preventDefault();
			})
			.bind('keydown', function(e) {
				var link = this.hash;

				switch (e.which) {
					case 37:
					case 38:
						$('#' + link).trigger('nextprev', { dir: 'next' });
						e.preventDefault();
						break;
					case 39:
					case 40:
						$('#' + link).trigger('nextprev', { dir: 'prev' });
						e.preventDefault();
						break;
				}
			});

		var setup = {
			wrap : this,
			slider : opt.slider
		};
		$slidewrap.bind( "dragSnap", setup, function(e, ui){
			var $slider = $(this).find( opt.slider ),
				dir = ( ui.direction === "left" ) ? 'next' : 'prev';
			
			$slider.trigger("nextprev", { dir: dir });	
		});


		$slidewrap.each(function () {
			var auto,
				$el         = $(this),
				speed       = parseInt(opt.autoRotate, 10) > parseInt(opt.speed) ? parseInt(opt.autoRotate, 10) : 5000,
				slidenum    = $el.find(opt.slide).length,
				$slider     = $el.find(opt.slider),
				autoAdvanceNext = function () {
					clearInterval(auto);

					auto = setInterval(function () {
						autoAdvance();
						$slider.trigger("nextprev", { dir: 'next' });
					}, speed);
				},
				autoAdvance = function() {
					if (opt.rotate) {
						autoAdvanceNext();
					}
					else {
						var active   = -( $(opt.slider).getPercentage() / 100 ) + 1;

						switch( active ) {
							case slidenum: 
								clearInterval(auto);

								auto = setInterval(function() {
									autoAdvance();
									$slider.trigger("nextprev", { dir: 'prev' });	
								}, speed);

								break;
							default:
								autoAdvanceNext();
								break;
							}
						}
				};

				if (opt.autoRotate == false) {
					return;
				}

			auto = setInterval(autoAdvance, speed);

			$el
				.attr('aria-live', 'polite')
				.bind('mouseenter click touchstart', function() {
					clearInterval(auto);
				});

			$el
				.attr('aria-live', 'polite')
				.bind('mouseleave', function () {
					auto = setInterval(autoAdvance, speed);
				});
		});

		return this;
	};
})(jQuery);


$.event.special.dragSnap = {
	setup: function(setup) {

		var $el = $(this),
			transitionSwap = function($el, tog) {
				var speed = .3,
					transition = ( tog ) ? "all " + speed + "s ease" : 'none';

				$el.css({
					"-webkit-transition" : transition,
					"-moz-transition"    : transition,
					"-ms-transition"     : transition,
					"-o-transition"      : transition,
					"transition"         : transition
				});
			},
			roundDown = function(left) {
				var left = parseInt(left, 10);
				
				return Math.ceil( (left - (left % 100 ) ) / 100) * 100;
			},
			snapBack = function(e, ui) {
				var $el = ui.target,
					currentPos = ( $el.attr('style') != undefined ) ? $el.getPercentage() : 0,
					left = (ui.left === false) ? roundDown(currentPos) - 100 : roundDown(currentPos);

				transitionSwap($el, true);

				if( $el.transitionSupport() ) {
					$el.css('marginLeft', left + "%");
				} else {
					$el.animate({ marginLeft: left + "%" }, opt.speed);
				}
			};

		$el
			.bind("snapback", snapBack)
			.bind("touchstart", function(e) {
				var data = e.originalEvent.touches ? e.originalEvent.touches[0] : e,
					start = {
						time: ( (new Date).getTime() ),
						coords: [ data.pageX, data.pageY ],
						origin: $(e.target).closest( setup.wrap ),
						interacting: false
					},
					stop,
					$tEl = $(e.target).closest( setup.slider ),
					currentPos = ( $tEl.attr('style') != undefined ) ? $tEl.getPercentage() : 0;
				
				transitionSwap($tEl, false);

				function moveHandler(e) {
					var data = e.originalEvent.touches ? e.originalEvent.touches[0] : e;
						stop = {
							time: (new Date()).getTime(),
							coords: [ data.pageX, data.pageY ]
						},
						deltaX = Math.abs( start.coords[0] - data.pageX ),
						deltaY = Math.abs( start.coords[1] - data.pageY ),
						left = (currentPos + (((stop.coords[0] - start.coords[0]) / start.origin.width()) * 100));

					if( !start || deltaX < 15 || currentPos <= 0 && left > 0 ) {
						return;
					}

					$tEl.trigger('loadimages');

					// prevent scrolling
					if ( deltaX >= 15 ) {
						start.interacting = true;
						$tEl.css({"margin-left": left + '%' });
						e.preventDefault();
					} else {
						return;
					}
				};

				$el
					.bind("gesturestart", function(e) {
						$el
							.unbind("touchmove", moveHandler)
							.unbind("touchend", moveHandler);
					})
					.bind("touchmove", moveHandler)
					.one("touchend", function(e) {
						$el.unbind("touchmove", moveHandler);

						transitionSwap($tEl, true);

					if (start && stop ) {
					    var deltaX = Math.abs(start.coords[0] - stop.coords[0]),
							deltaY = Math.abs(start.coords[1] - stop.coords[1]),
							left = start.coords[0] > stop.coords[0],
							jumppoint;

							if( deltaX > 20 && ( deltaX > deltaY ) ) {
								e.preventDefault();
							} else {
								if( start.interacting ) {
									$el.trigger('snapback', { target: $tEl, left: left });
								}
								return;
							}

							jumppoint = start.origin.width() / 4;

							if( -deltaX > jumppoint || deltaX > jumppoint ) {
								start.origin.trigger("dragSnap", {direction: left ? "left" : "right"});
							} else {
								$el.trigger('snapback', { target: $tEl, left: left });
							}
					}
					start = stop = undefined;
				});
		});
	}
};