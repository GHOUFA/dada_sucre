/* [ ---- Beoro Admin - settings ---- ] */

    $(document).ready(function() {
        if($('#s_offline').length) {
            $("#s_offline").iButton({
                labelOn: "Yes",
                labelOff: "No"
            });
        }
        if($('#s_seo_engine').length) {
            $("#s_seo_engine").iButton({
                labelOn: "Yes",
                labelOff: "No"
            });
        }
        if($('#s_seo_rewrite').length) {
            $("#s_seo_rewrite").iButton({
                labelOn: "Yes",
                labelOff: "No"
            });
        }
        if($('#s_lang_visitors').length) {
            $('#s_lang_visitors').select2({
                tags:["English", "Chinese", "Dutch", "French", "German", "Hungarian", "Italian", "Lithuanian", "Russian", "Spanish", "Swedish", "Ukrainian"],
                tokenSeparators: [",", " "]
            });
        }
        if($('#s_lang_redirect').length) {
            $('#s_lang_redirect').select2({
                tags:["English", "Chinese", "Dutch", "French", "German", "Hungarian", "Italian", "Lithuanian", "Russian", "Spanish", "Swedish", "Ukrainian"],
                tokenSeparators: [",", " "]
            });
        }
    });