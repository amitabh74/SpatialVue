<%@ page session="true" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<link rel="stylesheet"
				href="<c:url value="./resources/styles/landing.css" />"
				type="text/css" media="screen, projection" />

<link rel="stylesheet"
	href="<c:url value="./resources/scripts/jquery-ui-1.8.13/css/redmond/jquery-ui-1.8.13.custom.css" />"
	type="text/css" media="screen, projection" />

<link rel="stylesheet" type="text/css" media="print, projection, screen"
	href="<c:url value="./resources/scripts/jquery-alert/jquery.alerts.css" />" />

<script
	src="<c:url value="./resources/scripts/jquery-1.7.1/jquery-1.7.1.min.js"  />"
	type="text/javascript"></script>
<script
	src="<c:url value="./resources/scripts/jquery-ui-1.8.13/jquery-ui-1.8.13.custom.min.js"  />"
	type="text/javascript"></script>
<script
	src="<c:url value="./resources/scripts/jquery-validate/jquery.validate.js"  />"
	type="text/javascript"></script>
<script type="text/javascript"
	src="<c:url value="./resources/scripts/spatialvue/studio/registerUser.js" />"></script>
	
<script type="text/javascript"
	src="<c:url value="./resources/scripts/jquery-alert/jquery.alerts.js" />"></script>



	
<script type="text/javascript">

function translateRegisterStrings(){

<%
String urlLang = request.getParameter("lang");
String lang = null;
	if(urlLang.equalsIgnoreCase("cy")){	
		lang="cy";
	}
	else{
		lang = "en";
	}
%>

var language = "<%=lang%>";
if(language=="cy"){
		$("#reg_registration").html("Cofrestru");
		$("#reg_info").html("I gofrestru mewnfwydwch eich manylion ar y ffurflen isod. Mae'n orfodol i lenwi meysydd sydd wedi ei nodi â <em>&#42;</em>");
		$("#reg_name").html("Enw <em>&#42;</em>");
		$("#reg_password").html("Cyfrinair <em>&#42;</em>");
		$("#reg_confirmPassword").html("Aildeipio Cyfrinair <em>&#42;</em>");
		$("#reg_phone").html("Ffôn <em>&#42;</em>");
		$("#reg_mobile").html("Symudol");		
		$("#reg_langpref").html("Dewis Iaith <em>&#42;</em>");
		$("#reg_email").html("E-bost (i'w ddefnyddio fel enw defnyddiwr) <em>&#42;</em>");
		$("#reg_address").html("Cyfeiriad <em>&#42;</em>");
		//$('#btnSubmit').css("background-image", "url(resources/images/viewer/button-sign-up-now_cy.png)");
		$('#btnSubmit').css("background-position", "-395px 0px");
		$('#btnSubmit').hover (function(){
        $('#btnSubmit').css('background-position', "-395px -48px");
    } , function(){
        $('#btnSubmit').css('background-position', '-395px 0px');
    });
	
		$('#btnBack').css("background-position","-280px 0px");
			$('#btnBack').hover (function(){
        $('#btnBack').css('background-position', "-280px -48px");
    } , function(){
        $('#btnBack').css('background-position', '-280px 0px');
    });
	
	
	
	
		
		
	}else{
		$("#reg_registration").html("Registration");		
		$("#reg_info").html("To register please enter your details on the form below. Fields marked with <em>&#42;</em> are mandatory.");
		$("#reg_name").html("Name <em>&#42;</em>");		
		$("#reg_password").html("Password <em>&#42;</em>");
		$("#reg_confirmPassword").html("Re-Enter Password <em>&#42;</em>");
		$("#reg_phone").html("Phone <em>&#42;</em>");
		$("#reg_mobile").html("Mobile");		
		$("#reg_langpref").html("Language Pref <em>&#42;</em>");
		$("#reg_email").html("email (use as user name) <em>&#42;</em>");
		$("#reg_address").html("Address <em>&#42;</em>");
		$('#btnSubmit').css("background-image", "url(resources/images/viewer/button-sign-up-now.png)");
		//$('#btnBack').css("background-image", "url(resources/images/viewer/button-sign-up-now_cy.png)");
	}




}


</script>

<title>Registration Form</title>
</head>
<body onload="translateRegisterStrings();">
	<!--start:header-->
	<div id="header">
		<div class="widthheader">
			<div class="leftheader">
				<%if(lang.equalsIgnoreCase("cy")){	
				%>
				<a href="http://www.eryri-npa.gov.uk/cym/home">
					<img src="<c:url value="resources/images/viewer/logo-text_welsch.png" />" />
				</a>
				<%}else{								
				%>
				<a href="http://www.eryri-npa.gov.uk/home">
					<img src="<c:url value="resources/images/viewer/logo-text.png" />" />
				</a>		
				<%}								
				%>
				
			</div>

		</div>
	</div>


	<!--end:header-->
	<form class="cmxform" id="publicUserForm" onsubmit="return false;">
		<div id="signup-form">
			<ul id="company-info" class="section">
				<li class="header"><span></span>
					<h3><div id="reg_registration"></div></h3>
					<h4><div id="reg_info"></div>
						
					</h4></li>
				<li><span> <label for="userName"><span id="reg_name"></span>
					</label> <input type="text" class="int" id="name" name="name" value="" /> 
						<div class="field_with_errors">
					<div id="errName" name="errName" style="display:none" class="formError"></div>
					</div>
					</span>
				</li>


				<li><span> <label for="userName"><span id="reg_password"></span>
					</label> <input type="password" class="int" id="password" name="password"
						value="" /> 
						<div class="field_with_errors">
					<div style="display:none" id="errPassword" name="errPassword" class="formError"></div>
						</div>
						
						</span></li>

				<li><span> <label for="userName"><span id="reg_confirmPassword"></span>
					</label> <input type="password" class="int" id="confirmPassword"
						name="confirmPassword" value="" />
						<div style="display:none" id="errConfirmPassword" name="errConfirmPassword" class="formError"></div>
						</span>
						</li>


				<li><span> <label><span id="reg_phone"></span>
					</label> <input type="text" class="int" id="phone" name="phone" value="" onblur="javascript:formatPhone();" />
					
					<div style="display:none" id="errPhone" name="errPhone" class="formError"></div>
					
				</span></li>


				<li><span> <label><span id="reg_mobile"></span></label> <input type="text"
						class="int" id="mobile" name="mobile" value="" onblur="javascript:formatMobile();" />
						<div style="display:none" id="errMobile" name="errMobile" class="formError">
						
						</div>
						</span>
						
						</li>

				<li><span> <label><span id="reg_langpref"></span>
					</label> <select id="langpref" name="langpref">
							<%if(lang.equalsIgnoreCase("cy")){	
							
							%>
							<option value="">Dewis Iaith</option>
							<option value="English">English</option>
							<option value="Cymraeg">Cymraeg</option>
							<%}else{								
							%>
							<option value="">Select Language</option>
							<option value="English">English</option>
							<option value="Cymraeg">Cymraeg</option>
							<%}								
							%>
							
					</select> 
					<div style="display:none" id="errlang" name="errlang" class="formError"></div>
					
					</span>
					
					</li>
				<li><span> <label><span id="reg_email"></span>
					</label> <input type="text" class="int" id="email" name="email" value="" />
					<div style="display:none" id="errEmail" name="errEmail" class="formError"></div>
				</span></li>
				<li><span> <label><span id="reg_address"></span>
					</label> <textarea id="address" class="qb_querybox" rows="2" name="address"
							spellcheck="false"> </textarea>
							<div style="display:none" id="errAddress" name="errAddress" class="formError"></div>
							</span>
							</li>
				<li class="bottom">
				<input id="btnSubmit" class="btn-w" type="submit" value="Submit" onclick="javascript:registerUsers('<%=lang%>');" />
				<input id="btnBack" class="btn-w" type="submit" value="Back" onclick="javascript:backToLogin('<%=lang%>');" />
				</li>
			</ul>

		</div>
	</form>
</body>
</html>