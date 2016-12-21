/* ----------------------------------------------------------------------
 * Copyright (c) 2011 by RMSI.
 * All Rights Reserved
 *
 * Permission to use this program and its related files is at the
 * discretion of RMSI Pvt Ltd.
 *
 * The licensee of RMSI Software agrees that:
 *    - Redistribution in whole or in part is not permitted.
 *    - Modification of source is not permitted.
 *    - Use of the source in whole or in part outside of RMSI is not
 *      permitted.
 *
 * THIS SOFTWARE IS PROVIDED ''AS IS'' AND ANY EXPRESSED OR IMPLIED
 * WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 * IN NO EVENT SHALL RMSI OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 * INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION)
 * HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT,
 * STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED
 * OF THE POSSIBILITY OF SUCH DAMAGE.
 * ----------------------------------------------------------------------
 */

var publicuserName='';
var savePublicUserData= function (_lang) {	
	jQuery.ajax({
        type: "POST",              
        url: "publicuser/register",
        data: jQuery("#publicUserForm").serialize(),
        success: function (data) {
        	if(data==1){
        		
				if(_lang=='cy'){
				jAlert("Mae defnyddiwr "+ publicuserName+" wedi cael ei gofrestu'n llwyddiannus ar system reoli HT APCE", 
				'Cofrestru', function () {
                    document.location.href = "login?lang=cy";
                 });
				 $('#popup_ok').attr("value", 'Iawn');
				 }
				 else{
					 jAlert('User '+ publicuserName+' has been registered successfully in SNPA RoW Management System', 
					'Register', function () {
						document.location.href = "login?lang=en";
					 });
					 $('#popup_ok').attr("value", 'Ok');
				 }

        	}
        	else if(data==2){
        		jAlert('Please try again','Register');
              	 //document.location.href = "login";
           	}
        	else if(data==3){
        		if(_lang=='cy'){
            		jAlert('Defnyddiwr mewn bodolaeth','Cofrestru');
            		$('#popup_ok').attr("value", 'Iawn');
            		}
            		else{
            			jAlert('User already exists','Register');
            			 $('#popup_ok').attr("value", 'Ok');
            		}

          	}
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
        	jAlert('Please try again ','Register');
        	 //document.location.href = "login";
        }
    });
	
}
function backToLogin(_lang){
var url = "login?lang=" + _lang;
		document.location.href = url;

}


function registerUsers(_lang){
	if(validate_form(_lang)){
		savePublicUserData(_lang);
	}
}

function validate_form (_lang)
{
	var valid = true;
	var msg;
	publicuserName=$("#name").val();
    if ( $.trim($("#name").val()) == "" )
    {
        valid = false;
		$("#errName").show();		
		$("#errName").text((_lang =='cy')?"Nodwch eich Enw os gwelwch yn dda." : "Please enter Name.");
		
		
    }
	else{
		$("#errName").hide();
	}
	
	if ( $.trim($("#password").val()) == "" )
    {
        $("#errPassword").show();		
		$("#errPassword").text((_lang =='cy')?"Nodwch gyfrinair os gwelwch yn dda." : "Please enter Password.");
        valid = false;
    }
	else{
		$("#errPassword").hide();
	}
	if ( $.trim($("#confirmPassword").val()) == "" )
    {
       	$("#errConfirmPassword").show();		
		$("#errConfirmPassword").text((_lang =='cy')?"Please re-enter Password." : "Please re-enter Password.");
        valid = false;
    }
	else{
	$("#errConfirmPassword").hide();
	}
	if ( $.trim($("#password").val()) != $.trim($("#confirmPassword").val()))
    {        
		$("#errConfirmPassword").show();	
		$("#errConfirmPassword").text((_lang =='cy')?"Dylai cadarnhau'r cyfrinair fod yr un peth a'r cyfrinair" : "Confirm Password should be same as Password.");
        valid = false;		
    }
	else{
	$("#errConfirmPassword").hide();
	}
	if ( $.trim($("#phone").val()) == "" )
    {       
		$("#errPhone").show();	
		$("#errPhone").html((_lang =='cy')?"Nodwch eich rhif ffôn  os gwelwch yn dda." : "Please enter Phone no.");
        valid = false;		
    }else{
		//if(!phoneNumberValidator($.trim($("#phone").val())))
		if(!formatPhone())
		{
		$("#errPhone").show();		
		$("#errPhone").html((_lang =='cy')?"Nodwch gyfeirnod ffôn os gwelwch yn dda." : "Please enter a valid Phone no.");
		valid = false;
		
	   }
	   else{
	$("#errPhone").hide();
	}
	}
	
	if ($.trim($("#mobile").val()) == "" )
    {
       /*
		$("#errMobile").show();
		$("#errMobile").text('Please enter mobile no');
        valid = false;
		*/
    } else{
	  //if(!numberValidator($.trim($("#mobile").val())))
	  if(!formatMobile())
	  {	   
		$("#errMobile").show();
		//$("#errMobile").text('Please enter a valid mobile no');
		$("#errMobile").html((_lang =='cy')?"Nodwch eich rhif ffôn  os gwelwch yn dda." : "Please enter a valid mobile no.");
		valid = false;		
	   }
	   else{
	$("#errMobile").hide();
	}
	}
	if ( $.trim($("#email").val()) == "" )
    {
	   $("#errEmail").show();	   
	   $("#errEmail").text((_lang =='cy')?"Nodwch eich e-bost os gwelwch yn dda" : "Please enter email.");
        valid = false;						
    }
	else{
	if(!emailValidator($.trim($("#email").val()))){	    
		$("#errEmail").show();		
		$("#errEmail").text((_lang =='cy')?"Nodwch gyfeirnod e-bost cywir os gwelwch yn dda" : "Please enter a valid email id.");
		valid = false;		
	   }
	   else{
	$("#errEmail").hide();
	}
	}
	if ($.trim($("#address").val()) == "" )
    {        
		$("#errAddress").show();	
		$("#errAddress").text((_lang =='cy')?"Nodwch eich cyfeiriad os gwelwch yn dda." : "Please enter address.");
        valid = false;		
    }
	else{
	$("#errAddress").hide();
	}
	if ( $.trim($("#langpref").val()) == "" )
    {       
		$("#errlang").show();	
		$("#errlang").text((_lang =='cy')?"Dewiswch iaith os gwelwch yn dda." : "Please select Language.");
        valid = false;		
    }
	else{
	$("#errlang").hide();
	}
	
   return valid;
}

function emailValidator(val){
	var emailExp = /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/;
	if(val.match(emailExp)){
		return true;
	}else{
		return false;
	}
}


function phoneNumberValidator(val){
	var  numExp = /\s\d/g;
	if(val.match(numExp)){
		return true;
	}else{
		return false;
	}
}

function numberValidator(val){
	var  numExp = /^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/;
	if(val.match(numExp)){
		return true;
	}else{
		return false;
	}
}


function numberValidator(val){
	var  numExp = /^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/;
	if(val.match(numExp)){
		return true;
	}else{
		return false;
	}
}


function lengthRestriction(value, min, max){
	
	if(value.length >= min && value.length <= max){
		return true;
	}else{
		//alert("Please enter between " +min+ " and " +max+ " characters");
		return false;
	}
}

function restfields(){
$("#name").val()="";
$("#password").val()="";
$("#confirmPassword").val()="";
$("#address").val()="";
$("#email").val()="";
$("#phone").val()="";
$("#mobile").val()="";
}


function formatPhone(){
	 number = $('#phone').val();
	 number = number.replace(/\s/g, "");
	 if(number != undefined && number != ""){
		 var regexLetter = /^[0-9]+$/;
		 if(regexLetter.test(number)){
			 _val = number.substring(0, 5);
			 _val = _val + " " + number.substring(5);
			 $('#phone').val(_val);
			 return true;
		 }else{
			 return false;
		 }
	 }else{
		 //jAlert("Invalid Mobile Number");
	 }
}

function formatMobile(){
	 number = $('#mobile').val();
	 if(number.length > 0){
	 	number = number.replace(/\s/g, "");
		 if(number != undefined && number != ""){
			 var regexLetter = /^[0-9]+$/;
			 if(regexLetter.test(number)){
				 _val = number.substring(0, 5);
				 _val = _val + " " + number.substring(5);
				 $('#mobile').val(_val);
				 return true;
			 }else{
				 //jAlert("Invalid Mobile Number");
				 return false;
			 }
		 }else{
			 //jAlert("Invalid Mobile Number");
		 }
	 }
}