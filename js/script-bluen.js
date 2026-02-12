var ww,wh,ws;

var pageNavHover = false;
var pageNavClick = false;
var _orientation = 2;
var hrefClick = false;

var googleMapConnected = false;

var pushStateTo;
var subscribeTo;

var animateLogoTimer;
var animLogoTO_1, animLogoTO_2, animLogoTO_3;

function googleMapDisconnect() {
	// Fallback when map scripts are blocked/unavailable.
}

function www_update_state(href) {
	if (!href || href === '#') return;
	try {
		if (window.history && window.history.replaceState) {
			window.history.replaceState(null, '', href);
		}
	} catch (e) {
		// no-op
	}
}

function www_update_header_title(title) {
	if (!title) return;
	document.title = title;
}

function us() {
	ww = $(window).width();
	wh = $(window).height();
	ws = $(window).scrollTop();
}
function checkResize(){
	us();
	nav_logo();
	stick_page_left();
	isInViewport();
	stick_pdt_info();
	on_scroll();
	map_all_btn();
	nav_to_left();
	var activePageNo = $('.page-nav__no.this-active').attr('data-id');
	if (activePageNo !== undefined) {
		handle_page_nav_circle(activePageNo);
	}
	nav_home();
	nav_responsive();
	nav_blog();
	nav_mouse();
	getEventH();
}

function refresh() {
	$('.js-btn').trigger('mouseleave');
	checkResize();
	handle_mouse_hover();
	handle_quantity_add_sub();
	handle_page_nav();
	handle_page_nav_no();
	handle_page_nav_filter();
	animateBtnSVG();
	scroll_btn();
	list_click();
	pdt_list_click();
	pdt_img_slick();
	cb_click();
	mobile_nav();
	nav_to_left();
	nav_home_mobile();
	dropdown_btn();
	shop_alert();
	shop_cust_select2();
	eventCollapse();
}

$(function(){
	//Add hashover class to body when document ready
	$('body').addClass('hashover');

	$(document).on('click', 'a[aria-disabled="true"]', function(e) {
		e.preventDefault();
	});

	$(document).on('click', '.nav-logo__a', function(e) {
		us();
		if (ww < 992 && !$('.nav-wrapper').hasClass('this-active')) {
			e.preventDefault();
			e.stopPropagation();
		}
	});

	window.addEventListener('touchstart', function() {
	  $('body').removeClass('hashover');
		$('#mouse').addClass('this-mobile');
	});

	googleMapConnected = $('#locations-map').length > 0;

	setTimeout(function() {
		if(!googleMapConnected) {
			googleMapDisconnect();
		}
	}, 1000);

	$(window).resize(checkResize);
	// $(window).resize(nav_responsive);
	refresh();

	// handle auto change section
	var checkCurrentSection = $('.page-section.this-current');
	setTimeout(function() {
		changeCurrentSection(checkCurrentSection);
	}, 100);


	//handle mouse move
	$(window).mousemove(function(event){
		if ( $('body').hasClass('hashover') ) {
			us();
			var $mouse = $('#mouse');
			$mouse.css({
				left: event.pageX - $mouse.outerWidth()/2,
				top: event.pageY - $mouse.outerHeight()/2 - ws
			});
		}
	});

	//handle logo animation
	// $('#dynamic-logo .wrapper').attr('orientation','as-o');
	if ( $('.nav-wrapper').hasClass('this-active') ) {
	} else if ( $('#rotating-intro').length == 0 ) {
		clearLogoInterval();
		setupLogoInterval();
	}

	//handle mouse hovering on modals
	if ( $('body').hasClass('hashover') ) {
		$('.modal-content').mouseenter(function() {
			$('#mouse').removeClass('cross');
		});
		$('.modal-content').mouseleave(function() {
			$('#mouse').addClass('cross');
		});
		$('.modal').mouseenter(function() {
		  $('#mouse').addClass('cross');
		});
		$('.modal').mouseleave(function() {
			$('#mouse').removeClass('cross');
		});
	}


	// top btn
	$('.top-btn').click(function() {
		$('html, body').animate({
			scrollTop: 0
		}, 800);
	});

	// language and currency options
	$('.lc-modal__option').click(function() {
		$(this).parent().find('.lc-modal__option').removeClass('this-selected');
		$(this).addClass('this-selected');
	});

	// var centerPos = $('.center-marker').offset().top - $('.nav-logo').offset().top - $('.nav-logo').outerHeight()/2;
	// $('.nav-logo').css({'transform': 'translateX(-50%) translateY(' + centerPos + 'px)'});

	//blog toggle btn
	$('.toggle-btn__item').click(function() {
		$('.toggle-btn__item').removeClass('this-active');
		$(this).addClass('this-active');
	});

});

function animateBtnSVG() {
	if (typeof Snap === 'undefined' || typeof mina === 'undefined') return;
	var speed = 600,
		easing = mina.easeinout;

	[].slice.call ( document.querySelectorAll( '.js-svg-btn' ) ).forEach( function( el ) {
		var s = Snap( el.querySelector( 'svg' ) ), path = s.select( 'path' ),
			pathConfig = {
				from : path.attr( 'd' ),
				to : el.getAttribute( 'data-path-hover' )
			};

		el.addEventListener( 'mouseenter', function() {
			path.animate( { 'path' : pathConfig.to }, speed, easing );
		} );

		el.addEventListener( 'mouseleave', function() {
			path.animate( { 'path' : pathConfig.from }, speed, easing );
		} );
	} );
}

function stick_page_left() {
	if ($('.js-page-left').length > 0 && ww >= 992) {
		setTimeout(function(){
			var triggerPos = $('.js-page-right').outerHeight() - wh;
			var triggerBgPos = $('.js-page-right').outerHeight() - wh/2;
			$('.js-page-left').toggleClass('unstick', ws >= triggerPos);
			$(window).on('scroll', function(){
				$('.js-page-left').toggleClass('unstick', ws >= triggerPos && $('.js-page-left').length > 0 && ww > 768);
				$('.breadcrumb:not(.breadcrumb--shop)').toggleClass('grad', ws >= triggerPos && $('.js-page-left').length > 0 && ww > 768);
			});
		}, 100);
	}
}

function isInViewport() {
	$('.js-reveal:not(.reveal)').each(function(){
		var elementTop = $(this).offset().top;
		var viewportBottom = ws + wh;
		if (ww >= 992) {
			var triggerPos = viewportBottom - wh*0.1;
		} else {
			var triggerPos = viewportBottom - 40;
		}
		if ( elementTop < triggerPos) {
			$(this).addClass('reveal');
		}
	});
}

function handle_page_nav() {
	$('.js-section').unbind();
	if ($('.js-section').length > 0 && ww >= 992) {
		$('.js-section').each(function(){
				var triggerPos = $(this).offset().top + wh*0.28 - wh*0.85;
				var sectionIndex = $(this).attr('data-id');
				if ( $(this).hasClass('page-section--full') ) {
					var lastIndex = $(this).attr('data-id');
				}
				$(window).on('scroll', function(){
					var activeMediaIndex = $('.page-left__media.this-active').attr('data-id');

					if (ws >= triggerPos && pageNavHover == false && pageNavClick == false) {

						var data_href = $('.js-section[data-id="'+sectionIndex+'"]').attr('data-href');
						var data_headerTitle = $('.js-section[data-id="'+sectionIndex+'"]').attr('data-headerTitle');
						clearTimeout(pushStateTo);
						pushStateTo = setTimeout(function() {
							www_update_state(data_href);
							if(data_headerTitle) {
								www_update_header_title(data_headerTitle);
							}
						}, 150);

						deactivate_activate('js-section',sectionIndex);
						deactivate_activate('page-nav__no',sectionIndex);
						deactivate_activate('page-nav__lbl',sectionIndex);
						$('.page-nav__lbl').css({opacity: '0'});
						$('.page-nav__lbl.this-active').css({opacity: '1'});
						handle_page_nav_circle(sectionIndex);
					}
					if (ws >= triggerPos && sectionIndex != lastIndex && sectionIndex != activeMediaIndex) {
						deactivate_activate('page-left__media',sectionIndex);
					}
				});
		});
	} else if (ww < 992) {
		$('.js-section').each(function(){
				var triggerPos = $(this).offset().top - 58;
				var sectionIndex = $(this).attr('data-id');
				$(window).on('scroll', function(){
					if (ws >= triggerPos) {
						$('.m-page-nav__select:not(.m-page-filter)').val(sectionIndex);
					}
				});
		});
	}
}

function handle_page_nav_no() {
	//handle page nav hover
	$('.page-nav__no').unbind();

	$('.page-nav__no').mouseenter(function() {
		if ( $('body').hasClass('hashover') ) {
			$('#mouse').addClass('no');
			pageNavHover = true;
			var circleMoveIndex = $(this).attr('data-id');
			handle_page_nav_circle(circleMoveIndex);
			$('.page-nav__no').css({opacity: '0.2'});
			$(this).css({opacity: '1'});
			$('.page-nav__lbl').css({opacity: '0'});
			$('.page-nav__lbl[data-id="' + circleMoveIndex + '"]').css({opacity: '1'});
		}
	});

	$('.page-nav__no').mouseleave(function() {
		pageNavHover = false;
		$('#mouse').removeClass('no');
		var circleActiveIndex = $('.page-nav__no.this-active').attr('data-id');
		handle_page_nav_circle(circleActiveIndex);
		$('.page-nav__no').css({opacity: '1'});
		$('.page-nav__lbl').css({opacity: '0'});
		$('.page-nav__lbl.this-active').css({opacity: '1'});
	});

	//handle page nav click function {
	$('.page-nav__no').click(function() {
		pageNavClick = true;
		var sectionIndex = $(this).attr('data-id');
		var targetTop = $('.js-section[data-id="' + sectionIndex + '"]').offset().top;

		var data_href = $('.js-section[data-id="'+sectionIndex+'"]').attr('data-href');
		var data_headerTitle = $('.js-section[data-id="'+sectionIndex+'"]').attr('data-headerTitle');
		clearTimeout(pushStateTo);
		pushStateTo = setTimeout(function() {
			www_update_state(data_href);
			if(data_headerTitle) {
		    www_update_header_title(data_headerTitle);
		  }
		}, 150);

		deactivate_activate('page-nav__no',sectionIndex);
		deactivate_activate('page-nav__lbl',sectionIndex);
		$('html, body').animate({
			scrollTop: targetTop
		}, 800);
		setTimeout(function(){
			pageNavClick = false;
			handle_page_nav_circle(sectionIndex);
		}, 800);
	});
}

function handle_page_nav_filter() {
	//handle page filter
	$('.page-filter__item:not(.loc-tab)').unbind();
	$('.page-filter__item').mouseenter(function() {
		if ( $('body').hasClass('hashover')) {
			$('#mouse').addClass('no');
			$('.page-filter__item').css({opacity: '0.2'});
			$(this).css({opacity: '1'});
		}
	});
	$('.page-filter__item').mouseleave(function() {
		if ( $('body').hasClass('hashover')) {
			$('#mouse').removeClass('no');
			$('.page-filter__item').css({opacity: '1'});
		}
	});
	$('.page-filter__item').click(function() {
		$('.page-filter__item').removeClass('this-active');
		$(this).addClass('this-active');

		var data_filter = $(this).attr('data-filter');
		if(data_filter) {
			$('html, body').animate({
				scrollTop: 0
			}, 400);
			$('.full-wrapper--pdt').fadeOut();
			setTimeout(function(){
				get_product_by_cat(data_filter);
			}, 400);

		}

		var data_href = $(this).attr('data-href');
		var data_headerTitle = $(this).attr('data-headerTitle');
		if(data_href) {
			www_update_state(data_href);
		}
		if(data_headerTitle) {
	    www_update_header_title(data_headerTitle);
	  }
	});

	$('.m-page-filter').on('change', function(){
		var data_filter = $(this).val();
		if(data_filter) {
			$('html, body').animate({
				scrollTop: 0
			}, 400);
			$('.full-wrapper--pdt').fadeOut();
			setTimeout(function(){
				get_product_by_cat(data_filter);
			}, 400);
		}
	});

}

function handle_eqmt_img() {
	if ($('.eqmt-img').length > 0 && ww >= 992) {
		$(window).on('scroll', function(){
			setTimeout(function(){
				if ( $('.eqmt-list').parent('.js-section').hasClass('this-active') ) {
				} else {
					$('.eqmt-img').removeClass('this-active');
				}
			}, 1000);

		});
	}
}

function handle_page_nav_circle(indexNo) {
	if (ww >= 1200) {
		var circlePos = indexNo  * 48.25 + 40;
	} else {
		var circlePos = indexNo  * 47 + 30;
	}

	$('.page-nav__circle').css({left: circlePos});
}

function deactivate_activate(item, indexNo) {
	$('.' + item + '.this-active').removeClass('this-active');
	$('.' + item + '[data-id="' + indexNo + '"]').addClass('this-active');
}

function stick_pdt_info() {
	if ($('.single-pdt').length > 0 && ww >= 992) {
		setTimeout(function(){
			var pdtInfoHeight = $('.single-pdt').outerHeight();
			var pdtImgHeight = $('.pdt-img').outerHeight();
			var unstickPos = pdtImgHeight - wh + 40;
			if ($('.single-pdt').hasClass('--bean')) {
				var stickBtmPos = pdtInfoHeight - wh + 40;
			} else {
				var stickBtmPos = pdtInfoHeight - wh + 100;
			}
			$(window).on('scroll', function(){
				//console.log(unstickPos);
				$('.single-pdt').toggleClass('stick', pdtInfoHeight < pdtImgHeight && pdtInfoHeight <= wh-60 && ws < unstickPos && ww >= 992);
				$('.single-pdt').toggleClass('stick-btm', pdtInfoHeight < pdtImgHeight && pdtInfoHeight > wh-60 && ws >= stickBtmPos && ww >= 992);
				$('.single-pdt').toggleClass('unstick', unstickPos > 0 && ws >= unstickPos && ww >= 992);
			});
		}, 400);
	} else if ($('.single-pdt').length > 0 && ww < 992) {
		$('.single-pdt').removeClass('stick');
		$('.single-pdt').removeClass('stick-btm');
		$('.single-pdt').removeClass('unstick');
	}
}

function handle_mouse_hover() {
	if ( $('body').hasClass('hashover') ) {
		$('.js-btn, .sg-blog__content a').mouseenter(function() {
			$('#mouse').addClass('click');
		});
		$('.js-btn, .sg-blog__content a').mouseleave(function() {
			$('#mouse').removeClass('click');
		});
	}
}


//handle quantity add sub
function handle_quantity_add_sub() {
	$('.qty-wrapper__add').click(function () {
		if ($(this).prev().val() < 100) {
    	$(this).prev().val(+$(this).prev().val() + 1).change();
			$('button[name="update_cart"]').prop('disabled', false);
		}
	});
	$('.qty-wrapper__sub').click(function () {
		if ($(this).next().val() > 1) {
    	$(this).next().val(+$(this).next().val() - 1).change();
			$('button[name="update_cart"]').prop('disabled', false);
		}
	});

}

function nav_logo() {
	//handle menu
	var currentPos;
	var topD;
	// const targetElement = document.querySelector("#nav-wrapper");

	$('.nav-wrapper').off('click.nav_logo').on('click.nav_logo', function() {
		if ( ww >= 992 && hrefClick == false ) {
			$('.nav-cart-btn').removeClass('this-active');
			currentPos = $(window).scrollTop();
			$('#mouse').removeClass('nav');
			clearLogoInterval();
			$('#dynamic-logo .wrapper').attr('orientation','as-o');
			$('.nav-wrapper').addClass('this-active');
			$('.nav-logo').addClass('this-active');
			// $('.nav-logo').css({'transform': 'translateX(-50%)'});
		}
	});
	$('.nav-logo').off('click.nav_logo').on('click.nav_logo', function() {
		if ( ww < 992 ) {
			$('.nav-wrapper').addClass('this-active');
			$(this).addClass('this-active');
			$('body').addClass('nav-open');
			clearLogoInterval();
			$(this).css({'transform': 'translateX(-50%)'});
		}
	});
	$(window).off('scroll.nav_logo').on('scroll.nav_logo', function(){
		if ( ww >= 992 && currentPos != undefined && Math.abs($(window).scrollTop() - currentPos) > wh*.35) {
			$('.nav-wrapper').removeClass('this-active');
			$('.nav-logo').removeClass('this-active');
			clearLogoInterval();
			setupLogoInterval();
			currentPos = undefined;
		}
	});
	$('.nav .nav__item').off('mouseenter.nav_logo').on('mouseenter.nav_logo', function() {
		if ( ww >= 992 && $('body').hasClass('hashover') && $('.nav-wrapper').hasClass('center')) {
			var hoverIndex = $(this).attr('data-id');
			var thisPos = $(this).offset().top - ws + $(this).outerHeight()/2 - $('.nav-hover__text-item[data-id="' + hoverIndex + '"]').outerHeight()/2 - 2;
			$('.nav-hover').addClass('this-active');
			$('.nav-hover__img-item[data-id="' + hoverIndex + '"]').addClass('this-active');
			$('.nav-hover__text-item[data-id="' + hoverIndex + '"]').addClass('this-active');
			$('.nav-hover__text-item[data-id="' + hoverIndex + '"]').css({top: thisPos});
		}
		$('.nav .nav__item').css({opacity: '0.2'});
		$(this).css({opacity: '1'});
	});
	$('.nav .nav__item').off('mouseleave.nav_logo').on('mouseleave.nav_logo', function() {
		$('.nav-hover__img-item').removeClass('this-active');
		$('.nav-hover__text-item').removeClass('this-active');
		$('.nav .nav__item').css({opacity: '1'});
		$('.nav-hover').removeClass('this-active');
	});
	$('.nav-close').off('click.nav_logo').on('click.nav_logo', function() {
		$('.nav-wrapper').removeClass('this-active');
		$('.nav-logo').removeClass('this-active');
		$('body').removeClass('nav-open');
		clearLogoInterval();
		setupLogoInterval();
		$('.nav-logo').css({'transform': 'translateX(-50%)'});
		topD = undefined;
	});

}

function nav_responsive() {
	if (ww >= 992 && $('.home-vid').length == 0) {
		$('.nav-logo').css({'transform': 'translateX(-50%) translateY(-50%)'});
	} else if (ww < 992 && $('.home-vid').length == 0) {
		$('.nav-close').click();
		$('.nav-logo').css({'transform': 'translateX(-50%)'});
	}
}

function nav_blog() {
	if (ww >= 992 && $('.nav-logo').hasClass('left')) {
		$('.nav-logo').css({'transform': 'translateY(-50%)'});
	}
}

function nav_home() {
	if (ww >= 992 && $('.home-vid').length > 0) {
	  clearLogoInterval();
	  $('.nav-logo').addClass('this-active');
	  $('.nav-wrapper').addClass('this-active');
	}
	else if (ww < 992 && $('.home-vid').length > 0) {
		$('.nav-close').click();
	}
}

function nav_home_mobile() {
	if (ww < 992 && $('.home-vid').length > 0) {
		setTimeout(function(){
			triggerLogoAnimation();
		}, 1000);

	}
}

function nav_mouse() {
	//handle mouse hovering on menu
	if (ww >= 992) {
		$('.nav-wrapper').mouseenter(function() {
			if ( $(this).hasClass('this-active') ) {
			} else {
				$('#mouse').addClass('nav');
			}
		});
		$('.nav-wrapper').mouseleave(function() {
		  $('#mouse').removeClass('nav');
		});
		$('.nav-wrapper__logo, .nav-cart-btn').mouseenter(function() {
			$('#mouse').removeClass('nav');
		});
		$('.nav-wrapper__logo, .nav-cart-btn').mouseleave(function() {
			if ( $('.nav-wrapper').hasClass('this-active') ) {
			} else {
				$('#mouse').addClass('nav');
			}
		});
	}
}

function changeCurrentSection(section) {
	$('html, body').animate({
		scrollTop: 0
	}, 0);

	if(section.length > 0) {
		var sectionIndex = section.attr('data-id');
		if(section.hasClass('js-section')) {
			$('.page-nav__no[data-id="'+sectionIndex+'"]').trigger('click');
		}

		if(section.hasClass('loc-section')) {
			$('.loc-tab[data-id="'+sectionIndex+'"]').trigger('click');
		}

	}
}

function scroll_btn() {
	$('.scroll-btn').click(function() {
		var distance = $('.page-section[data-id="0"]').outerHeight();
		$('html, body').animate({
			scrollTop: distance
		}, 800);
	});
}

function on_scroll() {
	$(window).on('scroll', function() {
		us();
		isInViewport();
		$('.breadcrumb:not(.breadcrumb--shop)').toggleClass('grad', ww <= 768 && ws >= ww);
		$('.scroll-btn').toggleClass('this-hide', ww >= 992 && ws >= wh*0.35);
	});
}

function mobile_nav() {
	// var triggerAction = 'blur';
	// if ($('body').hasClass('hashover')) {
	// 	triggerAction = 'change';
	// }

	$('.m-page-nav__select:not(.m-page-filter):not(.ec)').change(function() {
		var targetTop = $('.page-section[data-id="' + $(this).val() + '"]').offset().top - 45;
		$('html, body').animate({
			scrollTop: targetTop
		}, 800);
	});
	$('.m-page-nav__select.ec').change(function() {
		linkLocation = $(this).val();
    setTimeout(function() {
    	window.location = linkLocation;
    }, 400);
	});
}

function list_click() {
	// $('.list__trigger:not(.eqmt-list__trigger)').click(function() {
	$('.list__trigger').click(function() {
		if ($(this).hasClass('this-active')) {
			$(this).siblings('.list__content').slideUp(500);
			$(this).removeClass('this-active');
		} else {
			$('.list__trigger.this-active').siblings('.list__content').slideUp(500);
			$(this).siblings('.list__content').slideDown(500);
			$('.list__trigger.this-active').removeClass('this-active');
			$(this).addClass('this-active');
		}
	});
}

function eqmt_list_click() {
	$('.eqmt-list__trigger').click(function() {
		var thisIndex = $(this).attr('data-id');
		if ($(this).hasClass('this-active')) {
			$(this).siblings('.list__content').slideUp(500);
			$(this).removeClass('this-active');
			$('.eqmt-img.this-active').removeClass('this-active');
		} else {
			$('.list__trigger.this-active').siblings('.list__content').slideUp(500);
			$(this).siblings('.list__content').slideDown(500);
			$('.list__trigger.this-active').removeClass('this-active');
			$(this).addClass('this-active');
			deactivate_activate('eqmt-img',thisIndex);
			setTimeout(function(){
				handle_page_nav();
			}, 500);
		}
	});
}

function pdt_list_click() {
	$('.single-pdt-list__trigger').click(function() {
		stick_pdt_info();
	});
}

function pdt_img_slick() {
	if($('.m-pdt-img').hasClass('auto')){
		$('.m-pdt-img').slick({
		  dots: true,
			arrows: true,
		  infinite: true,
			autoplay:true,
		  autoplaySpeed:3000,
		  slidesToShow: 1
		});
	}else{
		$('.m-pdt-img').slick({
		  dots: true,
			arrows: true,
		  infinite: false,
		  speed: 500,
		  slidesToShow: 1
		});
	}
}

function cb_click() {
	var $cb;
	$('.cb-lbl').click(function() {
		$cb = $(this).siblings('input[type=checkbox]');
		if ( $cb.is(':checked') ) {
			$cb.prop('checked',false);
			$cb = undefined;
		} else {
			$cb.prop('checked',true);
			$cb = undefined;
		}
	});
}

function map_all_btn() {
	if (ww >= 1200) {
		var btnPos = ww * 0.425 - 40 - $('.map-btn').outerWidth();
		$('.map-btn').css({left: btnPos});
	} else if (ww >= 992) {
		var btnPos = ww * 0.425 - 30 - $('.map-btn').outerWidth();
		$('.map-btn').css({left: btnPos});
	} else if (ww >= 768) {
		$('.map-btn').css({left: 'auto', right: 30});
	} else {
		$('.map-btn').css({left: 'auto', right: 15});
	}
}



function setupLogoInterval(){
	setTimeout(function(){
		triggerLogoAnimation();
		animateLogoTimer = setInterval(triggerLogoAnimation, 6600);
	},1000);
}
function clearLogoInterval(){
	clearInterval(animateLogoTimer);
	clearTimeout(animLogoTO_1);
	clearTimeout(animLogoTO_2);
	clearTimeout(animLogoTO_3);
	$('#dynamic-logo .wrapper').attr('orientation','as-o');
}
function triggerLogoAnimation(){
	$('#dynamic-logo .wrapper').attr('orientation','as-n');
	animLogoTO_1 = setTimeout(function(){
		$('#dynamic-logo .wrapper').attr('orientation','as-o');
	},2200);
	animLogoTO_2 = setTimeout(function(){
		$('#dynamic-logo .wrapper').attr('orientation','as-c');
	},4400);
	// animLogoTO_3 = setTimeout(function(){
	// 	$('#dynamic-logo .wrapper').attr('orientation','as-o');
	// },4200);
}

function nav_to_left() {
	// $('body').removeClass('nav-to-left');
	$('.nav-wrapper').addClass('center');
	us();
  if (ww >= 992 && $('body').hasClass('nav-to-left')) {
    $('.nav-logo').addClass('left');
    $('.nav-wrapper').removeClass('center');
    $('.nav-wrapper').addClass('left');
  } else {
		$('.nav-logo').removeClass('left');
    $('.nav-wrapper').addClass('center');
    $('.nav-wrapper').removeClass('left');
	}
}

function dropdown_btn() {
	$('.btn-dropdown').click(function() {
		$(this).toggleClass('this-active');
		$(this).siblings('.btn-dropdown__list').toggleClass('this-active');
	});
}

function shop_alert() {
	$('.shop-alert__close').click(function() {
		$('.shop-alert').fadeOut(300);
	});
}

function shop_cust_select2(){
	$('.select2_multiple').each(function(){
		let $select = $(this);
		$select.select2({
			maximumSelectionLength: $select.attr('data-max'),
			language: 'zh-TW'
		});
	});
}

function getEventH() {
	$('.event .collapse-wrapper').each(function(){
		let maxH = $(this).outerHeight(true);
		let h = $(this).find('.content').outerHeight(true);
		//console.log(h);
		if(!$(this).hasClass('opened')) {
			if(h > maxH) {
				$(this).parent('.event').addClass('more');
			}else {
				$(this).parent('.event').removeClass('more');
			}
		}else {
			$(this).css('max-height',h);
		}
	})
}

function eventCollapse() {
	let lbl_more = $('.event .read-more').data('lbl-more');
	let lbl_less = $('.event .read-more').data('lbl-less');
	$('.event .read-more').click(function(){
		let maxH = 390;
		let h = $(this).siblings('.content').outerHeight(true);
		let $collapse = $(this).parent('.collapse-wrapper');
		$collapse.addClass('opened');
		$collapse.css('max-height',h);
		$(this).toggleClass('clicked');
		$(this).find('span').first().text(lbl_less);
		if($collapse.outerHeight(true) == h) {
			console.log('folded');
			$collapse.css('max-height',maxH);
			$(this).find('span').first().text(lbl_more);
			$collapse.removeClass('opened');
		}
	})
}

// function wc_redirect() {
// 	if ($('body').hasClass('ecommerce')) {
//
// 	}
// 	$('.global-container').css({'opacity': '1'});
// 	setTimeout(function() {
// 		$('.page, .footer').css({'opacity': '1'});
// 		isInViewport();
// 		init_marquee();
// 	}, 300);
//
// 	$('body.ecommerce a').click(function(e){
//     e.preventDefault();
//     linkLocation = this.href;
// 		$('.page').css({'opacity': '0'});
// 		$('.body').removeClass('ecommerce').removeClass('nav-to-left');
// 		$('.nav-logo, .nav-wrapper').removeClass('left');
//     setTimeout(function() {
//     	window.location = linkLocation;
//     }, 1000);
//   });
// }
