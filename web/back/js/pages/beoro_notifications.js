/* [ ---- Beoro Admin - notifications ---- ] */

    $(document).ready(function() {
        //* notifications
        beoro_notifications.n_sticky2();
        beoro_notifications.n_bootbox();
    });

    //* notifications
    beoro_notifications = {
        n_sticky2: function() {
            $('#sticky_a').click(function(e){
                $.sticky("Lorem ipsum dolor sit amet, consectetur adipiscing elit.", {autoclose : 3000, position: "top-right", type: "st-error" });
            });
            $('#sticky_b').click(function(e){
                $.sticky("Lorem ipsum dolor sit&hellip;", {autoclose : 3000, position: "top-right", type: "st-success" });
            });
            $('#sticky_c').click(function(e){
                $.sticky("Lorem ipsum dolor sit&hellip;", {autoclose : 3000, position: "top-right", type: "st-info" });
            });
            $('#sticky_d').click(function(e){
                $.sticky("Lorem ipsum dolor sit&hellip;", {autoclose : 3000, position: "top-right" });
            });
            $('#sticky_d_st').click(function(e){
                $.sticky("Lorem ipsum dolor sit&hellip;", {autoclose : false, position: "top-right" });
            });
            $('#sticky_e').click(function(e){
                $.sticky("Lorem ipsum dolor sit&hellip;", {autoclose : 3000, position: "top-right" });
            });
            $('#sticky_f').click(function(e){
                $.sticky("Lorem ipsum dolor sit&hellip;", {autoclose : 3000, position: "top-center" });
            });
            $('#sticky_g').click(function(e){
                $.sticky("Lorem ipsum dolor sit&hellip;", {autoclose : 3000, position: "top-left" });
            });
            $('#sticky_h').click(function(e){
                $.sticky("Lorem ipsum dolor sit&hellip;", {autoclose : 3000, position: "bottom-right" });
            });
            $('#sticky_i').click(function(e){
                $.sticky("Lorem ipsum dolor sit&hellip;", {autoclose : 3000, position: "bottom-left" });
            });
        },
        n_bootbox: function() {
            $("#bb-alert").click(function(e) {
                e.preventDefault();
                bootbox.alert("Hello world!", function() {
                    console.log("Alert Callback");
                });
            });
             $("#bb-confirm").click(function(e) {
                e.preventDefault();
                bootbox.confirm("Are you sure?", function(confirmed) {
                    console.log("Confirmed: "+confirmed);
                });
            });
            $("#bb-prompt").click(function(e) {
                e.preventDefault();
                bootbox.prompt("What is your name?", function(result) {
                    console.log("Result: "+result);
                });
            });
            $("#bb-prompt-default").click(function(e) {
                e.preventDefault();
                bootbox.prompt("What is your favourite JS library?", "Cancel", "OK", function(result) {
                    console.log("Result: "+result);
                }, "jQuery");
            });
            $("#bb-dialog").click(function(e) {
                e.preventDefault();
                bootbox.dialog("I am a custom dialog", [{
                    "label" : "Success!",
                    "class" : "btn-success",
                    "callback": function() {
                        console.log("great success");
                    }
                }, {
                    "label" : "Danger!",
                    "class" : "btn-danger",
                    "callback": function() {
                        console.log("uh oh, look out!");
                    }
                }, {
                    "label" : "Click ME!",
                    "class" : "btn-primary",
                    "callback": function() {
                        console.log("Primary button");
                    }
                }, {
                    "label" : "Just a button..."
                }]);
            });
            $("#bb-dynamic").click(function(e) {
                e.preventDefault();
                var str = $("<p>This content is actually a jQuery object, which will change in 3 seconds...</p>");
                bootbox.dialog(str, {
                    "label" : "OK",
                    "class" : "btn-beoro-3"
                });
                setTimeout(function() {
                    str.html("See?");
                }, 3000);
            });
            $("#bb-no-backdrop").click(function(e) {
                e.preventDefault();
                bootbox.dialog("This dialog does not have a backdrop element",
                {
                    "OK": function() {}
                }, {
                    "backdrop": false
                });
            });
        }
    };