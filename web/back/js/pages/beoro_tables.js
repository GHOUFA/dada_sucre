/* [ ---- Beoro Admin - tables ---- ] */

    $(document).ready(function() {
        //* datatable must be rendered first
        beoro_galery_table.init();
        //* actions for tables, datatables
        beoro_select_row.init();
        beoro_delete_rows.simple();
        beoro_delete_rows.dt();
    });

    //* select all rows
    beoro_select_row = {
        init: function() {
            $('.select_rows').click(function () {
                var tableid = $(this).data('tableid');
                $('#'+tableid).find('input[name=row_sel]').attr('checked', this.checked);
            });
        }
    };

    //* delete rows
    beoro_delete_rows = {
        //* simple
        simple: function() {
            $(".delete_rows_simple").on('click',function (e) {
                e.preventDefault();
                var tableid = $(this).data('tableid');
                if($('input[name=row_sel]:checked', '#'+tableid).length) {
                    $.colorbox({
                        initialHeight: '0',
                        initialWidth: '0',
                        href: "#confirm_dialog",
                        inline: true,
                        opacity: '0.3',
                        onComplete: function(){
                            $('.confirm_yes').click(function(e){
                                e.preventDefault();
                                $('input[name=row_sel]:checked', '#'+tableid).closest('tr').fadeTo(300, 0, function () { 
                                    $(this).remove();
                                    $('.select_rows','#'+tableid).attr('checked',false);
                                });
                                $.colorbox.close();
                            });
                            $('.confirm_no').click(function(e){
                                e.preventDefault();
                                $.colorbox.close(); 
                            });
                        }
                    });
                }
            });
        },
        //* datatable
        dt: function() {
            $(".delete_rows_dt").on('click',function (e) {
                e.preventDefault();
                var tableid = $(this).data('tableid'),
                    oTable = $('#'+tableid).dataTable();
                if($('input[name=row_sel]:checked', '#'+tableid).length) {
                    $.colorbox({
                        initialHeight: '0',
                        initialWidth: '0',
                        href: "#confirm_dialog",
                        inline: true,
                        opacity: '0.3',
                        onComplete: function(){
                            $('.confirm_yes').click(function(e){
                                e.preventDefault();
                                $('input[name=row_sel]:checked', oTable.fnGetNodes()).closest('tr').fadeTo(300, 0, function () {
                                    $(this).remove();
                                    oTable.fnDeleteRow( this );
                                    $('.select_rows','#'+tableid).attr('checked',false);
                                });
                                $.colorbox.close();
                            });
                            $('.confirm_no').click(function(e){
                                e.preventDefault();
                                $.colorbox.close(); 
                            });
                        }
                    });
                }    
            });
        }
    };

    //* gallery table view
    beoro_galery_table = {
        init: function() {
            if($('#dt_gal').length) {
                $('#dt_gal').dataTable({
                   "sPaginationType": "bootstrap",
                    "aaSorting": [[ 2, "asc" ]],
                    "aoColumns": [
                        { "bSortable": false },
                        { "bSortable": false },
                        { "sType": "string" },
                        { "sType": "formatted-num" },
                        { "sType": "eu_date" },
                        { "bSortable": false }
                    ]
                });
            }
        }
    };