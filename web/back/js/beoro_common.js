/* [ ---- Beoro Admin - common functions ---- ] */

//* avoid 'console' errors in browsers that lack a console
if (!(window.console && console.log)) {
    (function () {
        var noop = function () {
        };
        var methods = ['assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error', 'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log', 'markTimeline', 'profile', 'profileEnd', 'markTimeline', 'table', 'time', 'timeEnd', 'timeStamp', 'trace', 'warn'];
        var length = methods.length;
        var console = window.console = {};
        while (length--) {
            console[methods[length]] = noop;
        }
    }());
}

//* detect touch devices 
function is_touch_device() {
    return !!('ontouchstart' in window);
}

$(document).ready(function () {
    // powertip tooltips
    beoro_tooltips.p_ttip();

    // popovers
    beoro_popover.init();

    //* mobile navigation
    selectnav('mobile-nav', {indent: '-'});

    //* show/hide functionality for widget boxes    
    beoro_boxes.show_hide();

    // accordion show/hide
    beoro_accordion.init();

    //* top menu
    jqueryfademenu.buildmenu("fade-menu");
    $('#fade-menu').on('click', 'a[href="#"]', function (e) {
        e.preventDefault();
    });

    //* background switch
    // beoro_bgSwitch.init();

    //* scroll to top button
    beoro_scrollToTop.init();

    // change breadcrumb home ico on hover
    if ($('#breadcrumbs li:first a i.icon-home').length) {
        $('#breadcrumbs li:first a').on('mouseenter', function () {
            $(this).children('i').addClass('icon-white')
        }).on('mouseleave', function () {
            $(this).children('i').removeClass('icon-white')
        })
    }

})

//* tooltips
beoro_tooltips = {
    //* powertip tooltips
    p_ttip: function () {
        if ($.isFunction($.fn.powerTip)) {
            $.fn.powerTip.defaults.smartPlacement = true;
            if ($('.ptip_n').length) {
                $('.ptip_n').powerTip({
                    placement: 'n'
                })
            }
            if ($('.ptip_e').length) {
                $('.ptip_e').powerTip({
                    placement: 'e'
                })
            }
            if ($('.ptip_s').length) {
                $('.ptip_s').powerTip({
                    placement: 's'
                })
            }
            if ($('.ptip_w').length) {
                $('.ptip_w').powerTip({
                    placement: 'w'
                })
            }
            if ($('.ptip_nw').length) {
                $('.ptip_nw').powerTip({
                    placement: 'nw'
                })
            }
            if ($('.ptip_ne').length) {
                $('.ptip_ne').powerTip({
                    placement: 'ne'
                })
            }
            if ($('.ptip_sw').length) {
                $('.ptip_sw').powerTip({
                    placement: 'sw'
                })
            }
            if ($('.ptip_se').length) {
                $('.ptip_se').powerTip({
                    placement: 'se'
                })
            }
        }
    }
};

//* popovers
beoro_popover = {
    init: function () {
        if ($('.pop-over').length) {
            $('.pop-over').popover();
        }
    }
}

//* boxes actions
beoro_boxes = {
    show_hide: function () {
        $('.w-box.hideable').each(function () {
            $this = $(this)
            if (!$this.children('.w-box-header').children('.icon-plus,.icon-minus').length) {
                if ($this.children('.w-box-content').hasClass('content-hide')) {
                    $this.children('.w-box-header').prepend('<i class="icon-plus icon-white" />')
                } else {
                    $this.children('.w-box-header').prepend('<i class="icon-minus icon-white" />')
                }
            }
        });
        $('.w-box-header .icon-plus,.w-box-header .icon-minus').click(function () {
            var this_box_content = $(this).closest('.w-box').find('.w-box-content')
            var box_height = this_box_content.actual('height');
            this_box_content.height(box_height);
            $(this).toggleClass('icon-plus icon-minus');
            this_box_content.slideToggle(400, 'easeOutCubic', function () {
                this_box_content.css('height', '')
            });
        });
    }
};

//* background switcher
beoro_bgSwitch = {
    init: function () {
        $('body').append('<div class="bg_switch" />');
        $('.bg_switch').append('<a href="#" class="bg_a" /><a href="#" class="bg_b" /><a href="#" class="bg_c" /><a href="#" class="bg_d" /><a href="#" class="bg_e" /><a href="#" class="bg_f" /><a href="#" class="bg_none" />')
        $('.bg_switch a').not('.bg_none').click(function (e) {
            e.preventDefault();
            $('body').removeClass('bg_a bg_b bg_c bg_d bg_e bg_f').addClass($(this).attr('class'));
        });
        $('.bg_switch .bg_none').click(function (e) {
            e.preventDefault();
            $('body').removeClass('bg_a bg_b bg_c bg_d bg_e bg_f');
        });
    }
};

//* scroll to top
beoro_scrollToTop = {
    init: function () {
        $('body').append('<a href="javascript:void(0)" class="scrollup" style="display:none"><i class="icon-chevron-up icon-white"></i></a>');

        $(window).scroll(function () {
            if ($(this).scrollTop() > 100) {
                $('.scrollup').fadeIn();
            } else {
                $('.scrollup').fadeOut();
            }
        });

        $('.scrollup').click(function (e) {
            $("html, body").animate({scrollTop: 0}, 600);
            e.preventDefault();
        });
    }
};

//* accordion show/hide
beoro_accordion = {
    init: function () {
        if ($('.accordion').length) {
            $('.accordion').each(function () {
                $(this).find('.accordion-group').each(function () {
                    $(this).find('.accordion-toggle').prepend('<i class="icon-chevron-left"/>')
                    $(this).find('.accordion-body').filter('.in').prev('.accordion-heading').find('.accordion-toggle').addClass('acc-in').children('i').toggleClass('icon-chevron-left icon-chevron-down');

                    $(this).find('.accordion-body').on('show', function (option) {
                        $(this).find('.accordion-toggle').removeClass('acc-in');
                        $(option.target).prev('.accordion-heading').find('.accordion-toggle').addClass('acc-in').children('i').removeClass('icon-chevron-left').addClass('icon-chevron-down');
                    });
                    $(this).find('.accordion-body').on('hide', function (option) {
                        $(option.target).prev('.accordion-heading').find('.accordion-toggle').removeClass('acc-in').children('i').addClass('icon-chevron-left').removeClass('icon-chevron-down');
                    });

                });
            })
        }
    }
};
function confirmdeletbox(url) {
    //e.preventDefault();
    bootbox.confirm("Voulez-vous vraiment supprimer cet enregistrement !!", function (confirmed) {
        if(confirmed){
            $(location).attr('href', url);
        }
    });

}