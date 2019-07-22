/* [ ---- Beoro Admin - form validation ---- ] */

    $(document).ready(function() {
        //* form validation
        beoro_validate.simple();
        beoro_validate.extended();
    });

    //* form validation
    beoro_validate = {
        simple: function() {
            if($('#validate_field_types').length) {
                $('#validate_field_types').validate({
                    onkeyup: false,
                    errorClass: 'error',
                    validClass: 'valid',
                    highlight: function(element) {
                        $(element).closest('div').addClass("f-error");
                    },
                    unhighlight: function(element) {
                        $(element).closest('div').removeClass("f-error");
                    },
                    errorPlacement: function(error, element) {
                        $(element).closest('div').append(error);
                    },
                    rules: {
                        val1_url: { required: true, url: true },
                        val1_text: { required: true },
                        val1_sport: { required: true },
                        val1_sport2: { required: true, minlength: 2 },
                        val1_group0: { required: true },
                        val1_group1: { required: true, minlength: 2 },
                        val1_file: { required: true }
                    },
                    invalidHandler: function(form, validator) {
                        // callback
                    }
                })
            }
        },
        extended: function() {
            if($('#s2_val').length) {
                $("#s2_val").select2({
                    placeholder: "Select a State",
                    allowClear: true
                })
            }
            if($('#dp_val').length) {
                $('#dp_val').datepicker({
                    autoclose: true
                }).on('changeDate', function(ev){
                    $('#dp_val').valid();
                })
            }
            if($('#wysiwg_val').length) {
                ck_wysiwg = CKEDITOR.replace( 'wysiwg_val', {
                    toolbar: 'Standard'
                });
                
                // custom rule for ckeditor
                jQuery.validator.addMethod("ckeditor", function(value, element) { 
                    var textData = ck_wysiwg.getData();
                    if(textData.length>0) return true;
                    return false;
                }, "No data in editor");
            }
            if($('#count_textarea_val').length) {
                $('#count_textarea_val').textareaCount({
                    'maxCharacterSize': 200,
                    'originalStyle': 'originalTextareaInfo',
                    'warningStyle' : 'warningTextareaInfo',
                    'warningNumber': 40,
                    'displayFormat' : '#input/#max | #words words'
                })
            }
            if($('#validate_extended').length) {
                var $form_ext = $("#validate_extended");
                
                $form_ext.validate({
                    onkeyup: false,
                    errorClass: 'error',
                    validClass: 'valid',
                    highlight: function(element) {
                        $(element).closest('div').addClass("f-error");
                    },
                    unhighlight: function(element) {
                        $(element).closest('div').removeClass("f-error");
                    },
                    errorPlacement: function(error, element) {
                        $(element).closest('div').append(error);
                    },
                    rules: {
                        s2_val: { required: true },
                        dp_val: { required: true },
                        wysiwg_val: "ckeditor",
                        count_textarea_val: { required: true, minlength: 50 }
                    },
                    invalidHandler: function(form, validator) {
                        // callback
                    }
                });
                var settings = $.data($form_ext[0], 'validator').settings;
                // select2
                settings.ignore += ':not(#s2_val)';
                // wysiwg
                settings.ignore += ':not(#wysiwg_val)';
            }
        }
    };