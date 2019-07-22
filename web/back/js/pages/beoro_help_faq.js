/* [ ---- Beoro Admin - help/faq ---- ] */

    $(document).ready(function() {
        //* help/faq
        beoro_help_faq.init();
    });

    //* help/faq
    beoro_help_faq = {
        init: function() {
            if($('#faq_accordion').length) {    
                var expanded_all = $('#faq_accordion').hasClass('expanded_all');
                $('a#faq_btn').click(function(e){
                    $(this).children('span').toggle();
                    if(expanded_all == true) {
                        $('#faq_accordion .collapse').filter(':visible').each(function() {
                            if($(this).height() > 0 ) {
                                $(this).collapse('hide');
                            }
                        })
                        expanded_all = false;
                    } else {
                        $('#faq_accordion .collapse').filter(':visible').not('.in').each(function() {
                            $(this).collapse('show');
                        })
                        expanded_all = true;
                    }
                    e.preventDefault();
                });
                
                if(expanded_all == true) {
                    $('a#faq_btn').trigger('click');
                };
                
                $("input.faq_search").on('keyup',function(){
                    var filter = $(this).val(), count = 0, minChar = 3;
                    if(filter.length >= minChar) {
                        $("#faq_accordion .accordion-group").each(function(){
                            if ($(this).text().search(new RegExp(filter, "i")) < 0) {
                                $(this).hide();
                            } else {
                                $(this).show();
                                count++;
                            }
                        });
                        $('#faq_accordion').removeHighlight().highlight(filter);
                        var numberItems = count;
                        $(this).next('.faq_count').show().text("Number of topics: "+count);
                    } else {
                        $("#faq_accordion .accordion-group").show();
                        $('#faq_accordion').removeHighlight();
                        $(this).next('.faq_count').text('').hide();
                    }
                });
            }
        }
    };