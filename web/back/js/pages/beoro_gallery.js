/* [ ---- Beoro Admin - gallery grid ---- ] */

    $(document).ready(function() {
        //* gallery grid
        beoro_gal_grid.large();
    });

    //* gallery grid
    beoro_gal_grid = {
        large: function() {
            if($('#large_grid').length) {
                //* small gallery grid
                $('#large_grid ul').imagesLoaded(function() {
                    
                    var filter = '',
                        handler;
                    
                    // Prepare layout options.
                    var options = {
                        autoResize: true, // This will auto-update the layout when the browser window is resized.
                        container: $('#large_grid'), // Optional, used for some extra CSS styling
                        offset: 5, // Optional, the distance between grid items
                    }
                    
                    // This function filters the grid when a change is made.
                    var refresh = function() {
                        if(handler) {
                            handler.wookmarkClear();
                            handler = null;
                        }
                        $('#large_grid ul li').addClass('inactive');
                        handler = $(filter);
                        handler.removeClass("inactive");
                        handler.wookmark(options);
                    }
                    
                    /**
                     * This function checks all filter options to see which ones are active.
                     * If they have changed, it also calls a refresh (see above).
                     */
                    var updateFilters = function() {
                        var oldFilter = filter;
                        filter = '';
                        var filters = [];
                        
                        var lis = $('#large-filters li');
                        var i=0, length=lis.length, li;
                        for(; i<length; i++) {
                            li = $(lis[i]);
                            if(li.hasClass('active')) {
                                filters.push('#large_grid ul li.'+li.attr('data-filter'));
                            }
                        }
                        if(filters.length == 0) {
                            filters.push('#large_grid ul li');
                        }
                        filter = filters.join(', ');
                        if(oldFilter != filter) {
                            refresh();
                        }
                    }
                    
                    var updateAllFilters = function() {
                        var oldFilter = filter;
                        filter = '';
                        if(oldFilter != filter) {
                            refresh();
                        }
                    }
                    
                    /**
                     * When a filter is clicked, toggle it's active state and refresh.
                     */
                    var onClickFilter = function(event) {
                        var item = $(event.currentTarget);
                        $('#large-filters li').removeClass('active');
                        item.toggleClass('active');
                        updateFilters();
                    }
                    
                    // Capture filter click events.
                    $('#large-filters li').click(onClickFilter);
                    
                    // Do initial update (shows all items).
                    updateFilters();
                    
                    // zoom image
                    $('#large_grid .img_action_zoom').on('click',function(e) {
                        e.preventDefault();
                        $.colorbox({
                            maxWidth    : '80%',
                            href        : $(this).attr('href'),
                            maxHeight   : '80%',
                            opacity     : '0.5',
                            slideshow   : true,
                            fixed       : true
                        })
                    })
                    
                    // select image 
                    /*$('#large_grid ul li .img_holder').append('<span class="checkImage" />');
                    $('#large_grid ul li').on('click', '.checkImage', function() {
                        var closestWraper = $(this).closest('li');
                        if(closestWraper.hasClass('checked_item')) {
                            closestWraper.removeClass('checked_item');
                        } else {
                            closestWraper.addClass('checked_item');
                        }
                    })*/
                    
                    
                    // remove selected
                    $('.remove_selected_img').click(function(e) {
                        e.preventDefault();
                        $('#large_grid ul li.checked_item').each(function() {
                            $(this).remove();
                            beoro_gal_grid.hide_item($(this).attr('id'));
                        })
                        refresh();
                    })
                    // remove single image
                    $('.img_action_remove').on('click',function(e) {
                        e.preventDefault();
                        $(this).closest('li').remove();
                        beoro_gal_grid.hide_item($(this).closest('li').attr('id'));
                        refresh();
                    });
                    // edit selected
                    $('.edit_selected_img').click(function(e) {
                        e.preventDefault();
                        $('#edit_image_table tbody').html('');
                        $('#large_grid ul li.checked_item').each(function() {
                            beoro_gal_grid.getEditInfo($(this).closest('li'));
                        });
                        $('#edit_image_table tbody').append('<tr><td colspan="4" style="text-align:center"><button class="btn btn-inverse edit_img_save_all">Save all</button></td></tr>')
                        beoro_gal_grid.open_editBox();
                        saveInfo();
                        saveAllInfo();
                    })
                    // edit single image
                    $('.img_action_edit').on('click',function(e) {
                        e.preventDefault();
                        $('#edit_image_table tbody').html('');
                        beoro_gal_grid.getEditInfo($(this).closest('li'));
                        beoro_gal_grid.open_editBox();
                        saveInfo();
                    });
                    // close edit box
                    $('.close_edit_box').on('click',function() {
                        beoro_gal_grid.close_editBox();
                    });
                    function saveInfo() {
                        $('.edit_img_save').on('click', function() {
                            var thisTitle = $(this).closest('tr').find('.edit_img_title').val();
                            var thisFolder = $(this).closest('tr').find('.edit_img_folder').val();
                            $('#'+$(this).next('.edit_img_id').val()).find('.imgTitle').text(thisTitle);
                            $('#'+$(this).next('.edit_img_id').val()).attr('data-folder',thisFolder).removeClass().addClass("folder_all "+thisFolder);
                            $(this).closest('tr').remove();
                            if(!$('#edit_image_table tbody').children('tr').length) {
                                beoro_gal_grid.close_editBox();
                            }
                            refresh();
                        })
                    }
                    function saveAllInfo() {
                        $('.edit_img_save_all').on('click', function() {
                            $('#edit_image_table tbody tr').not(':last').each(function() {
                                var thisTitle = $(this).closest('tr').find('.edit_img_title').val();
                                var thisFolder = $(this).closest('tr').find('.edit_img_folder').val();
                                $('#'+$(this).find('.edit_img_id').val()).find('.imgTitle').text(thisTitle);
                                $('#'+$(this).find('.edit_img_id').val()).attr('data-folder',thisFolder).removeClass().addClass("folder_all "+thisFolder);
                                $(this).closest('tr').remove();
                            })
                            beoro_gal_grid.close_editBox();
                            refresh();
                        })
                    }
                });
            }
        },
        getEditInfo: function(item) {
            var thisImgSrc = item.find('.img_holder').children('img').attr('src');
            var thisTitle = item.find('.imgTitle').text();
            var thisFolder = item.attr('data-folder');
            var thisId = item.attr('id');
            var clonedTemplate = $('#edit_image_template').clone();
            clonedTemplate.removeAttr('id').removeAttr('style').find('img').attr('src', thisImgSrc);
            clonedTemplate.find('.edit_img_title').val(thisTitle);
            clonedTemplate.find('.edit_img_folder').val(thisFolder).attr('checked', true);
            clonedTemplate.find('.edit_img_id').val(thisId);
            $('#edit_image_table tbody').append(clonedTemplate);
        },
        hide_item: function(item_id) {
            if($('#edit_image_box').is(':visible')){
                $('#edit_image_table tbody .edit_img_id').each(function() {
                    var $this = $(this);
                    console.log($this);
                    console.log(item_id);
                    if($this.val() == item_id) {
                        $this.closest('tr').remove();
                    }
                });
                if(!$('#edit_image_table tbody').children('tr').length) {
                    beoro_gal_grid.close_editBox();
                }
            }
        },
        open_editBox: function() {
            if($('#edit_image_box').is(':hidden')){
                $('#edit_image_box').show()
            }
            $("html, body").animate({
                scrollTop: ($('#edit_image_box').offset().top - 40) + "px"
            }, {
                duration: 500,
                easing: "swing"
            });
        },
        close_editBox: function() {
            if($('#edit_image_box').is(':visible')){
                $('#edit_image_box').slideUp()
            }
            $('#edit_image_table tbody').html('');
        }
    };