/* [ ---- Beoro Admin - ajax content ---- ] */

    $(function () {
    
        var updateContent = function (html) {
            var data = $(this).data();
            if (data && "jnavlasttrigger" in data) {
                $('#pageNav li').removeClass('current');
                // remove padding from ajax content
                $('#ajax_content').closest('.w-box-content').removeClass('cnt_a cnt_b');
                $trigger = data['jnavlasttrigger'];
                // text content
                if ($trigger.hasClass("c_text")) {
                    $('#ajax_content').closest('.w-box-content').addClass('cnt_a');
                // help/faq content
                } else if ($trigger.hasClass("c_help_faq")) {
                    setTimeout(beoro_accordion.init,100);
                // datatables
                } else if ($trigger.hasClass("c_datatables")) {
                    // load stylesheet
                    if (document.createStyleSheet){
                        document.createStyleSheet('js/lib/datatables/css/datatables_beoro.css');
                    }
                    else {
                        $("head").append($("<link rel='stylesheet' href='js/lib/datatables/css/datatables_beoro.css' type='text/css' media='screen' />"));
                    }
                    // load scripts
                    $.getScript("js/lib/datatables/js/jquery.dataTables.min.js").done(function(){
                        $.getScript("js/lib/datatables/js/jquery.dataTables.sorting.js").done(function(){
                            $.getScript("js/lib/datatables/js/jquery.dataTables.bootstrap.min.js").done(function(){
                                $('#dt_ajax').dataTable({
                                    "sPaginationType": "bootstrap",
                                    "iDisplayLength": 50
                                });
                            });        
                        });
                    });
                }
                $trigger.closest('li').addClass('current');
            }
        };
        $("#ajax_content").jNavigate({
            extTrigger: '.jnav-ext',
            intTrigger: '.jnav-int',
            useHistory: false,
            spinner: 'img/ajax_loader.gif',
            loaded: updateContent
        });
    
    });