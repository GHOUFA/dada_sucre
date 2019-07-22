/* [ ---- Beoro Admin - form elements ---- ] */

    $(document).ready(function() {
        //* one page navigation
        beoro_PageNav.init();
        //* ui sliders
        beoro_sliders.init();
        //* ui progressbars
        beoro_progressbars.init();
        //* 2col multiselect
        beoro_multiselect.init();
        //* enchanced select box
        beoro_enchancedSelect.init();
        //* masked inputs
        beoro_maskedInputs.init();
        //* password strength meter
        beoro_password_meter.init();
        //* datepicker
        beoro_datepicker.init();
        //* timepicker
        beoro_timepicker.init();
        //* colorpicker
        beoro_colorpicker.init();
        //* switch buttons
        beoro_switchButtons.init();
        //* autosize textarea
        beoro_autosize_textarea.init();
        //* textarea counter
        beoro_textarea_counter.init();
        // UI spinners
        beoro_uiSpinners.init();
        //* multiupload
        beoro_multiupload.init();
        //* WYSIWG Editor
        beoro_wysiwg.init();
    });

    //* one page navigation
    beoro_PageNav = {
        init: function() {
            if($('#pageNav').length) {
                function goToByScroll(id){
                    // scroll
                    if($(window).width() > 979) {
                        var offsetFix = 50;
                    } else {
                        var offsetFix = 10;
                    }
                    $('html,body').animate({
                        scrollTop: $(id).offset().top - offsetFix },
                    'slow');
                }
                
                $("#pageNav a").click(function(e) {
                      // prevent a page reload when a link is pressed
                    e.preventDefault(); 
                      // call the scroll function
                    goToByScroll($(this).attr("href"));           
                })
            }
        }
    };

    //* sliders
    beoro_sliders = {
        init: function() {
            if($('.ui_slider1').length) {
                //* default slider
                $( ".ui_slider1" ).slider({
                    value:100,
                    min: 0,
                    max: 500,
                    step: 50,
                    slide: function( event, ui ) {
                        $( ".ui_slider1_val" ).text( "$" + ui.value );
                        $( "#ui_slider_default_val" ).val( "$" + ui.value );
                    }
                });
                $( ".ui_slider1_val" ).text( "$" + $( ".ui_slider1" ).slider( "value" ) );
                $( "#ui_slider_default_val" ).val( "$" + $( ".ui_slider1" ).slider( "value" ) );
            }
            if($('.ui_slider2').length) {
                //* range slider
                $( ".ui_slider2" ).slider({
                    range: true,
                    min: 0,
                    max: 500,
                    values: [ 75, 300 ],
                    slide: function( event, ui ) {
                        $( ".ui_slider2_val" ).text( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
                        $( "#ui_slider_min_val" ).val( "$" + ui.values[ 0 ] );
                        $( "#ui_slider_max_val" ).val( "$" + ui.values[ 1 ] );
                    }
                });
                $( ".ui_slider2_val" ).text( "$" + $( ".ui_slider2" ).slider( "values", 0 ) + " - $" + $( ".ui_slider2" ).slider( "values", 1 ) );
                $( "#ui_slider_min_val" ).val( "$" + $( ".ui_slider2" ).slider( "values", 0 ) );
                $( "#ui_slider_max_val" ).val( "$" + $( ".ui_slider2" ).slider( "values", 1 ) );
            }
            if($('#ui_slider3_sel').length) {    
                //* slider with select
                var select = $( "#ui_slider3_sel" );
                var slider = $( "<div id='ui_slider3'></div>" ).insertAfter( select ).slider({
                    min: 1,
                    max: 6,
                    range: "min",
                    value: select[ 0 ].selectedIndex + 1,
                    slide: function( event, ui ) {
                        select[ 0 ].selectedIndex = ui.value - 1;
                    }
                });
                $( "#ui_slider3_sel" ).change(function() {
                    slider.slider( "value", this.selectedIndex + 1 );
                });
            }
        }
    };

    //* progressbars
    beoro_progressbars = {
        init: function(){
            beoro_progressbars.start();
        },
        start: function() {
            if($('#progress1').length) {
                var iEnd1 = new Date().setTime(new Date().getTime() + 25 * 1000); // now plus 25 secs
                $('#progress1').anim_progressbar({
                    finish: iEnd1,
                    callback: function() {
                        // callback after finish
                    }
                })
            }
            if($('#progress2').length) {
                var iNow = new Date().setTime(new Date().getTime() + 2 * 1000); // now plus 2 secs
                var iEnd2 = new Date().setTime(new Date().getTime() + 10 * 1000); // now plus 10 secs
                $('#progress2').anim_progressbar({
                    start: iNow,
                    finish: iEnd2,
                    interval: 100,
                    callback: function() {
                        // callback after finish
                    }
                })
            }
            if($('#progress3').length) {
                var iEnd3 = new Date().setTime(new Date().getTime() + 15 * 1000); // now plus 15 secs
                $('#progress3').anim_progressbar({
                    interval: 1000,
                    finish: iEnd3,
                    callback: function() {
                        // callback after finish
                    }
                })
            }
        }
    };

    //* multiselect
    beoro_multiselect = {
        init: function(){
            if($('#public-methods').length) {
                //* public methods
                $('#public-methods').multiSelect();
                $('#select-all').click(function(){
                    $('#public-methods').multiSelect('select_all');
                    return false;
                });
                $('#deselect-all').click(function(){
                    $('#public-methods').multiSelect('deselect_all');
                    return false;
                });
                $('#select-fr').click(function(){
                    $('#public-methods').multiSelect('select', 'fr');
                    return false;
                });
                $('#deselect-fr').click(function(){
                    $('#public-methods').multiSelect('deselect', 'fr');
                    return false;
                });
            }
            if($('#optgroup').length) {
                //* optgroup
                $('#optgroup').multiSelect()
            }
            if($('#custom-headers').length) {
                //* custom headers
                $('#custom-headers').multiSelect({
                    selectableHeader: "<div class='custom-header'>Selectable item</div>",
                    selectedHeader: "<div class='custom-header'>Selected items</div>"
                });
            }
            if($('#searchable').length) {
                //* searchable
                $('#searchable').multiSelect({
                    selectableHeader: '<div class="search-header"><input type="text" class="span12" id="ms-search" autocomplete="off" placeholder="country name"></div>',
                    selectedHeader: "<div class='search-selected'></div>"
                });
            }
            if($('#ms-search').length) {  
                $('#ms-search').quicksearch($('li', '#ms-searchable' )).on('keydown', function(e){
                    if (e.keyCode == 40){
                        $(this).trigger('focusout');
                        $('#ms-searchable').focus();
                        return false;
                    }
                })
            }
        }
    };

    //* masked inputs
    beoro_maskedInputs = {
        init: function() {
            $("#mask_date").inputmask("d/m/y",{ "placeholder": "dd/mm/yyyy" });
            $("#mask_phone").inputmask("mask", {"mask": "(999) 999-9999"});
            $("#mask_product").inputmask({"mask": "AA-999999a"});
            $("#mask_numeric").inputmask('€ 999.999,99', { numericInput: false });
            $("#mask_mac").inputmask({"mask": "**:**:**:**:**:**"});
            $("#mask_callback").inputmask("d/m/y",{ "placeholder": "dd/mm/yyyy", "oncomplete": function(){ alert('Date entered: '+$(this).val()); } });
        }
    };

    //* password strength meter
    beoro_password_meter = {
        init: function() {
            if($('#password_meter').length) {
                $('#password_meter').pwdMeter({
                    minLength: 6,
                    displayGeneratePassword: true,
                    generatePassText: 'Generate Password',
                    randomPassLength: 16,
                    neutralText: "",
                    veryWeakText: "Very weak",
                    weakText: "Weak",
                    mediumText: "Medium",
                    strongText: "Strong",
                    veryStrongText: "Very Strong"
                })
            }
        }
    };

    //* enchanced select box
    beoro_enchancedSelect = {
        init: function() {
            if($('#s2_single').length) {
                $("#s2_single").select2({
                    placeholder: "Select a State",
                    allowClear: true
                });
            }
            if($('#s2_multiple').length) {
                $("#s2_multiple").select2({
                    placeholder: "Add tags"
                });
            }
            if($('#s2_single_data').length) {
                $('#s2_single_data').select2({
                    minimumInputLength: 1,
                    query: function (query) {
                        var data = {results: []}, i, j, s;
                        for (i = 1; i < 5; i++) {
                            s = "";
                            for (j = 0; j < i; j++) {s = s + query.term;}
                            data.results.push({id: query.term + i, text: s});
                        }
                        query.callback(data);
                    }
                });
            }
            if($('#s2_tag_handler').length) {
                $('#s2_tag_handler').select2({
                    tags:["red", "green", "blue", "black", "white"],
                    tokenSeparators: [",", " "]
                });
            }
        }
    };

    //* datepicker
    beoro_datepicker = {
        init: function() {
            if($('#dp1').length) {
                $('#dp1').datepicker()
            }
            if($('#dp2').length) {
                $('#dp2').datepicker()
            }
            if($('#dpYear').length) {
                $('#dpYear').datepicker()
            }
            if( ($('#dpStart').length) && ($('#dpEnd').length) ) {
                $('#dpStart').datepicker().on('changeDate', function(ev){
                    var dateText = $(this).data('date'),
                        endDateTextBox = $('#dpEnd input');
                    if (endDateTextBox.val() != '') {
                        var testStartDate = new Date(dateText),
                            testEndDate = new Date(endDateTextBox.val());
                        if (testStartDate > testEndDate) {
                            endDateTextBox.val(dateText);
                        }
                    } else {
                        endDateTextBox.text(dateText);
                    };
                    $('#dpEnd').datepicker('setStartDate', dateText);
                    $('#dpStart').datepicker('hide');
                });
                $('#dpEnd').datepicker().on('changeDate', function(ev){
                    var dateText = $(this).data('date'),
                        startDateTextBox = $('#dpStart input');
                    if (startDateTextBox.val() != '') {
                        var testStartDate = new Date(startDateTextBox.val()),
                            testEndDate = new Date(dateText);
                        if (testStartDate > testEndDate) {
                            startDateTextBox.text(dateText);
                        }
                    } else {
                        startDateTextBox.val(dateText);
                    };
                    $('#dpStart').datepicker('setEndDate', dateText)
                    $('#dpEnd').datepicker('hide')
                });
            }
        }
    };

    //* timepicker
    beoro_timepicker = {
        init: function() {
            if($('#tp-default').length) {
                $('#tp-default').timepicker()
            }
            if($('#tp-24h').length) {
                $('#tp-24h').timepicker({
                    minuteStep: 1,
                    template: 'modal',
                    showSeconds: true,
                    showMeridian: false
                })
            }
            if($('#tp-noTemplate').length) {
                $('#tp-noTemplate').timepicker({
                    template: false,
                    showInputs: false,
                    minuteStep: 5
                })
            }
        }
    };

    //* colorpicker
    beoro_colorpicker = {
        init: function() {
            if($('#cp1').length) {
                $('#cp1').colorpicker({
                    format: 'hex'
                })
            }
            if($('#cp2').length) {
                $('#cp2').colorpicker()
            }
            if($('#cp3').length) {
                $('#cp3').colorpicker()
            }
        }
    };

    //* switch buttons
    beoro_switchButtons = {
        init: function() {
            if($('#sb_off').length) {
                $("#sb_off").iButton();
            }
            if($('#sb_on').length) {
                $("#sb_on").iButton();
            }
            if($('#sb_meta_a').length) {
                $("#sb_meta_a").iButton();
            }
            if($('#sb_meta_b').length) {
                $("#sb_meta_b").iButton();
            }
            if($('.sb_ch1').length) {
                $(".sb_ch1").iButton({
                    resizeHandle: false
                });
            }
            if($('.sb_ch2').length) {
                $(".sb_ch2").iButton({
                    allowRadioUncheck: true
                });
            }
            if($('#sb_wb').length) {
                $("#sb_wb").iButton({
                    labelOn: "A really, really long label",
                    labelOff: "Tiny label"
                });
            }
            if($('#sb_call').length) {
                $("#sb_call").iButton({
                    labelOn: "Yes",
                    labelOff: "No",
                    change: function ($input){
                        $("#sb_call_text").html($input.is(":checked") ? "Callback after change (Yes)" : "Callback after change (No)");
                    }
                });
            }
        }
    }

    //* autosize textarea
    beoro_autosize_textarea = {
        init: function() {
            if($('.autosize_textarea').length) {
                $('.autosize_textarea').each(function() {
                    $(this).autosize();
                })
            }
        }
    };

    //* textarea counter
    beoro_textarea_counter = {
        init: function() {
            if($('#count-textarea1').length) {
                $('#count-textarea1').textareaCount({
                    'maxCharacterSize': -2,
                    'originalStyle': 'originalTextareaInfo',
                    'warningStyle' : 'warningTextareaInfo',
                    'warningNumber': 40
                })
            }
            if($('#count-textarea2').length) {
                $('#count-textarea2').textareaCount({
                    'maxCharacterSize': 200,
                    'originalStyle': 'originalTextareaInfo',
                    'warningStyle' : 'warningTextareaInfo',
                    'warningNumber': 40,
                    'displayFormat' : '#input/#max | #words words'
                })
            }
        }
    };

    //* UI spinners
    beoro_uiSpinners = {
        init: function() {
            if($('#def_spinner').length) {
                $('#def_spinner').spinner();
            }
            if($('#decimal_spinner').length) {
                $("#decimal_spinner").numeric({
                    step: 0.01,
                    format: "n", // c - currency, d -  decimal digits, n - number, p - percentage
                    buttons: {
                        position: "insideStacked"
                    }
                    
                });
            }
            if($('#numeric_min_max').length) {
                var numericSpinner = $("#numeric_min_max").numeric({
                    format: "c", // c - currency, d -  decimal digits, n - number, p - percentage
                    min: -20,
                    max: 100
                });
            }
            if($('#time_spinner').length) {
                $.widget( "jqAmpUI.timespinner", $.jqAmpUI.spinner, {
                    options: {
                        // seconds
                        step: 60 * 1000,
                        // hours
                        page: 60
                    },
                    _parse: function( value ) {
                        if ( typeof value === "string" ) {
                            // already a timestamp
                            if ( Number( value ) == value ) {
                                return Number( value );
                            }
                            return +Globalize.parseDate( value );
                        }
                        return value;
                    },
                    _format: function( value ) {
                        return Globalize.format( new Date(value), "t" );
                    }
                });
             
                var timeSpinner = $( "#time_spinner" ).timespinner();
            }
            if($('#spinners_culture').length) {
                // culture change
                $( "#spinners_culture" ).change(function() {
                    var currentTime = timeSpinner.timespinner('value'); 
                    var currentNumeric = numericSpinner.numeric('value'); 
                   
                    Globalize.culture( $(this).val() );
                    
                    timeSpinner.timespinner( 'value', currentTime );
                    numericSpinner.numeric( 'value', currentNumeric );
                });
            }
            
                // remove default button styles
                $('.ui-spinner-button').each(function(){
                    $(this).removeClass('ui-state-default ui-button');
                })
            
        }
    };

    //* drag&drop multi-upload
    beoro_multiupload = {
        init: function() {
            if($('#multi_upload').length) {
                $("#multi_upload").pluploadQueue({
                    // General settings
                    runtimes : 'html5,flash,silverlight',
                    url : 'js/lib/plupload/examples/dump.php',
                    max_file_size : '10mb',
                    chunk_size : '1mb',
                    unique_names : true,
                    browse_button : 'pickfiles',
            
                    // Specify what files to browse for
                    filters : [
                        {title : "Image files", extensions : "jpg,gif,png"},
                        {title : "Zip files", extensions : "zip"}
                    ],
            
                    // Flash settings
                    flash_swf_url : 'js/lib/plupload/js/plupload.flash.swf',
            
                    // Silverlight settings
                    silverlight_xap_url : 'js/lib/plupload/js/plupload.silverlight.xap'
                });
                $('.plupload_header').remove();
            }
        }
    };

    //* WYSIWG Editor
    beoro_wysiwg = {
        init: function() {
            if($('#wysiwg_editor').length) { 
                CKEDITOR.replace( 'wysiwg_editor', {
                    toolbar: 'Standard'
                });
            }    
        }
    };