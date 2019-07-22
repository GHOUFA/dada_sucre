var type_soc = "{{ constant('Agence\\TicketingBundle\\Entity\\Client::TYPE_SOCIETY') }}";

var checkedSociety = function(){
    var type = $('input[name=type_client]:checked').val();

    if(type_soc == type){
        $('.os-society').show();
        $("#agence_ticketingbundle_client_registration").prop('required',true);
    }
    else{
        $("#agence_ticketingbundle_client_registration").prop('required',false);
        $('.os-society').hide();
    }
}

var checkedType = function(){
    var type = $('input[name=type_client_1]:checked').val();

    if(type_soc == type){
        $("#select_passenger").hide();
        $("#select_society").show();
        $("#select_society").prop('required',true);
        $("#select_passenger").prop('required',false);
    }
    else{
        $("#select_passenger").show();
        $("#select_society").hide();
        $("#select_passenger").prop('required',true);
        $("#select_society").prop('required',false);
    }
}

checkedType();
checkedSociety();

$( "input[name=type_client]" ).on( "click", checkedSociety );
$( "input[name=type_client_1]" ).on( "click", checkedType );