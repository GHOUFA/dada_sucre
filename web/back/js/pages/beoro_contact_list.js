/* [ ---- Beoro Admin - contact list ---- ] */

    $(document).ready(function() {
        //* contact list
        beoro_contact_list.basic();
        beoro_contact_list.scroll_to();
    });

    //* contact list
    beoro_contact_list = {
        basic: function() {
            if($('#list_basic').length) {
                $('#list_basic').stickySectionHeaders({
                    stickyClass     : 'sticky_header',
                    headlineSelector: 'h4'
                });
            }
        },
        scroll_to: function() {
            if($('#list_scrollTo').length) {
                
                // init list
                $('#list_scrollTo').stickySectionHeaders({
                    stickyClass     : 'sticky_header',
                    headlineSelector: 'h4'
                });
                
                // generate the list of buttons for the scrollto links
                $('#list_scrollTo li').find('h4').each(function(i){
                    $('#list_buttons').append('<span data-header="'+i+'">'+$(this).text()+'</span>');
                });
                
                // scroll to list element on button click
                $('#list_buttons span').on('click',function(){
                    $('#list_scrollTo > ul').stop().animate( {scrollTop: $('#list_scrollTo > ul > li').eq($(this).data('header')).position().top + $('#list_scrollTo ul').scrollTop() },1000,'easeOutCubic' );
                });
                
            }
        }
    };