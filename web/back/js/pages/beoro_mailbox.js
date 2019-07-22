/* [ ---- Beoro Admin - mailbox ---- ] */

    $(document).ready(function() {
        //* mailbox
        beoro_mailbox.init();
    });

    //* mailbox
    beoro_mailbox = {
        init: function() {
            if($('#dt_inbox').length) {
                $('#dt_inbox').dataTable({
                    "sPaginationType": "bootstrap",
                    "iDisplayLength": 25,
                    "aaSorting": [[ 5, "desc" ]],
                    "aoColumns": [
                        { "bSortable": false, 'sWidth': '13px' },
                        { "bSortable": false, 'sWidth': '16px' },
                        { "bSortable": false, 'sWidth': '16px' },
                        { "sType": "string" },
                        { "sType": "string" },
                        { "sType": "eu_date" },
                        { "sType": "formatted-num" },
                        { "bSortable": false, 'sWidth': '16px' }
                    ]
                });
            }
            
            $('.table').on('click', '.mbox_star', function(){
                $(this).toggleClass('splashy-star_empty splashy-star_full');
            });
            
            $('.table').on('mouseenter','.starSelect', function(){
                if($(this).children('i.splashy-star_empty').length) {
                    $(this).children('i.mbox_star').css('visibility','visible');
                }
            }).on('mouseleave', '.starSelect', function(){
                if($(this).children('i.splashy-star_empty').length) {
                    $(this).children('i.mbox_star').css('visibility','');
                }
            });
            
            $('.table').on('click', '.select_msgs', function () {
                var tableid = $(this).data('tableid');
                $('#'+tableid).find('input[name=msg_sel]').attr('checked', this.checked).closest('tr').addClass('rowChecked')
                if($(this).is(':checked')) {
                    $('#'+tableid).find('input[name=msg_sel]').closest('tr').addClass('rowChecked')
                } else {
                    $('#'+tableid).find('input[name=msg_sel]').closest('tr').removeClass('rowChecked')
                }
            });
            
            $('input[name=msg_sel]').on('click',function() {
                if($(this).is(':checked')) {
                    $(this).closest('tr').addClass('rowChecked')
                } else {
                    $(this).closest('tr').removeClass('rowChecked')
                }
            });
            
        }
    };