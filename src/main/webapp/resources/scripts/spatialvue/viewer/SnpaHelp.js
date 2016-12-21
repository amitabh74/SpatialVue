/**
 * 
 */

function openHelpWindow(helpTool){
		if(lang=='cy'){
		helpTool=helpTool+'_cy';
		}
		/*else{
			helpTool=helpTool+'_en';	
		}*/
		window.open('resources/templates/viewer/help/' + helpTool + '.html', 'Help', 
				'width=800,height=500,scrollbars=1');
}