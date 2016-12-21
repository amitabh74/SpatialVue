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
jQuery(document).ready(function() {
	$.ajaxSetup ({cache: false});	//Always Refresh From server
	
	$('#_loader').hide();
	
	jQuery.ajaxSetup({
        beforeSend: function () {
            $('#_loader').show();
        },
        complete: function () {
            $('#_loader').hide();
        },
        success: function () {
            $('#_loader').hide();
        },
        error: function () {
            $('#_loader').hide();
        }
    });
	
	var $items = $('#vtab>ul>li');

	$items.click(function(e) {

		var id = e.currentTarget.id;
		switch (id) {
		case "project":
			var project = new Project(id);
			break;
		case "layer":
			var layer = new Layer(id);
			break;
		case "layergroup":
			var layergroup = new LayerGroup(id);
			break;	
		case "unit":
			var unit = new Unit(id);
			break;
		case "user":
			var user = new User(id);
			break;
		case "role":
			var role = new Role(id);
			break;
		case "bookmark":
			var bookmark = new Bookmark(id);
			break;
		case "maptip":
			var maptip = new MapTip(id);
			break;
		case "dbconnection":
			var dbConn = new DBConnection(id);
			break;
		case "importdata":
			var importdata = new ImportData(id);
			break;
		case "style":
			var style = new Style(id);
			break;
		case "configsetting":
			var configsetting = new ConfigSetting(id);
			break;
		case "calendarsetting":
			var aAnnualHolidayCalendar=new AnnualHolidayCalendar(id);
			break;
		default:
		}

		$items.removeClass('selected');
		$(this).addClass('selected');

		var index = $items.index($(this));
		$('#vtab>div').hide().eq(index).show();
	}).eq(0).click();

});