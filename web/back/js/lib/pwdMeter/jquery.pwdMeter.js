/**
@name jQuery pwdMeter 1.0.1
@author Shouvik Chatterjee (mailme@shouvik.net)
@date 31 Oct 2010
@modify 31 Dec 2010
@license Free for personal and commercial use as long as the author's name retains
*/
(function(jQuery){

jQuery.fn.pwdMeter = function(options){


	options = jQuery.extend({
		minLength: 6,
		displayGeneratePassword: false,
		generatePassText: 'Password Generator',
		generatePassClass: 'GeneratePasswordLink',
		randomPassLength: 13,
        passwordBox: this,
        neutralText: "",
        veryWeakText: "Very weak",
        weakText: "Weak",
        mediumText: "Medium",
        strongText: "Strong",
        veryStrongText: "Very Strong"
	}, options);


	return this.each(function(index){
	
		$(this).keyup(function(){
			evaluateMeter();
		});
		
		
		function evaluateMeter(){

			var passwordStrength   = 0;
			var password = $(options.passwordBox).val();

			if ((password.length > 0) && (password.length <=5)) passwordStrength=1;
		
			if (password.length >= options.minLength) passwordStrength++;

			if ((password.match(/[a-z]/)) && (password.match(/[A-Z]/)) ) passwordStrength++;

			if (password.match(/\d+/)) passwordStrength++;

			if (password.match(/.[!,@,#,$,%,^,&,*,?,_,~,-,(,)]/))	passwordStrength++;

			if (password.length > 12) passwordStrength++;
		
			$('#pwdMeter').removeClass("progress-success progress-warning progress-danger");
        
			switch(passwordStrength){
			case 1:
                $('#pwdMeter').addClass('progress-danger');
                $('#pwdMeter .bar').width('16%');
                $('#pwdMeter .pwdText').text(options.veryWeakText);
                break;
			case 2:
                $('#pwdMeter').addClass('progress-danger');
                $('#pwdMeter .bar').width('33%');
                $('#pwdMeter .pwdText').text(options.weakText);
            break;
			case 3:
                $('#pwdMeter').addClass('progress-warning');
                $('#pwdMeter .bar').width('50%');
                $('#pwdMeter .pwdText').text(options.mediumText);
			break;
			case 4:
                $('#pwdMeter').addClass('progress-success');
                $('#pwdMeter .bar').width('75%');
                $('#pwdMeter .pwdText').text(options.strongText);
            break;
			case 5:
                $('#pwdMeter').addClass('progress-success');
                $('#pwdMeter .bar').width('100%');
                $('#pwdMeter .pwdText').text(options.veryStrongText);
		    break;		  		  		  
			default:
                $('#pwdMeter').addClass('progress-danger');
                $('#pwdMeter .bar').width('0%');
                $('#pwdMeter .pwdText').text(options.neutralText);
			}		
		
		}
		
	
		if(options.displayGeneratePassword){
            if($('#pwdGenerator').length) {
                $('#pwdGenerator').append('<a href="javascript:void(0)" id="Spn_PasswordGenerator" class="btn btn-mini '+options.generatePassClass+'">'+ options.generatePassText +'</a><br><span id="Spn_NewPassword" class="NewPassword"></span>');
            }
		}
		
		$('#Spn_PasswordGenerator').click(function(){
			var randomPassword = random_password();
			$('#Spn_NewPassword').text(randomPassword);
			$(options.passwordBox).val(randomPassword);
			evaluateMeter();
		});
		
		
		function random_password() {
			var allowed_chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz!?$?%^&*()_-+={[}]:;@~#|\<,>.?/";
			var pwd_length = options.randomPassLength;
			var rnd_pwd = '';
			for (var i=0; i<pwd_length; i++) {
				var rnd_num = Math.floor(Math.random() * allowed_chars.length);
				rnd_pwd += allowed_chars.substring(rnd_num,rnd_num+1);
			}
			return rnd_pwd;
		}		
	
	});

}

})(jQuery)
