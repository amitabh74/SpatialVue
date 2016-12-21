<%@ page session="true" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ page
	import="org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter"%>
<%@ page
	import="org.springframework.security.core.AuthenticationException"%>


<%@ page session="true"%> 

<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
<head>
<title>RoW Login</title>
<link rel="stylesheet"
				href="<c:url value="./resources/styles/landing.css" />"
				type="text/css" media="screen, projection" />
				
	<link rel="stylesheet"
	href="<c:url value="./resources/scripts/jquery-ui-1.8.13/css/redmond/jquery-ui-1.8.13.custom.css" />"
	type="text/css" media="screen, projection" />			
				
				
	<script
	src="<c:url value="./resources/scripts/jquery-1.7.1/jquery-1.7.1.min.js"  />"
	type="text/javascript"></script>
<script
	src="<c:url value="./resources/scripts/jquery-ui-1.8.13/jquery-ui-1.8.13.custom.min.js"  />"
	type="text/javascript"></script>			
				
				
				
				
				
				

</head>

<body onload='document.loginForm.j_username.focus();'>



<% 
String LOGIN_ERR = "";
String auth_fail_status = "";
String getURL=request.getQueryString();
String requestParam = request.getQueryString();

    String urlLang = request.getQueryString();
    String lang = null;
    
    if(urlLang != null){
    	int pos = urlLang.indexOf("=");
    	if(pos > -1){
			lang = urlLang.substring(++pos);
		}else{
			lang = "en";
		}
    }else{	
		lang = request.getHeader("accept-language");
		int pos = lang.indexOf(",");
		if(pos > -1){
			lang = lang.substring(0, pos);
			if(lang.indexOf("en") != -1){
				response.sendRedirect("./login?lang=en"); 
			}else{
				response.sendRedirect("./login?lang=cy"); 
			}
		}else{
			response.sendRedirect("./login?lang=en"); 
		}
    }
    

if(requestParam == null){
	requestParam = "param=1";
}
if(requestParam.indexOf("login_error") == -1){
	String[] params = requestParam.split("&");
	for(int i=0; i<params.length; i++){
		//System.out.println("request attributes: " + i + "is " + params[i]);
		String[] reqParam = params[i].split("=");
		//System.out.println("request attribute: " + reqParam[0] + " " + reqParam[1]);
		session.setAttribute(reqParam[0], reqParam[1]);
	}
	//session.setAttribute("param", requestParam);
}
if(getURL != null){
	if(getURL.equalsIgnoreCase("login_error=1")){
		//out.println("<div class='auth-fail'>Credentials supplied are incorrect</div>");
		//auth_fail_status = "Login credentials incorrect";
		//System.out.println(">>>>>>>"+ lang);
		auth_fail_status = (lang.equalsIgnoreCase("cy")?"Cymwysterau anghywir Mewngofnodi":"Login credentials incorrect");
	}else if(getURL.equalsIgnoreCase("access_denied=1")){
		//out.println("<div class='auth-fail'>You are not authorized to access the application</div>");
		//auth_fail_status = "Un-authorized access not allowed";
		auth_fail_status = (lang.equalsIgnoreCase("cy")?"Un-authorized access not allowed":"Un-authorized access not allowed");
	}
}

 %>
 
 <div id="header">
	<div class="widthheader">
		<div class="leftheader">
			<c:choose>
			  <c:when test="${lang=='cy'}">
					<a href="http://www.eryri-npa.gov.uk/cym/home">
               			<img src="<c:url value="resources/images/viewer/logo-text_welsch.png" />" />
					</a>
               </c:when>
               <c:otherwise>
					<a href="http://www.eryri-npa.gov.uk/home">
               			<img src="<c:url value="resources/images/viewer/logo-text.png" />" />
               		</a>
               </c:otherwise>
            </c:choose>
        </div>
	</div>
</div>
 
 
<div class="loginPannel">
<form id="loginForm" name="loginForm" action="j_spring_security_check"
		method="post">
	
	<div id="main">
		<div id="login-box">
         	<div class="form-shift">
     			<table align="center" width="95%">
      			<tr>
            		<td style="padding-left:5px;">
                		<H2 class="loginTitle" ><span>Login</span></H2>
                	</td>
            	</tr>
                <tr class="loginrow">
                    <td id="login-box-name1">
					
					<div class="formElement">
						<div id="authfail_div" class="auth"> </div>
                        <div id="login" class="lbllogin">
						</div>
						<div id="login-box-field"><input class="form-login" id="usernameField" type="text" name="j_username" <c:if test="${not empty param.login_error}">value='<%= session.getAttribute(UsernamePasswordAuthenticationFilter.SPRING_SECURITY_LAST_USERNAME_KEY) %>'</c:if>/></div>
						<div id="helptxt" >
						</div>
						</div>
						
						
						
						
						
											<div class="formElement">
                        <div id="pwd" class="lbllogin">
						</div>
						<div id="login-box-field">
						 <input  class="form-login" id="passwordField" type="password" name="j_password" />
						</div>
						
						</div>
						
						
						 <input class="loginbutton" id="btnLogin" type="submit" value="Login/Mewngofnodi" />
						 
						 
						 <div>
						 <!--<a href="./forgetPassword" id="forgot_pwd"></a> | 
					     <a href="./register" id="register"></a>-->
					     <a href="#" id="forgot_pwd" onclick="forgotPwd();"></a> | 
					     <!--a href="./register" id="register"></a-->  
						<a href="#" id="register" onclick="regUser();"></a> 						 
						 </div>	
						 
						 <div style="color: #333333;font-size: 11px; margin-top: 60px; word-spacing:-0.1em;">
						 <span id="termCondition"></span>
							<a id="lnk_termCondition" href="#" target="_blank"></a>
						 </div>
                    </td>
                </tr>
               
            
            </table>
            </div>
           </div>
          </div>
</form>



</div>



<script language="javascript">			
		var auth_status = "<%=auth_fail_status%>";
		var language = "<%=lang%>";
		displayLanguageStrings(language);
		var authDiv = document.getElementById("authfail_div");
		//if(auth_status.length > 0 && language.indexOf("cy")>-1){
		//	auth_status = "Cymwysterau anghywir Mewngofnodi";
		//}
		authDiv.appendChild(document.createTextNode(auth_status));
		
		function displayLanguageStrings(lang){
			//alert(lang);
			var login = document.getElementById("login");
			var password = document.getElementById("pwd");
			var btn = document.getElementById("btnLogin");
			var register = document.getElementById("register");
			var helptxt = document.getElementById("helptxt");
			//if(lang.indexOf("cy") > -1){
			if(lang=="cy"){
				//document.title = "RHT Login";
				login.appendChild(document.createTextNode("Defnyddiwr:"));
				password.appendChild(document.createTextNode("Cyfrinair:"));
				btn.value = "Mewngofnodi";
				forgot_pwd.appendChild(document.createTextNode("Anghofio cyfrinair"));
				register.appendChild(document.createTextNode("Cofrestru"));
				helptxt.appendChild(document.createTextNode("(enghraifft: enw@ebost.com)"));
				$('.loginTitle').css("background-image", "url(resources/images/Login-Text_cy.png)");
				$(document).attr('title', 'Mewngofnodi HT');
				$('#termCondition').html("Noder os gwelwch yn dda drwy gofrestru eich bod yn cytuno gyda’r Telerau a’r Amodau sy’n berthnasol i wefan Awdurdod Parc Cenedlaethol Eryri a mapio ar-lein, a gellir darllen y Telerau a’r Amodau ");
				$('#lnk_termCondition').attr('href','http://www.eryri-npa.gov.uk/cym/terms-and-conditions');
				$('#lnk_termCondition').text('yma');
			}else
				//if(lang.indexOf("en") > -1)
			{
				login.appendChild(document.createTextNode("User name:"));
				password.appendChild(document.createTextNode("Password:"));
				btn.value = "Login";
				forgot_pwd.appendChild(document.createTextNode("Forgot Password")); 
				register.appendChild(document.createTextNode("Register"));
				helptxt.appendChild(document.createTextNode("(example: name@email.com)"));
				$('.loginTitle').css("background-image", "url(resources/images/Login-Text.png)");
				$(document).attr('title', 'RoW Login');
				$('#termCondition').html("Please note that by registering you are agreeing to the Terms and Conditions for the Snowdonia National Park Authority website and online mapping, which can be read ");
				$('#lnk_termCondition').attr('href','http://www.eryri-npa.gov.uk/terms-and-conditions');
				$('#lnk_termCondition').text('here');
			}
		}
		
		function forgotPwd(){
			var language = "<%=lang%>";
			if(language.indexOf("cy") > -1){
				document.location.href = "./forgetPassword?lang=cy";
			}else{
				document.location.href = "./forgetPassword?lang=en";
			}
		}
		
		function regUser(){
			
			var language = "<%=lang%>";
			if(language.indexOf("cy") > -1){
				document.location.href = "./register?lang=cy";
			}else{
				document.location.href = "./register?lang=en";
			}
		//
		}
</script>


	

</body>

</html>