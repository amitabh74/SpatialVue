/* Copyright (c) 2006-2011 by OpenLayers Contributors (see authors.txt for 
 * full list of contributors). Published under the Clear BSD license.  
 * See http://svn.openlayers.org/trunk/openlayers/license.txt for the
 * full text of the license. */

/* 
 * @requires OpenLayers/BaseTypes.js
 * @requires OpenLayers/Lang/en.js
 * @requires OpenLayers/Console.js
 */
 
/*
 * TODO: In 3.0, we will stop supporting build profiles that include
 * OpenLayers.js. This means we will not need the singleFile and scriptFile
 * variables, because we don't have to handle the singleFile case any more.
 */

(function() {
    /**
     * Before creating the SpatialVue namespace, check to see if
     * SpatialVue.singleFile is true.  This occurs if the
     * SpatialVue/SingleFile.js script is included before this one - as is the
     * case with old single file build profiles that included both
     * SpatialVue.js and SpatialVue/SingleFile.js.
     */
    var singleFile = (typeof SpatialVue == "object" && SpatialVue.singleFile);
    
    /**
     * Relative path of this script.
     */
    var scriptName = (!singleFile) ? "lib/SpatialVue.js" : "SpatialVue.js";

    /*
     * If window.SpatialVue isn't set when this script (SpatialVue.js) is
     * evaluated (and if singleFile is false) then this script will load
     * *all* SpatialVue scripts. If window.SpatialVue is set to an array
     * then this script will attempt to load scripts for each string of
     * the array, using the string as the src of the script.
     *
     * Example:
     * (code)
     *     <script type="text/javascript">
     *         window.SpatialVue = [
     *             "SpatialVue/Util.js",
     *             "SpatialVue/BaseTypes.js"
     *         ];
     *     </script>
     *     <script type="text/javascript" src="../lib/SpatialVue.js"></script>
     * (end)
     * In this example SpatialVue.js will load Util.js and BaseTypes.js only.
     */
    var jsFiles = window.SpatialVue;

    /**
     * Namespace: SpatialVue
     * The SpatialVue object provides a namespace for all things SpatialVue
     */
    window.SpatialVue = {
        /**
         * Method: _getScriptLocation
         * Return the path to this script. This is also implemented in
         * SpatialVue/SingleFile.js
         *
         * Returns:
         * {String} Path to this script
         */
        _getScriptLocation: (function() {
            var r = new RegExp("(^|(.*?\\/))(" + scriptName + ")(\\?|$)"),
                s = document.getElementsByTagName('script'),
                src, m, l = "";
            for(var i=0, len=s.length; i<len; i++) {
                src = s[i].getAttribute('src');
                if(src) {
                    var m = src.match(r);
                    if(m) {
                        l = m[1];
                        break;
                    }
                }
            }
            return (function() { return l; });
        })()
    };

    /**
     * SpatialVue.singleFile is a flag indicating this file is being included
     * in a Single File Library build of the SpatialVue Library.
     * 
     * When we are *not* part of a SFL build we dynamically include the
     * SpatialVue library code.
     * 
     * When we *are* part of a SFL build we do not dynamically include the 
     * SpatialVue library code as it will be appended at the end of this file.
     */
    if(!singleFile) {
        if (!jsFiles) {
            jsFiles = [
                    	
               "openlayers/OpenLayers.js",
               "openlayers/Watermark.js",
               "openlayers/MapQuestOSM.js",
               "openlayers/LayerSwitcherNew.js",
               "openlayers/UndoRedo.js",
               "jquery-1.7.1/jquery-1.7.1.min.js",                        
               "jquery-1.6.3/jquery.cookie.js",
               "jquery-1.6.3/jquery.formHints.js",
               "jquery-ui-1.8.13/jquery-ui-1.8.13.custom.min.js",
               "jquery-i18n/jquery.i18n.js",
               "jquery-localize/jquery.localize.js",
               "jquery-meerkat/jquery.meerkat.1.3.min.js",
               "jquery-tmpl/jquery.tmpl.min.js",
               "jquery-alert/jquery.alerts.js",
               "jquery.a-tools/jquery.a-tools-1.5.2.min.js",
               "jquery-tiptip/jquery.tipTip.js",
               "msdropdown/js/jquery.dd.js",               
               "contextmenu/jquery.contextMenu.js",
               "qtip2/jquery.qtip.min.js",
               "jqGrid/jquery.jqGrid.min.js",
               "dynatree/jquery.dynatree.js",
               "jcarousel/lib/jquery.jcarousel.js",
               "jquery-dropdown/js/jquery.ui.dropdown.js",
               "jquery-spinner/ui.spinner.js",
               "colorpicker/js/colorpicker.js",
               "xmljs/tinyxmldom.js",
               "xmljs/tinyxmlw3cdom.js",
               "xmljs/tinyxmlsax.js",
               "xmljs/tinyxmlxpath.js", 
               
               "tablesorter/jquery.tablesorter.min.js",
               "tablesorter/addons/pager/jquery.tablesorter.pager.js",
               "tablesorter/addons/filter/jquery.tablesorter.filer.js",
               "jquery-validate/jquery.validate.js",
               "jquery-form/jquery.form.js",
               
               /*
               "json-js/cycle.js",
               "json/json_parse_state.js",
               "json/json_parse.js",
               "json/json.js",
               "json/json2.js",
               */
               
               "/spatialvue/Constant.js",
               "/spatialvue/SpatialVue_Constants.js",
               
              
               
               
               "/spatialvue/studio/bookmark.js",
               "/spatialvue/studio/common.js",
               "/spatialvue/studio/dbconn.js",
               "/spatialvue/studio/importdata.js",
               "/spatialvue/studio/layer.js",
               "/spatialvue/studio/layergroups.js",
               "/spatialvue/studio/maptip.js",
               "/spatialvue/studio/project.js",
               "/spatialvue/studio/role.js",
               "/spatialvue/studio/studio.js",
               "/spatialvue/studio/style.js",
               "/spatialvue/studio/unit.js",
               "/spatialvue/studio/user.js",
               "/spatialvue/studio/AnnualHolidayCalendar.js",
               "/spatialvue/studio/configSetting.js",
               "/spatialvue/studio/calendarSetting.js"              
               
               
            ]; // etc.
        }

        // use "parser-inserted scripts" for guaranteed execution order
        // http://hsivonen.iki.fi/script-execution/
        var scriptTags = new Array(jsFiles.length);
        var host = SpatialVue._getScriptLocation() + "resources/scripts/";
        for (var i=0, len=jsFiles.length; i<len; i++) {
            scriptTags[i] = "<script src='" + host + jsFiles[i] +
                                   "'></script>"; 
        }
        if (scriptTags.length > 0) {
            document.write(scriptTags.join(""));
        }
    }
})();

/**
 * Constant: VERSION_NUMBER
 */
SpatialVue.VERSION_NUMBER="0.1";
var undoredo = null;