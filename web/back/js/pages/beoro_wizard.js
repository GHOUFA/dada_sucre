/* [ ---- Beoro Admin - wizard ---- ] */

    $(document).ready(function() {
        //* wizard
        beoro_wizard.w_basic();
    });

    //* wizard
    beoro_wizard = {
        w_basic: function() {
            if($('#wizard-basic').length) {
                $('#wizard-basic').smartWizard($('#steone'));
            }
        },

	   };