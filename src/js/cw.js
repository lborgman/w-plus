/**
 * @license
 * jQuery Bookmarklet FrameWork - version 1.0
 * Originally idea by Brett Barros. Nothing left of that code, however.
 *
 * Copyright (c) 2014 Lennart Borgman, http://OurComments.org/.
 *
 * Released under the Creative Commons Attribution 3.0 Unported License,
 * as defined here: http://creativecommons.org/licenses/by/3.0/
 */

// Work on this page currently (iframe problems!). Maybe the iframe
// problem is solved, but now something seems to loop when I click on
// "påtalade" as a second word to the left of the first. Or, better,
// click on "ha" in that sentence and then on"jag". Very strange
// problem. I have tried just using the jQuery that is already loaded
// on the page and with a new jQuery. w+! with jQuery 2.0.3 crashes on
// exec RegExp for mail! Solved, bad regexp. Switched back to my own. Where did I get that from?:
//
// ========== gotWord BEGIN påtalade ================ cw-cld.js:42
// word1= 
// [span.findword727...
//
// http://www.lakartidningen.se/07engine.php?articleId=16470
//
// However if the first word is in the iframe, then a subsequent click
// on the main document will be displaced by the amount the iframe
// starts within the main document.
//
// Mouse move follow and dragging the menu does not work here. Looked
// at the events on shield, looks ok, but the events are not fired (
// sh=jQuery("#shield-findword72789"); jQuery._data(sh[0], "events")).
// Now it works. No idea why.


// Fix-me: Some CSS problems. Can't remember where now, but:
// - http://sydsvenskan.se/ - works


// Fix-me: Here it just dies after clicking the first word. No menu is
// visible. http://www.svt.se/nyheter/vetenskap/geotaggning-i-manniskohjarnan - works


// Fix-me: As above. http://integral-options.blogspot.se/2013/11/memories-geotagged-with-spatial.html - works


// Fix-me: It looks much bigger here: fixed.
// http://www.tunedbody.com/scientists-finally-show-thoughts-can-cause-specific-molecular-changes-genes/#

(function () {

    ////////////////////////////////////////////////////////////
    // Instructions.
    //
    // myOptions and myBookmarklet are used to get things going. You
    // probably do not want to change those names. The function
    // myBookmarklet (which you must write) is called with no
    // arguments when jQuery and the files below have been loaded.
    //
    //
    // Utility functions from the bookmarklet framework you can use:
    //
    //     function hasNeededVersion (need_version, has_version)
    //       Check if a needed version of a library already is loaded.
    //       Version numbers must be in the format 1.2.3.4 etc.
    //     function timeStamp (where)
    //       Writes elapsed time (ms) and WHERE to console.
    //
    // You can not use the name startTheBookmarklet(myOptions).
    //
    //
    // There is no need to namespace function names if they are
    // declared and run directly in this file since they are all local
    // here (everything is in an anonymous function here). But please
    // note that you must namespace things so they do ot clash with
    // the page you are on:
    // 
    // - Of course all global names must be namespaced. The solution
    //   is to not use any global names.
    //
    // - Event names must be namespaced (the way // jQuery does
    //   it).
    // 
    // - If you are using timers then all functions that are called in
    //   the timers must be name spaced.
    //
    // - For stylesheets you need namespaced ids and classes.
    //
    //
    // Below these instructions is your own space upto the marker
    // where the constant things begin. Enter whatever variables and
    // functions you want here. They will be locally defined. (But do
    // not forget to declare your variables. I you do they will have
    // global scope and possible disturb the web page where the
    // bookmarklet is used.)
    //
    // End of instructions etc.
    ////////////////////////////////////////////////////////////

    ////////////////////////////////////////////////////////////
    /// Start of Your bookmarklet space.
    ///
    /// Here You must:
    ///   - Set myNamespace.
    ///   - Set myURL. (Optional. Should be a comment.)
    ///   - Fill in myOptions.
    ///   - Write the function myBookmarklet.
    ///   - Follow the instructions for name spacing above.
    ///
    /// Here You can:
    ///   - Write as many functions as you want.
    ///   - Define as many variables as you like.
    /// (But be aware of "shadowing" of names.)

    var myNamespace = 'findword72789'; // For this bookmarklet, same as in .js file!
    // myURL='https://dl.dropbox.com/u/848981/it/cw/cw-cld.js';

    var myOptions = {
        // Note that you need full path names to files here!
        //
        // Enter the URL of CSS style files you want to load:
        css : [
            // "https://dl.dropbox.com/u/848981/it/cw/cw.css"
        ],
        // Enter the URL of javascript files you want to load:
        js  : [
            // "https://dl.dropbox.com/u/848981/it/jQuery.myPopupMenu.js"
        ],    
        // Enter jQuery info (note that you need to load via https):
        jqpath : null, // "https://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js",
        jquery : "2.0.3" // Min jQuery version number.
    };

    var myArgs;
    var myDate;
    var styleSheetProblems = false;
    var tellOnSetupPage = null;
    var isOnSetupPage = null;
    var resetOldFocus = null;
    var touchDevice = false;
    var mobile =
        (function(a){
            if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))
                return true;
            else
                return false;
        })(navigator.userAgent||navigator.vendor||window.opera);
    var tabindex = 1;
    if (mobile) tabindex = -1;

    function myBookmarklet() {
        // Enter you code for the bookmarklet here! This function is
        // ran after all .css and .js files has been loaded (inclusive
        // jQuery).
        //
        // Note that jQuery.noConflict() may have been done so you can
        // not use $() but must use jQuery() instead.
        timeStamp("Starting myBookmarklet...");
        if (('ontouchstart' in window) ||
            (navigator.maxTouchPoints > 0) ||
            (navigator.msMaxTouchPoints > 0)) {
            /* browser with either Touch Events of Pointer Events
               running on touch-capable device */
            touchDevice = true;
            // alert("touchDevice");
        }
        window.onload = function(){ console.log("WINDOW ONLOAD FIRED"); };
        // debugWinOut("Test!");

        // debugIt("screenTop"); // not defined in mobile
        // debugIt("screenLeft");

        // debugIt("window.scrollX");
        // debugIt("window.scrollY");
        // debugIt("document.documentElement.clientWidth"); // excluding scrollbar
        // debugIt("window.innerWidth"); // including scrollbar
        // debugIt("screen.width"); // monitor width on desktop
        // debugIt("screen.height"); // monitor width on desktop

        // console.log("supressFindword72789=", supressFindword72789);
        tellOnSetupPage = null;
        isOnSetupPage = document.getElementById("the-used-items-findword72789");
        if ("undefined" == typeof supressFindword72789) // global, set on setup page when starting from there
            tellOnSetupPage = isOnSetupPage;
        supressFindword72789 = undefined;
        console.log("tellOnSetupPage=", tellOnSetupPage);
        var sh = myShield();
        // if (sh && sh.is(":visible")) {
        if (sh && "block" == sh.style.display) {
            setStateDefault();
            return;
        }
        // load_bm_jQuery_fn_elementFromPoint();
        // loadDrags();

        createShield();
        createNoWord();
        addCss_cw_css_js();
        window[myNamespace+"CurrentWord"] = null;
        var old_focus_node = null;
        var old_focus_doc = document;
        var old_focus = [];
        var n_focus = 0;
        while (n_focus++ < 100 && !old_focus_node) {
            var elt = old_focus_doc.activeElement;
            old_focus.push(elt);
            if ("IFRAME" == elt.nodeName) {
                try {
                    old_focus_doc = elt.contentDocument;
                } catch(e) {
                    // We probably could not access it. Jump out.
                    old_focus_doc = null;
                }
                if (!old_focus_doc) {
                    n_focus = 200;
                }
            } else {
                old_focus.push(elt);
                old_focus_node = elt;
            }
        }
        var shield = document.getElementById("shield-"+myNamespace);
        shield.style.display = "block";
        resetOldFocus = function() {
            // old_focus.focus();
            if (!touchDevice) {
                console.log("resetOldFocus", old_focus);
                for (var i=0,len=old_focus.length; i<len; i++) {
                    old_focus[i].focus();
                }
            }
        };
        shield.addEventListener("click", findWord);
        document.addEventListener("keydown", evDocKeydown);

        var selObj = window.getSelection();
        var selText = selObj.toString();
        if (selText.length > 0 || tellOnSetupPage) {
            myTooltip().style.display = "none";
            if (0==selText.length) selText = ""; // Can't be blank!
            var myMenu = getMenu(selText);
            // Getting correct window width is a mess, but not necessary here:
            // https://bugzilla.mozilla.org/show_bug.cgi?id=189112#c7
            var winW = window.innerWidth;
            var winH = window.innerHeight;
            var menW = myMenu.offsetWidth;
            var menH = myMenu.offsetHeight;
            console.log("menW, menH", menW, menH);
            var left = 0.5 * (winW - menW) + window.pageXOffset; // scrollX is proposed 
            var top = 0.5 * (winH - menH) + window.pageYOffset;
            if (tellOnSetupPage) {
                jq = window["jQuery"]; // here we can use jQuery
                // var moreItemsOffset = jq("#more-items").offset();
                // left = moreItemsOffset.left + 5;
                // top  = moreItemsOffset.top - 150;
            }
            myMenu.style.position = "absolute";
            myMenu.style.display = "block";
            myMenu.style.top = top + "px"; // Does not work without "px"??
            myMenu.style.left = left + "px";
            execMenuWithCallbacks();
        } else {
            bindMouseMove();
        }
        timeStamp("myBookmarklet exit");
    }


    // http://tools.ietf.org/html/rfc2396
    // Incomplete, utf-8 chars can also be used, but unclear which
    // and how to list them here. Trying this:
    //   http://inimino.org/~inimino/blog/javascript_cset
    // var allutf8lower = "a-zªµºß-öø-ÿāăąćĉċčďđēĕėęěĝğġģĥħĩīĭįıĳĵķ-ĸĺļľŀłńņň-ŉŋōŏőœŕŗřśŝşšţťŧũūŭůűųŵŷźżž-ƀƃƅƈƌ-ƍƒƕƙ-ƛƞơƣƥƨƪ-ƫƭưƴƶƹ-ƺƽ-ƿǆǉǌǎǐǒǔǖǘǚǜ-ǝǟǡǣǥǧǩǫǭǯ-ǰǳǵǹǻǽǿȁȃȅȇȉȋȍȏȑȓȕȗșțȝȟȡȣȥȧȩȫȭȯȱȳ-ȹȼȿ-ɀɂɇɉɋɍɏ-ʓʕ-ʯͱͳͷͻ-ͽΐά-ώϐ-ϑϕ-ϗϙϛϝϟϡϣϥϧϩϫϭϯ-ϳϵϸϻ-ϼа-џѡѣѥѧѩѫѭѯѱѳѵѷѹѻѽѿҁҋҍҏґғҕҗҙқҝҟҡңҥҧҩҫҭүұҳҵҷҹһҽҿӂӄӆӈӊӌӎ-ӏӑӓӕӗәӛӝӟӡӣӥӧөӫӭӯӱӳӵӷӹӻӽӿԁԃԅԇԉԋԍԏԑԓԕԗԙԛԝԟԡԣա-ևᴀ-ᴫᵢ-ᵷᵹ-ᶚḁḃḅḇḉḋḍḏḑḓḕḗḙḛḝḟḡḣḥḧḩḫḭḯḱḳḵḷḹḻḽḿṁṃṅṇṉṋṍṏṑṓṕṗṙṛṝṟṡṣṥṧṩṫṭṯṱṳṵṷṹṻṽṿẁẃẅẇẉẋẍẏẑẓẕ-ẝẟạảấầẩẫậắằẳẵặẹẻẽếềểễệỉịọỏốồổỗộớờởỡợụủứừửữựỳỵỷỹỻỽỿ-ἇἐ-ἕἠ-ἧἰ-ἷὀ-ὅὐ-ὗὠ-ὧὰ-ώᾀ-ᾇᾐ-ᾗᾠ-ᾧᾰ-ᾴᾶ-ᾷιῂ-ῄῆ-ῇῐ-ΐῖ-ῗῠ-ῧῲ-ῴῶ-ῷⁱⁿℊℎ-ℏℓℯℴℹℼ-ℽⅆ-ⅉⅎↄⰰ-ⱞⱡⱥ-ⱦⱨⱪⱬⱱⱳ-ⱴⱶ-ⱼⲁⲃⲅⲇⲉⲋⲍⲏⲑⲓⲕⲗⲙⲛⲝⲟⲡⲣⲥⲧⲩⲫⲭⲯⲱⲳⲵⲷⲹⲻⲽⲿⳁⳃⳅⳇⳉⳋⳍⳏⳑⳓⳕⳗⳙⳛⳝⳟⳡⳣ-ⳤⴀ-ⴥꙁꙃꙅꙇꙉꙋꙍꙏꙑꙓꙕꙗꙙꙛꙝꙟꙣꙥꙧꙩꙫꙭꚁꚃꚅꚇꚉꚋꚍꚏꚑꚓꚕꚗꜣꜥꜧꜩꜫꜭꜯ-ꜱꜳꜵꜷꜹꜻꜽꜿꝁꝃꝅꝇꝉꝋꝍꝏꝑꝓꝕꝗꝙꝛꝝꝟꝡꝣꝥꝧꝩꝫꝭꝯꝱ-ꝸꝺꝼꝿꞁꞃꞅꞇꞌﬀ-ﬆﬓ-ﬗａ-ｚ]|\ud801[\udc28-\udc4f]|\ud835[\udc1a-\udc33\udc4e-\udc54\udc56-\udc67\udc82-\udc9b\udcb6-\udcb9\udcbb\udcbd-\udcc3\udcc5-\udccf\udcea-\udd03\udd1e-\udd37\udd52-\udd6b\udd86-\udd9f\uddba-\uddd3\uddee-\ude07\ude22-\ude3b\ude56-\ude6f\ude8a-\udea5\udec2-\udeda\udedc-\udee1\udefc-\udf14\udf16-\udf1b\udf36-\udf4e\udf50-\udf55\udf70-\udf88\udf8a-\udf8f\udfaa-\udfc2\udfc4-\udfc9\udfcb";
    var reHttp = "https?://["+"a-z"+"0-9_\.!~*'();/?:@&=+$,-]+";



    ///////////////////////////////////////////////////////////
    // Move
    // http://stackoverflow.com/questions/7278409/html5-drag-and-drop-to-move-a-div-anywhere-on-the-screen
    function move_drag_start(event) {
        this.style.opacity = "1.0"; // did not work
        var style = window.getComputedStyle(event.target, null);
        event.dataTransfer.setData("text/plain",
                                   (parseInt(style.getPropertyValue("left"),10) - event.clientX)
                                   + ',' + (parseInt(style.getPropertyValue("top"),10) - event.clientY)
                                   + ',' + event.target.id
                                  );
    } 
    function move_drag_over(event) { 
        event.preventDefault(); 
        return false; 
    } 
    function move_drop(event) { 
        var offset = event.dataTransfer.getData("text/plain").split(',');
        var dm = document.getElementById(offset[2]);
        dm.style.left = (event.clientX + parseInt(offset[0],10)) + 'px';
        dm.style.top = (event.clientY + parseInt(offset[1],10)) + 'px';
        event.preventDefault();
        return false;
    } 
    // var dm = document.getElementById('dragme'); 
    // dm.addEventListener('dragstart',move_drag_start,false); 
    // document.body.addEventListener('dragover',move_drag_over,false); 
    // document.body.addEventListener('drop',move_drop,false); 

    ///////////////////////////////////////////////////////////
    // Event handlers

    function evFocusout() {
        window[myNamespace+"-menuFocus"] = this;
        changeOutline(this, "none");
        // changeOutline(this, "#ef0 2px solid");
    };
    function evFocus() {
        // changeOutline(this, "rgb(139, 177, 212) 2px solid !important");
        // console.log("evFocus", this);
        changeOutline(this, "#ef0 2px solid");
    };

    function evDocKeydown(e) {
            // console.log("doc.keydown, e=", e);
	    switch( e.keyCode ) {
	    case 27: // esc
                setStateDefault();
		break;
            }
        };

    function evTheWordsFocus (){ setEndOfContenteditable(this); };

    function evTheWordsKeydown(ev){
        // Fixme: add this to googleSiteURL
	switch( ev.keyCode ) {
	case 38: // up
	case 40: // down
	case 13: // CR
            ev.preventDefault(); // Prevent jumping back/forward
            break;
        case 32:
            ev.stopPropagation(); // Prevent scrolling
            break;
        }
    };

    function evTheWordsKeyup(e){
        var words = this.textContent;
        if (0 == words.length)
            clearCurrentWord();
    };

    function evGoogleSiteBxChange(){
        var elt = document.getElementById("googleSiteURL-"+myNamespace);
        if (this.checked) {
            if (validSiteField()) {
                changeColor(elt, googleSiteActiveColor);
            } else {
                changeColor(googleSiteURLelt, googleSiteInvalidColor);
            }
        } else {
            changeColor(elt, googleSiteInactiveColor);
        }
    };

    function evGoogleSiteUpKeydown(e){
	switch( e.keyCode ) {
	case 32: // space
	case 13: // enter
            evGoogleSiteUpClick();
            e.stopImmediatePropagation();
            e.stopPropagation();
            e.preventDefault(); // This prevented scrolling.
            break;
        }
    };

    function evGoogleSiteURLKeydown(ev){
        if (32 == ev.keyCode) ev.stopImmediatePropagation(); // Prevent scrolling
    };
    function evGoogleSiteURLKeyup(ev){
        var googleSiteURLelt = document.getElementById("googleSiteURL-"+myNamespace);
        if (validSiteField()) {
            // this is fired when tabbing to this field! keyCode=9
            // console.log("googleSiteBx keyup, ev.keyCode", ev.keyCode);
            if (9 != ev.keyCode) {
                document.getElementById("googleSiteBx-"+myNamespace).checked = true;
                changeColor(googleSiteURLelt, googleSiteActiveColor);
            }
        } else {
            if (document.getElementById("googleSiteBx-"+myNamespace).checked)
                changeColor(googleSiteURLelt, googleSiteInvalidColor);
        }
    };

    function removeEventHandlers() {
        document.removeEventListener("keydown", evDocKeydown);

        //// I don't think those below must be removed according to
        //// the spec since they are all on the menu. Can they do any
        //// harm?
        //
        // https://developer.mozilla.org/en-US/docs/Web/API/EventTarget.addEventListener

        // document.getElementById("theWords-"+myNamespace).removeEventListener("focus", evTheWordsFocus);
        // document.getElementById("theWords-"+myNamespace).removeEventListener("keydown", evTheWordsKeydown);
        // document.getElementById("theWords-"+myNamespace).removeEventListener("keyup",evTheWordsKeyup);
        // document.getElementById("googleSiteBx-"+myNamespace).removeEventListener("change",evGoogleSiteBxChange);
        // document.getElementById("googleSiteUp-"+myNamespace).removeEventListener("keydown",evGoogleSiteUpKeydown);
        // document.querySelector("#googleSiteURL-"+myNamespace).removeEventListener("keydown",evGoogleSiteURLKeydown);
        // document.querySelector("#googleSiteURL-"+myNamespace).removeEventListener("keyup",evGoogleSiteURLKeyup);

        // var tab1 = document.querySelectorAll("#myMenu-"+myNamespace+" [tabindex='1']");
        // for (var i=0; i<tab1.length; i++) {
        //     tab1[i].removeEventListener("focusout", evFocusout);
        //     tab1[i].removeEventListener("focus", evFocus);
        // };
        // var shield = document.getElementById("shield-"+myNamespace);
        // shield.removeEventListener("click", findWord);
        // myShield().off("mousemove."+myNamespace);
    }

    function zoomed() {
        if (!mobile) return 1;
        return screen.width / window.innerWidth; // Assumes no scrollbars
    }
    function debugIt(toEval) {
        var str = toEval+"=";
        var val = "nothing done";
        try {
            val = eval(toEval);
        } catch(err) {
            val = err;
        }
        str += val;
        debugWinOut(str);
    }
    function debugWinOut(str) {
        var devDiv = document.getElementById("dbg"+myNamespace);
        if (!devDiv) {
            var style =
                "position:fixed;"
                +"top:0; left:0;"
                +"width:auto; height:auto;"
                +"background: yellow;"
                +"margin:0; padding0;"
                +"font-size:8px;"
            ;
            devDiv = mkElt("div",{"id":"dbg"+myNamespace, "style":style});
            document.body.appendChild(devDiv);
        }
        var msgP = mkElt("p", {"style":"margin:0;padding:0;border-bottom:1px solid #fc0"}, str);
        devDiv.appendChild(msgP);
    }
    function setStateDefault1() {
        // console.log("<<<<<<<<<<<<<< setStateDefault1 myNamespace="+myNamespace);
        myTooltip().style.display = "none";
        myShield().style.display = "none";
        noWordElt();
        unbindMenu(menuData());
        menu = myMenu();
        if (menu) menu.style.display = "none";
        removeEventHandlers();
        var devDiv = document.getElementById("dbg"+myNamespace);
        if (devDiv) document.body.removeChild(devDiv);
    }
    function setStateDefault() {
        finishMenu();
    }
    function bindMouseMove() {
        var tooltipElt = myTooltip(); // Cache for mousemove!
        // var tooltipElt = tooltip[0];
        var shieldElt = document.getElementById("shield-"+myNamespace);
        tooltipElt.style.display = "block";
        var checkTooltipExists = function() {
            shieldElt.removeEventListener("mousemove", checkTooltipExists);
            if (!tooltipElt) throw new Error("tooltip not valid", tooltip);
        };
        shieldElt.addEventListener("mousemove", checkTooltipExists);
        shieldElt.addEventListener("mousemove", function(ev){
            //// http://www.quirksmode.org/js/events_properties.html#position
	    posx = ev.clientX;
	    posy = ev.clientY;
            tooltipElt.style.top = (posy + 15) + "px";
            tooltipElt.style.left = (posx + 15) + "px";
        });
    }
    function findWord(ev) {
        // http://www.w3schools.com/jquery/event_pagex.asp
        // These are relative to the document. In this case the main document.
        ev.stopPropagation();
        ev.stopImmediatePropagation();
        var page_x = ev.pageX;
        var page_y = ev.pageY;
        var client_x = ev.clientX;
        var client_y = ev.clientY;
        return findWordAt(page_x, page_y, client_x, client_y);
    }
    // http://stackoverflow.com/questions/18953144/how-do-i-get-the-offset-top-value-of-an-element-without-using-jquery
    function findWordAt(page_x, page_y, client_x, client_y) {
        console.log("========== findWord at ("+page_x+","+page_y+","+client_x+","+client_y+")");
        var doc = window.document;
        var okNode = false;
        var n = 0;
        var iframes_client_x = 0;
        var iframes_client_y = 0;
        var elt;
        while (!okNode && n++ < 10) {
            myShield().style.display = "none";
            elt = doc.elementFromPoint(
                client_x - iframes_client_x,
                client_y - iframes_client_y
            );
            myShield().style.display = "block";
            // console.log("elt doc.eFP", elt);
            if ("HTML" == elt.nodeName) {
                console.log("HTML node");
            }
            if ("BODY" == elt.nodeName) {
                console.log("BODY node");
            }
            if ("IFRAME" == elt.nodeName) {
                doc = elt.contentDocument;
                if (console) console.log("iframe doc=",doc);
                if (!doc) {
                    tellNoWord(client_x, client_y, "cross-domain security restrictions?");
                    return;
                }
                var br = elt.getBoundingClientRect();
                iframes_client_x += br.left;
                iframes_client_y += br.top;
                iwin = doc.defaultView;
            } else okNode = true;
        }
        //// Convert to client coordinats in iframe window:
        var cx = client_x - iframes_client_x;
        var cy = client_y - iframes_client_y;
        if (elt.classList.contains(myNamespace)) {
            console.log("old word="+elt);
            gotWord(elt, iframes_client_x, iframes_client_y, doc, client_x, client_y);
        } else if (elt.classList.contains(myNamespace+"-isSplitted")) {
            tellNoWord(client_x, client_y, "no word here...");
        } else {
            elt.classList.add(myNamespace+"-isSplitted");
            splitIntoWords(elt, page_x, page_y);
            myShield().style.display = "none";
            var foundElt = doc.elementFromPoint(cx, cy);
            myShield().style.display = "block";
            // console.log("test eFP", foundElt.textContent, foundElt);
            //
            // It did not help here. However it seems like searching
            // in the children can be used instead!
            if (!foundElt) {
                // console.log("cx="+cx+", cy="+cy);
                var eltsSpan = elt.querySelectorAll('.'+myNamespace);
                for (var i=0; i<eltsSpan.length && !foundElt; i++) {
                    var ths = eltsSpan[i];
                    var bcr = ths.getBoundingClientRect();
                    if ((bcr.left < cx) && (bcr.top < cy)
                        && (cx < (bcr.right))
                        && (cy < (bcr.bottom))) {
                        foundElt = ths;
                    }
                }
            }
            // console.log("foundElt=", foundElt);
            if (foundElt) {
                gotWord(foundElt, iframes_client_x, iframes_client_y, doc, client_x, client_y);
            } else {
                tellNoWord(client_x, client_y, "no word here...");
                return;
            }
        }
        return false;
    }
    function tellNoWord(client_x, client_y, reason) {
        // http://www.w3schools.com/jquery/css_offset.asp
        // These are relative to the document.
        // console.log("tellnoword("+client_x+","+client_y+","+reason+")");
        noWordElt(reason, client_x-3, client_y-3);
    }

    function menuData() { return { "menu": menuHtmlInnerId() }; }
    function finishMenuDelayed(delay) {
    }
    function clearCurrentWordBG() {
        var allCW = document.querySelectorAll("span."+myNamespace+"CurrentWord");
        for (var i=1; i<allCW.length; i++) {
            var style = allCW[i].style;
            style.cssText = style.cssText.replace(/background-color:[^;]*/, "");
        }
    }
    function clearCurrentWord() {
        clearCurrentWordBG();
        var eltWord = window[myNamespace+"CurrentWord"];
        if (eltWord) {
            // eltWord.removeClass(myNamespace+"CurrentWord");
            eltWord.classList.remove(myNamespace+"CurrentWord");
            window[myNamespace+"CurrentWord"] = undefined;
        }
    }
    function finishMenu() {
        clearCurrentWord();
        resetOldFocus();
        
        setStateDefault1();
        // if (console) console.log("finishMenu exit");
    }
    // window[myNamespace+"finishMenu"] = finishMenu;
    // function isStillInDOM(elt) {
    //     var jqElt = jQuery(elt);
    //     return (jqElt.closest('body').length > 0);
    // }

    function gotWord(eltWord, iframes_client_x, iframes_client_y, doc, client_x, client_y) {
        var theWord = eltWord.textContent;
        console.log("========== gotWord BEGIN "+theWord+" ================");
        myTooltip().style.display = "none";
        noWordElt();
        // Mark the word so we can access it in onclick:
        if (window[myNamespace+"CurrentWord"]) {
            var word1 = window[myNamespace+"CurrentWord"];
            var txt = getTextFromTwoWordsRange(word1, eltWord, doc);
            if (!txt) {
                tellNoWord(client_x, client_y,
                           "Or rather, the word '<b>"+theWord
                           +"</b>' is technically in another web page than the first word.");
            }
            getMenu(txt);
        } else {
            // console.log("Add CurrentWord to '"+theWord+"'");
            eltWord.classList.add(myNamespace+"CurrentWord");
            window[myNamespace+"CurrentWord"] = eltWord;
            var br = eltWord.getBoundingClientRect();
            console.log("br.bottom  + doc.defaultView.pageYOffset + iframes_client_y",
                        br.bottom  , doc.defaultView.pageYOffset , iframes_client_y);
            // var menu_y = br.bottom  + doc.defaultView.pageYOffset + iframes_client_y + 2;
            // var menu_x = br.left    + doc.defaultView.pageXOffset + iframes_client_x;
            ///////////////////////////////////////////////////////////////////
            // Fix-me: fit in window!
            var menu_y = br.bottom  + iframes_client_y + window.pageYOffset + 2;
            var menu_x = br.left    + iframes_client_x + window.pageXOffset;
            var menu = getMenu(theWord);
            var viewportLeft = window.scrollX // Left viewport border:
            var viewportWidth = screen.width;
            if (!mobile) viewportWidth = document.documentElement.clientWidth;
            var viewportRight = viewportLeft + viewportWidth; // Right viewport border
            var menuWidth = menu.getBoundingClientRect().width;
            // First look at the right side since we adjusted left side to the word:
            // console.log(menu_y, menuWidth, zoomed(), viewportRight);
            if ((menu_x+menuWidth) * zoomed() > viewportRight) menu_x = viewportRight / zoomed() - menuWidth;
            // Then check at the left since this is more important:
            // console.log(menu_x, viewportLeft);
            if (menu_x * zoomed() < viewportLeft) menu_x = viewportLeft / zoomed() ;
            // console.log(menu_x, viewportLeft);
            menu.style.display = "block";
            // Fix-me: testing...
            if (!(touchDevice || window["touchDevice"])) {
                menu.style.position = "absolute";
                menu.style.top = menu_y + "px";
                menu.style.left = menu_x + "px";
            } else {
                menu.style.position = "fixed";
                menu.style.left = 0;
                menu.style.top = 0;
                document.getElementById("menuHeader-"+myNamespace).style.cursor = "pointer";
                var theWords = document.getElementById("theWords-"+myNamespace);
                menu.addEventListener("click", function(ev){
                    ev.stopPropagation();
                    ev.stopImmediatePropagation();
                    toggleFixedMenuPos();
                });
                theWords.addEventListener("click", function(ev) {
                    ev.stopPropagation();
                    ev.stopImmediatePropagation();
                    if (menuPart.style.display == "none") toggleFixedMenuPos();
                });
                theWords.parentNode.addEventListener("click", function(ev) {
                    ev.stopPropagation();
                    ev.stopImmediatePropagation();
                    toggleFixedMenuPos();
                });
                var headerLowerDiv = document.getElementById("headerLower-"+myNamespace);
                var menuPart = document.getElementById("myMenuInner-findword72789").parentNode;
                var footer = document.getElementById("menuFooter-findword72789");
                var toggleArrow = document.getElementById("toggleArrow-"+myNamespace).firstChild;
                var leftArrow = String.fromCharCode(0x25b6);
                var downArrow = String.fromCharCode(0x25bc);
                function toggleFixedMenuPos (){
                    bcr = menu.getBoundingClientRect();
                    // debugIt("bcr.top");
                    // var touchLow = ((screen.height-200)/zoomed())+"px";
                    // var touchHigh = ((screen.height-100-bcr.height)/zoomed())+"px";
                    // debugIt("zoomed()");
                    // debugIt("window.scrollY");
                    // if (touchLow == menu.style.top) {
                    console.log("menuPart.style.display", menuPart.style.display);
                    if (menuPart.style.display == "none") {
                        toggleArrow.nodeValue = downArrow;
                        // menu.style.top = touchHigh;
                        menuPart.style.display = "block";
                        headerLowerDiv.style.display = "block";
                        footer.style.display = "block";
                        theWords.setAttribute("contenteditable", "true");
                        theWords.style.backgroundColor = "#fff";
                    } else {
                        toggleArrow.nodeValue = leftArrow;
                        // menu.style.top = touchLow;
                        menuPart.style.display = "none";
                        headerLowerDiv.style.display = "none";
                        footer.style.display = "none";
                        theWords.setAttribute("contenteditable", "false");
                        theWords.style.backgroundColor = "#999";
                    }
                    // menu.scrollIntoView("true");
                }
                toggleFixedMenuPos();
            }
        }
        execMenuWithCallbacks();
        if (console) console.log("========== gotWord FIN ================");
    }
    function execMenuWithCallbacks() {
        var callbackFinish = function(choosenElt, menuElt, delay) {
            // console.log("callbackFinish, choosenElt=", choosenElt);
            if (!delay)
                finishMenu();
            else
                finishMenuDelayed(15000);
        };
        var callbackKeydown = function() {
            // menu = myMenu();
            // if (menu.finishTimer) finishMenuDelayed(15000);
        };
        // if (console) console.log("menuData() => "+menuData().menu);
        execMenu(menuData(), callbackFinish, callbackKeydown);
    }
    function getTextFromTwoWordsRange(node1, node2, doc) {
        // Fix-me: need try-catch cause can be in diff iframes.
        // console.log("getTextFromTwoWordsRange("+node1.textContent+", "+node2.textContent+")"); //, doc) {
        var start = node1;
        var end = node2;
        var r = doc.createRange();
        // console.log("start="+start.textContent+", end="+end.textContent);
        r.setStart(node1, 0);
        r.setEnd(node2, 1);
        var text = r.toString();
        if (0 == text.length) {
            // r = doc.createRange();
            r.setStart(node2, 0);
            r.setEnd(node1, 1);
        }
        // console.log("r.text", text, text.length);
        // var fragment = document.createDocumentFragment();
        // fragment.appendChild(r);
        // var fragment = r.createContextualFragment();
        var fragment = r.cloneContents();

        // if (r.innerText) console.log("r.innerText", r.innerText)
        // else console.log("r.innerText not available");

        // if (fragment.toString) console.log("fragment.toString", fragment.toString())
        // else console.log("fragment.toString not available");

        // if (fragment.innerText) console.log("fragment.innerText", fragment.innerText)
        // else console.log("fragment.innerText not available");

        // if (fragment.textContent) console.log("fragment.textContent", fragment.textContent)
        // else console.log("fragment.textContent not available");

        console.log("**********************");
        function walkTheDOM(node, prevNode, func, level) {
            func(node, prevNode, level);
            var child = node.firstChild;
            var prevChild = null;
            while (child) {
                // if (0==level) console.log("child,"+level, child);
                if ("SCRIPT" != child.nodeName
                    && "NOSCRIPT" != child.nodeName
                    && "STYLE" != child.nodeName
                    && "IFRAME" != child.nodeName
                   )
                    walkTheDOM(child, prevChild, func, level+1);
                // prevChild = child;
                child = child.nextSibling;
            }
        }
        var allText = "";
        var reEndSpace = /\s$/;
        walkTheDOM(fragment, null, function(node, prevNode, level){
            // console.log("walk"+level+", nodeName", node.nodeName, node.childNodes.length, node.textContent);
            if ("#text" == node.nodeName)
                // fix-me: check layout to find non-adjacent text portions.
                // if (!allText.match(reEndSpace)) {
                // if (prevNode && node.parentNode.parentNode !== prevNode.parentNode.parentNode) {
                //     allText += " ";
                //      console.log("added visually space");
                // }
                // }
                allText += node.nodeValue;
        }, 0);
        return allText;
    }
    function splitIntoWords(elt, x, y) {
        if (console) console.log("###### split ###########@@@@@@", elt);
        var tag2use1;
        var tag2use2;
        // Our style sheet might not be loaded or overriden by
        // structural assignments or meta queries so use direct styles
        // instead here:
        var directStyle = ""
            +"padding:0px !important;"
            +"margin:0px !important;"
            +"border:none !important;"
            +"width:auto !important;"
            +"float:none !important;"
            +"display:inline !important;"
            +"font:inherit !important;"
            +"color:inherit !important;"
            +"text-align:inherit !important;"
            +"text-decoration:inherit !important;"
        ;
        function walkTheDOM(node, func) {
            // console.log("walk node", node.nodeName, node);
            func(node);
            var child = node.firstChild;
            // console.log("num childs", node.childNodes.length, child.nextSibling);
            while (child) {
                // console.log("walk child", child.nodeName, child);
                var nextChild = child.nextSibling;
                if ("SCRIPT" != child.nodeName
                    && "STYLE" != child.nodeName
                    && "IFRAME" != child.nodeName // fix-me: not sure
                    && "NOSCRIPT" != child.nodeName // fix-me: may contain tags like <iframe..>
                   )
                    walkTheDOM(child, func);
                child = nextChild;
                // console.log("sibling child", child);
            }
        }
        // var re = new RegExp("([^\\wéèåäöæø]*?)([\\wéèåäöæø]+)([^\\wéèåäöæø&]?|$)|.+", "ig");
        // var reSplit = /([\s\n]+|[^\wéèåäöæø]|[\wéèåäöæø]+)/i;
        var reSplit = /([\s\n]+|[^\wéèåäöæøü]|[\wéèåäöæøü]+)/i;
        function splitTextNode(node) {
            if ("#text" != node.nodeName) {
                // console.log(node.nodeName);
                return;
            } else {
                // console.log(node.textContent);
                // console.log(node.nodeValue);
                var oldPart = node.nodeValue;
                var BREAKNUM = 0;
                var fragment = document.createDocumentFragment();
                function addTextSpan(text) {
                    // console.log("addTextSpan", text);
                    fragment.appendChild(mkElt("span",
                                               { "style":directStyle, "class":myNamespace },
                                               text));
                }
                function addText(text) {
                    // console.log("addText", text);
                    fragment.appendChild(document.createTextNode(text));
                }
                var splitted = oldPart.split(reSplit);
                var joined = splitted.join("");
                if (joined != oldPart) {
                    console.log("********************* join ERROR, joined, oldPart:");
                    console.log(joined);
                    console.log(oldPart);
                    console.log("splitted", splitted);
                }
                for (var i=0; i<splitted.length; i++) {
                    var str = splitted[i];
                    if (0 != str.length) {
                        if (0 == str.trim().length) {
                            addText(str);
                        } else {
                            addTextSpan(str);
                        }
                    }
                }
                // console.log("fragment", fragment);
                node.parentNode.replaceChild(fragment, node);
            }
        }
        walkTheDOM(elt, splitTextNode);
        if (console) console.log("###### split END ###########");
    }
    function noWordElt(reason, left, top) {
        // Don't change if we are hiding:
        var div = document.querySelector("#noWord-"+myNamespace);
        if (reason != undefined) {
            var msg = 'Sorry, could not find any word here';
            if (reason.length > 0) msg += " ("+reason+")";
            var msgDiv = document.querySelector("#noWordInner-"+myNamespace);
            // var oldMsg = msgDiv.childNodes[0];
            // msgDiv.replaceChild(document.createTextNode(msg), oldMsg);
            msgDiv.innerHTML = msg;
            div.style.display = "block";
            div.style.left = left + "px";
            div.style.top = top + "px";
        } else
            div.style.display = "none";
        // return div;
    }

    function changeOutline(ths, outline) {
        var cssText = ths.style.cssText;
        if (cssText.match(/outline:/)) {
            ths.style.cssText = cssText.replace(/outline:[^;]*/, "outline:"+outline+" !important");
            // console.log("outline replaced", ths.style.cssText);
        } else {
            ths.style.cssText += "outline:"+outline+" !important;";
            // console.log("outline added", ths.style.cssText);
        }
    }
    function changeBackgroundColor(ths, color) {
        ths.style.cssText =
            ths.style.cssText
            .replace(/background-color:[^;]*/, "background-color:"+color+"!important;");
    }
    function changeColor(ths, color) {
        var txt = ths.style.cssText;
        txt = txt.replace(/(^|[^-])color:[^;]*/, "color:"+color+"!important;");
        ths.style.cssText = txt;
    }
    function onMouseOverLink() {
        this.parentNode.dataset.bg = this.parentNode.style.backgroundColor;
        changeBackgroundColor(this.parentNode, "#ff0");
    }
    function onMouseOutLink() {
        changeBackgroundColor(this.parentNode, this.parentNode.dataset.bg);
    }
    function onMouseOverColor(ths) {
        ths.dataset.fColor = ths.style.color;
        changeColor(ths, "#0c0");
        // ths.dataset.bColor = ths.style.backgroundColor;
        // ths.style.backgroundColor = "#000";
    }
    function onMouseOutColor(ths) {
        changeColor(ths, ths.dataset.fColor);
        // ths.style.backgroundColor = ths.dataset.bColor;
    }

    // Fix-me: Right click does not execute onClick so this has to be
    // modified. Solved by changing to "onMouseDown" in the html
    // code. See also here, which might be a better solution:
    // http://stackoverflow.com/questions/1206203/how-to-distinguish-between-left-and-right-mouse-click-with-jquery
    // http://stackoverflow.com/questions/9933835/modify-target-url-in-onclick-handler
    function onMousedownLink(ev, ths) {
        ev.stopPropagation();
        var lnk = decodeURIComponent(ths.dataset.lnk);
        var noq = ths.dataset.noq;
        if (noq) noq = decodeURIComponent(noq);
        var mod = ths.dataset.mod;
        if (mod) mod = decodeURIComponent(mod);
        var theWordsElt = document.getElementById("theWords-"+myNamespace);
        var words = theWordsElt.textContent;
        if ("TEXTAREA" == theWordsElt.nodeName || "INPUT" == theWordsElt.nodeName) {
            words = theWordsElt.value;
        }
        console.log("onMousedownLink, mod", mod);
        if (mod.length > 0) lnk = window[myNamespace+mod](lnk);
        var addQuotes = (undefined == noq || null == noq || 0 == noq.length || "true" == noq)
            && document.getElementById("quoteBx-"+myNamespace).checked;
        if (addQuotes) {
            var hasQuotes = /"THEWORDS"/.exec(lnk) || /%22THEWORDS%22/.exec(lnk);
            if (!hasQuotes) words = '"'+words+'"';
        }
        lnk = lnk.replace(/THEWORDS/g, encodeURIComponent(words));
        ths.setAttribute("href", lnk);
    }

    function evGoogleSiteUpClick() {
        var siteElt = document.getElementById("googleSiteURL-"+myNamespace);
        var googleSite = siteElt.textContent;
        var newURL = googleSite.replace(/(.*?\/)[^\/]+?\/?$/, "$1");
        if (newURL != googleSite) {
            siteElt.textContent = newURL;
        }
        if (validSiteField()) {
            document.getElementById("googleSiteBx-"+myNamespace).checked = true;
            changeColor(siteElt, googleSiteActiveColor);
        }
    }

    function validSiteField() {
        var site = document.getElementById("googleSiteURL-"+myNamespace).textContent;
        return new RegExp(/^(http:\/\/)?([\w]+\.)*[a-z]{2,3}(\/[\w\.?=%&=\-@\/$,]*)?$/).exec(site);
    }
    var googleAllInTitle = ""; // "" or "allintitle:"
    window[myNamespace+"modifyWordsGoogle"] =
        function (lnkPatt) {
            // console.log("modifyWordsGoogle");
            var newLnkPatt = lnkPatt;
            var googleSite = ""; // "" or "site:example.com "
            var checkbox = document.getElementById("googleSiteBx-"+myNamespace);
            if (checkbox.checked) {
                googleSite = document.getElementById("googleSiteURL-"+myNamespace).textContent;
                // console.log("googleSite", googleSite);
                googleSite = googleSite.trim();
                if (googleSite.length > 0) {
                    googleSite = "site:"+googleSite+" ";
                    googleSite = encodeURIComponent(googleSite);
                    posTW = lnkPatt.indexOf("THEWORDS");
                    charsBefore = lnkPatt.substring(posTW-3, posTW)
                    // console.log("charsBefore=", charsBefore);
                    if ('%22' === charsBefore) {
                        newLnkPatt =
                            lnkPatt.substring(0, posTW-3)
                            +googleSite
                            +lnkPatt.substring(posTW-3);
                    } else {
                        newLnkPatt =
                            lnkPatt.substring(0, posTW)
                            +googleSite
                            +lnkPatt.substring(posTW);
                    }
                    // console.log("lnkPatt=", lnkPatt);
                    // console.log("newLnkPatt=", newLnkPatt);
                }
            }
            // console.log("googleSite=", googleSite);
            return newLnkPatt;
        };
    var googleSiteInactiveColor = "#999";
    var googleSiteActiveColor = "rgb(103, 172, 0)";
    var googleSiteInvalidColor = "rgb(200, 46, 0)";
    function addGoogleSite() {
        var site = window.location.href;
        site = site.replace(/^https?:\/\//, "");
        site = site.replace(/[^\/]*$/, "");
        if (site.indexOf("file:") === 0) {
            site = "";
        }
        var siteUp =
            mkElt("span",
                  {
                      "id":"googleSiteUp-"+myNamespace,
                      "tabindex":tabindex,
                      "title":"Up one level"
                  },
                  String.fromCharCode(9650) // upward triangel
                 );
        siteUp.addEventListener("click", function(ev){
            ev.stopPropagation();
            evGoogleSiteUpClick();
        });
        siteUp.addEventListener("mouseover", function(){ onMouseOverColor(this); });
        siteUp.addEventListener("mouseout", function(){ onMouseOutColor(this); });
        var siteTag =
            mkElt("div",
                  {
                      "id":"googleSiteURL-"+myNamespace,
                      "tabindex":tabindex,
                      "class":"textField-"+myNamespace,
                      "title":"Google site search URL (for the alternatives above), click to edit",
                      "contenteditable":"true"
                  }, site);
        siteTag.addEventListener("mousedown", function(ev){ ev.stopPropagation(); });
        siteTag.addEventListener("mouseup", function(ev){ ev.stopPropagation(); });
        siteTag.addEventListener("click", function(ev){ ev.stopPropagation(); });
        var siteContainer =
            mkElt("div",
                  { "id":"googleSiteURLContainer-"+myNamespace,
                    "class":"containerText-"+myNamespace
                  },
                  [siteTag,siteUp]);
        var box = mkElt("input",
                        {
                            "type":"checkbox",
                            "tabindex":tabindex,
                            "title":"Check to search only this site (for Google searches above)",
                            "id":"googleSiteBx-"+myNamespace
                        })
        box.addEventListener("mousedown", function(ev){ ev.stopPropagation(); });
        box.addEventListener("mouseup", function(ev){ ev.stopPropagation(); });
        box.addEventListener("click", function(ev){ ev.stopPropagation(); });
        var val = mkElt("div", { "id":"googleSite-"+myNamespace },
                        mkElt("div", {"id":"googleSiteInner-"+myNamespace},
                              [box,
                               String.fromCharCode(160), // &nbsp;
                               siteContainer])
                       );
        // console.log("val=", val);
        val.addEventListener("click", function(ev){ ev.stopPropagation(); });
        return val;
    }

    function menuHtmlInnerId () { return "myMenuInner-"+myNamespace; }
    function myMenu() {
        return document.querySelector("#myMenu-"+myNamespace);
    }
    function mkStaticMenu(wordPar) {
        var quitCross =
            mkElt("span",
                  {
                      "id":"quitCross-"+myNamespace,
                      "title":"Quit"
                  },
                  // "&#10006;"
                  String.fromCharCode(10006)
                 );
        quitCross.addEventListener("click", setStateDefault);
        quitCross.addEventListener("mouseover", function(){ onMouseOverColor(this); });
        quitCross.addEventListener("mouseout", function(){ onMouseOutColor(this); });
        var topLine =
            mkElt("div",
                  {"class":"aLine-"+myNamespace,
                   "id":"topLine-"+myNamespace},
                  // "&nbsp;"
                  [String.fromCharCode(160), quitCross]
                  );
        var toggleArrow;
        if (touchDevice || window["touchDevice"])
            toggleArrow = mkElt("span", {"id":"toggleArrow-"+myNamespace}, " ");
        var preWords =
            mkElt("span",
                  {"id":"preWords-"+myNamespace},
                  [toggleArrow, "Search:"]);
        var postWords =
            mkElt("div",
                  {"id":"postWords-"+myNamespace},
                  "You can click a word on the page to choose a range.");
        var quoteBox = mkElt("input",
                             {
                                 "type":"checkbox",
                                 "tabindex":tabindex,
                                 "checked":"checked",
                                 "id":"quoteBx-"+myNamespace
                             });
        quoteBox.addEventListener("click", function(){ ev.stopPropagation(); });
        quoteBox.addEventListener("mousedown", function(){ ev.stopPropagation(); });
        quoteBox.addEventListener("mouseup", function(){ ev.stopPropagation(); });
        var labelTag =
            mkElt("label",
                  { "title":"Exact search (will quote the search string, works on very many sites)" },
                  ["Exact search (quote search string): ",quoteBox]);
        var quoteDiv = mkElt("div", {"class":"aLine-"+myNamespace,
                                     "id":"quoteLine-"+myNamespace}, labelTag);
        var headerLowerDiv = mkElt("div", {"id":"headerLower-"+myNamespace}, [postWords,quoteDiv]);
        var clearWords =
            mkElt("span",
                  { "id":"clearWords-"+myNamespace,
                    // "tabindex":tabindex,
                    "title":"Clear"
                  },
                  // "&#10006;"
                  String.fromCharCode(10006)
                 );
        clearWords.addEventListener("click", function() {
            var theWordsElt = document.getElementById("theWords-"+myNamespace);
            if ("TEXTAREA" == theWordsElt.nodeName || "INPUT" == theWordsElt.nodeName) {
                theWordsElt.value = "";
            } else {
                theWordsElt.replaceChild(document.createTextNode(""), theWordsElt.firstChild)
            }
            clearCurrentWord();
        });
        clearWords.addEventListener("mouseover", function() { onMouseOverColor(this); });
        clearWords.addEventListener("mouseout", function() { onMouseOutColor(this); });
        var theWords =
            mkElt("div",
                  // mkElt("textarea",
                  // mkElt("input",
                  {
                      "id":"theWords-"+myNamespace,
                      "tabindex":tabindex,
                      "type":"text",
                      "class":"textField-"+myNamespace,
                      "title":"Search, click to edit",
                      "contenteditable":"true"
                  },
                  [wordPar,clearWords]);
        theWords.addEventListener("click", function(ev){ ev.stopPropagation(); });
        theWords.addEventListener("mousedown", function(ev){ ev.stopPropagation(); });
        theWords.addEventListener("mouseup", function(ev){ ev.stopPropagation(); });
        var theWordsContainer =
            mkElt("div",
                  {
                      "id":"theWordsContainer-"+myNamespace,
                      "class":"containerText-"+myNamespace
                  },
                  [theWords
                   ,clearWords]
                 )
        var menuHeaderInner =
            mkElt("div", {"id":"menuHeaderInner-"+myNamespace},
                  [preWords
                   ,theWordsContainer
                   // ,postWords ,quoteDiv
                   ,headerLowerDiv]);
        
        var menuHeader =
            mkElt("div", {"id":"menuHeader-"+myNamespace,
                          "title":"Drag here to move" // ,
                         },
                  [topLine
                   ,menuHeaderInner]
                 );
        var menuFooter = mkElt("div", {"class": "separator-findword72789",
                                       "id": "menuFooter-"+myNamespace},
                               [mkElt("span",
                                      {
                                          "id":"footMsg-"+myNamespace,
                                          "title":"When you updated this bookmarklet (UTC time)"
                                      }, myDate)
                                ,mkElt("a",
                                       {"target":"_blank",
                                        "title":"Visit W+'s parents' home, Bookmarklets | From Some Psychologists",
                                        "tabindex":tabindex,
                                        "href":"http://dl.dropbox.com/u/848981/it/cw/cw.html"},
                                       "W+ Bookmarklet")
                                ,"."
                                // +donate
                               ]
                              );
        var innerDynHtml = mkElt("div", {"id":"myMenuInnerDyn-"+myNamespace,
                                         "class": "contextInnerMenu-"+myNamespace
                                        }
                                );
        var innerHtml = mkElt("div", {"id":menuHtmlInnerId(),
                                      "class": "contextInnerMenu-"+myNamespace
                                      // "style": "padding:0;margin:0"
                                     },
                              "");
        // var onSetupHtml = mkElt("div", {"id":"on-setup-"+myNamespace});
        var menuHtml = mkElt("div", {"id":"myMenu-"+myNamespace}, // menuHtmlId()},
                             [menuHeader
                              ,mkElt("div", null, [innerDynHtml,innerHtml])
                              ,menuFooter
                              // ,onSetupHtml
                             ]);
        document.body.appendChild(menuHtml);
        onStaticMenuReady();
    }
    function onStaticMenuReady() {
        var menu = myMenu();
        var theWords = document.getElementById("theWords-"+myNamespace);
        theWords.addEventListener("focus", evTheWordsFocus);
        theWords.addEventListener("keydown",evTheWordsKeydown);

        // var dm = document.getElementById('dragme'); 
        menu.addEventListener('dragstart',move_drag_start,false); 
        menu.setAttribute("draggable", true);
        var shieldElt = document.getElementById("shield-"+myNamespace);
        shieldElt.addEventListener('dragover',move_drag_over,false); 
        shieldElt.addEventListener('drop',move_drop,false); 
        menu.addEventListener('dragover',move_drag_over,false); 
        menu.addEventListener('drop',move_drop,false); 
    }
    function doTellOnSetupPage() {
        // console.log(lastFixedElt);
        var addOldBtn = mkElt("button", null, "Add");
        addOldBtn.addEventListener("click", function(){
            window[myNamespace+"AddOld"](); // Defined on setup page!
            setStateDefault();
        });
        var menu = myMenu();
        menu.style.display = "block";
        var height = lastFixedElt.getBoundingClientRect().bottom - menu.getBoundingClientRect().top;
        // console.log(lastFixedElt.getBoundingClientRect());
        // console.log(menu.getBoundingClientRect());
        var frag = mkElt("div", {
            "id":"on-setup-"+myNamespace,
            "style":"position:absolute; top:0;left;0; z-index:9; height:300px; display:none;"
        });
        // fix-me: Isn't there any event for display ready???
        setTimeout(function() {
            console.log("to",lastFixedElt);
            console.log("frag",frag);
            var lfixBcr = lastFixedElt.getBoundingClientRect();
            console.log("lfixBcr",lfixBcr);
            var menuBcr = menu.getBoundingClientRect();
            var h = lfixBcr.bottom - menuBcr.top;
            frag.style.height = h+"px";
            // frag.style.display = "block";
            jq(frag).slideDown();
        }, 1000);
        // var h = lastFixedElt.getBoundingClientRect().bottom - menu.getBoundingClientRect().top;
        // frag.style.height = h+"px";
        // window["jQuery"](frag).slideDown();

        var cancelOldBtn = mkElt("button", null, "Cancel");
        cancelOldBtn.addEventListener("click", function(){
            console.log("frag", frag);
            jq(frag).slideUp().
                element(0).parentNode.removeChild(frag);
            if (mobile) setStateDefault();
        });
        frag.appendChild(mkElt("div", {"style":"margin-bottom:20px"},
                               "Here are the items you have used before."
                               +" To add them to the new setup click here:"));
        frag.appendChild(addOldBtn);
        frag.appendChild(cancelOldBtn);
        // document.querySelector("#on-setup-"+myNamespace).appendChild(frag);
        // console.log(menu);
        var first = menu.firstChild;
        // console.log(first);
        menu.insertBefore(frag, first);
    }

    var lastFixedElt;
    function getMenu(wordPar) {
        wordPar = wordPar.replace(/\s+/g, " ");
        wordPar = wordPar.trim();
        if (console) console.log("getMenu ("+wordPar+")");
        // http://labs.abeautifulsite.net/archived/jquery-contextMenu/demo/
        var menu = myMenu();
        // console.log("getMenu, menu=", menu);
        // if (!wordPar) return menu;
        if (isOnSetupPage && !window[myNamespace+"CurrentWord"]) {
            // menu.remove();
            if (menu) menu.parentNode.removeChild(menu);
            menu = null;
        }
        var donate = [" You may "
            ,mkElt("a", 
                   {"target":"_blank",
                    "title":"Make a donation for this software",
                    "href":"https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=Q7GL4S49WJA2S"},
                   "donate"),"."];
        donate = "";
        var justUpdateMenu = true;
        // console.log("update?", menu);
        // if (menu) console.log("update?", menu.length);
        if (!menu || menu.length == 0) {
            justUpdateMenu = false;
            // console.log("new menu created");
            mkStaticMenu(wordPar);
            menu = myMenu();
        }
        // var finTimer = myMenu().finishTimer;
        // if (finTimer) clearTimeout(finTimer);
        // myMenu().finishTimer = undefined;
        var itemsHtml = []; // "";
        var dynItemsHtml = []; // "";
        word = encodeURIComponent(wordPar);
        var items = [
            {
                "fav": "http://www.google.com/favicon.ico",
                "cmt": "Search with Google",
	        "cls": "hover separator-findword72789",
                "lnk": "https://www.google.com/search?q=THEWORDS",
                "mod": "modifyWordsGoogle",
                "tit": "Google"
            },
            // {
            //     // "fav": "http://www.google.com/favicon.ico",
            //     "cmt": "Search exact phrase with Google",
            //     "lnk": 'https://www.google.com/search?q=%22THEWORDS%22',
            //     "mod": "modifyWordsGoogle",
            //     "tit": "Google (exact, i.e. quoted)"
            // },
            {
                // "fav": "http://www.google.com/favicon.ico",
                "cmt": "Search for definitions with Google",
                "lnk": 'https://www.google.com/search?q=define:+THEWORDS',
                "mod": "modifyWordsGoogle",
                "tit": "Google define:"
            },
            {
                "fav": "http://scholar.google.com/favicon.ico",
                "cmt": "Search on Google Scholar",
	        "lnk": 'http://scholar.google.se/scholar?q=THEWORDS',
                "mod": "modifyWordsGoogle",
                "tit": "Google Scholar"
            },
            // {
            //     "cmt": "Search exact phrase on Google Scholar",
	    //     "lnk": 'http://scholar.google.se/scholar?q=%22THEWORDS%22',
            //     "mod": "modifyWordsGoogle",
            //     "tit": "Google Scholar (exact, i.e. quoted)"
            // },
            {
                "special":addGoogleSite
            },
            {
                "fav":"http://en.wikipedia.org/favicon.ico",
                "cmt": "Search for titles in Wikipedia",
	        "cls": "separator-findword72789",
                "lnk": 'http://en.wikipedia.org/w/index.php?search=~%22THEWORDS%22',
                "tit": "Wikipedia"
            },
            {
                "fav":"http://en.wiktionary.org/favicon.ico",
                "cmt": "Search in Wiktionary dictionary",
	        "lnk": 'http://en.wiktionary.org/w/index.php?search=THEWORDS',
                "tit": "Wiktionary"
            },
            {
                // "fav": "http://img.tfd.com/favicon.ico",
                "fav": "http://www.thefreedictionary.com/favicon.ico",
                "cmt": "Search in The Free Dictionary",
	        "lnk": 'http://www.thefreedictionary.com/THEWORDS',
                "tit": "The Free Dictionary"
            },
            {
                "fav": "http://www.merriam-webster.com/favicon.ico",
                "cmt": "Search in Meriam Webster English dictionary",
                "lnk": 'http://www.merriam-webster.com/dictionary/THEWORDS',
                "tit": "Meriam Webster"
            }
        ];
        var numFixedItems = items.length;
        var res = wordPar.match("^"+reHttp+"$");
        if (res) {
            items.unshift({
                "cls": "separator-findword72789 hot",
                "lnk": res[0],
                "tit": res[0]
            });
        }
        var numDynamicItems = 0;
        var res = new RegExp("^pmid: *([0-9]+)$", "i").exec(wordPar);
        if (res) {
            numDynamicItems++;
            items.unshift({
	        "fav": 'http://www.ncbi.nlm.nih.gov/favicon.ico',
                "cls": "separator-findword72789 hot",
                "lnk": "http://www.ncbi.nlm.nih.gov/pubmed/"+res[1],
                "tit": "PubMed (abstract)"
            });
        }
        var res = new RegExp("^pmcid: *(?:pmc)?([0-9]+)$", "i").exec(wordPar);
        if (! res) res = new RegExp("^pmc([0-9]+)$", "i").exec(wordPar);
        // var res = new RegExp("^pmc([0-9]+)$", "i").exec(wordPar);
        if (res) {
            numDynamicItems++;
            items.unshift({
	        "fav": 'http://www.ncbi.nlm.nih.gov/favicon.ico',
                "cls": "separator-findword72789 hot",
                "lnk": "http://www.ncbi.nlm.nih.gov/pmc/articles/PMC"+res[1]+"/",
                "tit": "PubMed Central (free article)",
                "noq": "true"
            });
        }
        var doi;
        var res = new RegExp("^(?:doi:?)?(?:[ \t]|\n)*(10\.[0-9a-z\.\/()-]+)$", "i").exec(wordPar);
        if (res) {
            numDynamicItems++;
            doi = res[1];
            // if (console) console.log("doi="+doi);
            items.unshift({
                "fav": "http://dx.doi.org/favicon.ico",
                "cls": "separator-findword72789 hot",
                "lnk": "http://dx.doi.org/"+doi,
                "tit": "Find DOI Object",
                "noq": "true"
            });
        }
        var mail;
        var regex = new RegExp(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/);
        // var regex = new RegExp("^[a-z0-9!#$%&'*+/=?^_{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$");
        var res = regex.exec(wordPar);
        if (res) {
            numDynamicItems++;
            mail = res[0];
            items.unshift({
                "fav": "http://mail.google.com/favicon.ico",
                "cls": "separator-findword72789 hot",
                "lnk": "mailto:"+mail,
                "tit": "Mail to this address",
                "noq": "true"
            });
        }

        if (myArgs) {
            var theDoi = encodeURIComponent(doi);
            // if (console) console.log("myArgs should be used... word=("+word+")");
            for (var i=0, len=myArgs.length; i<len; i++) {
                var item = myArgs[i];
                // if (console) console.log("from myArgs[i]:  item=",item);
                if (!item["origLnk"]) item["origLnk"] = item["lnk"];
                // if (console) console.log("after origLnk:  item=",item);
                var itemDOI = false;
                if (typeof item == "function")
                    item = item(word, doi);
                else {
                    if (doi) itemDOI = item["doi"];
                    if (itemDOI)
                        item["lnk"] = itemDOI.replace(/THEDOI/g, theDoi);
                    else {
                        var lnk = item["origLnk"].replace(/"/g,"%22");
                    }
                }
                // if (console) console.log("final:  item=",item);
                if (0 == i) item["cls"] = "separator-findword72789";
                items.push(item);
            }
        }
        // console.log("numDynamicItems=", numDynamicItems);

        for (var i=0, len=items.length; i<len; i++) {
            var special = items[i]["special"];
            if (special) {
                if (i < numDynamicItems)
                    // dynItemsHtml += special();
                    dynItemsHtml.push(special());
                else
                    // itemsHtml += special();
                    itemsHtml.push(special());
            } else {
                var cls = items[i]["cls"] || "";
                var lnk = items[i]["lnk"];
                var mob = items[i]["mob"];
                var tit = items[i]["tit"];
                var cmt = items[i]["cmt"] || "";
                var fav = items[i]["fav"];
                var mod = items[i]["mod"] || "";
                var noq = items[i]["noq"] || "";
                if (mobile && mob) lnk = mob;
                // console.log("items noq=", noq);
                cmt = cmt.replace(/<[^>]*?>/g, "");
                // console.log("cw.js "+i+" cmt="+cmt);
                // var img = "<span style=\"height: 20; width: 16px;\" />";
                var imgTag = mkElt("img", {"src":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGNiYAAAAAkAAxkR2eQAAAAASUVORK5CYII=",
                                       "height":"16",
                                       "width":"16",
                                       "alt":"Site icon",
                                       "border":"0"
                                      });
                if (fav)
                    imgTag = mkElt("img",{"src":fav,
                                       "height":"16",
                                       "width":"16",
                                       "alt":"Site icon"
                                         });
                var titSpan = mkElt("span", null, tit);
                var aTag = mkElt("a", {"href":encodeURIComponent(lnk),
                                       "data-lnk":encodeURIComponent(lnk),
                                       "data-noq":encodeURIComponent(noq),
                                       "data-mod":encodeURIComponent(mod),
                                       "target": "_blank",
                                       "tabindex":-1,
                                       "title":cmt
                                      },
                                 [imgTag,titSpan]);
                aTag.addEventListener("mouseover", onMouseOverLink);
                aTag.addEventListener("mouseout", onMouseOutLink);
                aTag.addEventListener("mousedown", function(ev) { onMousedownLink(ev, this, mod); });
                aTag.addEventListener("click", function(ev) { ev.stopPropagation(); }); // prevent popup PMC
                if (i < numDynamicItems)
                    dynItemsHtml.push(mkElt("p",
                                            {
                                                "class":cls
                                            }, aTag));
                else if (i < numDynamicItems+numFixedItems) {
                    lastFixedElt = mkElt("p",
                                         {
                                             "class":cls
                                         }, aTag);
                    itemsHtml.push(lastFixedElt);
                } else 
                    // Users own items
                    // itemsHtml += mkElt("p",
                    itemsHtml.push(mkElt("p",
                                       {
                                           "class":cls,
                                           "data-item":encodeURIComponent(JSON.stringify(items[i]))
                                       }, aTag));
                // if (i==1) console.log("dyn=", dynItemsHtml);
            }
        }
        ////////////////
        // Did not work. Obviously there is no chaining for
        // completion, only for selection. Or, there is, but not what
        // I expected. wordPar also replaced #menuHtmlInnerid html!
        //
        // xQuery("#"+menuHtmlInnerId())
        //     .html(itemsHtml)
        //     .select("#theWords-"+myNamespace)
        //     .html(wordPar);
        ////////////////

        // console.log("dynItemsHtml=", dynItemsHtml);
        var innerDynElt = document.getElementById("myMenuInnerDyn-"+myNamespace);
        while (innerDynElt.hasChildNodes()) innerDynElt.removeChild(innerDynElt.firstChild);
        for (var i=0; i<dynItemsHtml.length; i++) innerDynElt.appendChild(dynItemsHtml[i]);
        var theWordsElt = document.getElementById("theWords-"+myNamespace);
        if ("TEXTAREA" == theWordsElt.nodeName || "INPUT" == theWordsElt.nodeName) {
            theWordsElt.value = wordPar;
        } else {
            // Fix-me: Why could firstChild be null?
            if (theWordsElt.firstChild)
                theWordsElt.replaceChild(document.createTextNode(wordPar), theWordsElt.firstChild);
            else
                theWordsElt.appendChild(document.createTextNode(wordPar));
        }
        if (!justUpdateMenu) {
            // console.log("for inner, itemsHtml", itemsHtml);
            var innerStaticElt = document.getElementById(menuHtmlInnerId());
            for (var i=0; i<itemsHtml.length; i++) innerStaticElt.appendChild(itemsHtml[i]);
            var tab1 = document.querySelectorAll("#myMenu-"+myNamespace+" [tabindex='1']");
            for (var i=0; i<tab1.length; i++) {
                tab1[i].addEventListener("focusout", evFocusout);
                tab1[i].addEventListener("focus", evFocus);
                // tab1[i].style.cssText += tab1[i].style.cssText + ";outline:none;";
                // console.log("tab1[i].style.cssText", tab1[i].style.cssText);
            };
            if (!touchDevice) document.getElementById("theWords-"+myNamespace).focus();
            document.getElementById("googleSiteUp-"+myNamespace)
                .addEventListener("keydown",evGoogleSiteUpKeydown);
            document.getElementById("theWords-"+myNamespace)
                .addEventListener("keyup",evTheWordsKeyup);
            document.getElementById("googleSiteBx-"+myNamespace)
                .addEventListener("change",evGoogleSiteBxChange);
            if (!touchDevice) document.getElementById("theWords-"+myNamespace).focus();
        } else {
        }
        var googleSiteURLelt = document.getElementById("googleSiteURL-"+myNamespace);
        googleSiteURLelt.addEventListener("keydown",evGoogleSiteURLKeydown);
        googleSiteURLelt.addEventListener("keyup",evGoogleSiteURLKeyup);
        googleSiteURLelt.addEventListener("keydown",evTheWordsKeydown);

        menu.style.display = "block";
        if (tellOnSetupPage) { doTellOnSetupPage(); }
        addCss_cw_css_js();
        mobileCssOverride();
        var tab1 = document.querySelectorAll("#myMenu-"+myNamespace+" [tabindex='1']");
        for (var i=0; i<tab1.length; i++) {
            tab1[i].style.outline = "none";
        };
        // menu.show();
            var oldFocus = window[myNamespace+"-menuFocus"];
            // console.log("oldFocus", oldFocus);
            if (oldFocus) {
                // console.log("oldFocus.focus()");
                oldFocus.focus();
            } else {
                document.getElementById("theWords-"+myNamespace).blur();
                document.getElementById("theWords-"+myNamespace).focus();
            }
            // console.log("activeElement", document.activeElement);
        return menu;
    }
    function mobileCssOverride() {
        // Change font size in input fields to avoid zooming:
        document.getElementById("theWords-"+myNamespace).style.fontSize = "14px";
    }

    // Caching covers:
    // 1. Inside the same click of the bookmarklet
    // 2. For next click.
    var myCachedShield = undefined;
    function myShield() {
        if (!myCachedShield) {
            myCachedShield = document.getElementById("shield-"+myNamespace);
        }
        return myCachedShield;
    }
    function createShield () {
        if (!myShield()) {
            var idShield = "shield-"+myNamespace;
            var eltShield = mkElt("div", {"id":idShield});
            document.body.appendChild(eltShield);
        }
        createTooltip ();
    }

    function createNoWord() {
        var redP = mkElt("div",
                         { "style": "background:red!important; width:6px!important; height:6px!important; padding:0px!important;"},
                         "");
        var msgDiv = mkElt("div",
                           {"id":"noWordInner-"+myNamespace}, " ");
        var id = "noWord-"+myNamespace;
        var html = mkElt("div", { "id": id }, [redP,msgDiv]);
        document.body.appendChild(html);
        // var div = document.querySelector("#noWord-"+myNamespace);
        html.addEventListener("mouseout", function(){ div.style.display = "none"; });
    }

    var myCachedTooltip = undefined;
    function myTooltip() {
        if (!myCachedTooltip) {
            myCachedTooltip = document.getElementById("tooltip-"+myNamespace);
        }
        return myCachedTooltip;
    }
    function createTooltip () {
        if (!myTooltip()) {
            var idTooltip = "tooltip-"+myNamespace;
            var eltTooltip = mkElt("div",
                                   { "id":idTooltip },
                                   ["Click word to look up",
                                    mkElt("span", null,
                                          String.fromCharCode(160)
                                          +String.fromCharCode(10006))]);
            // fix-me: Becomes transparent in Chrome if appended to shield??
            document.body.appendChild(eltTooltip);
            // var readyElt = document.getElementById(idTooltip);
            eltTooltip.addEventListener("click", setStateDefault);
        }
    }



    ////////////////////////////////////////////////////////////
    /// End of Your bookmarklet space!
    ////////////////////////////////////////////////////////////////
    // Never change anything below this line! :-)
    ////////////////////////////////////////////////////////////////

    function mkElt(type, attrib, inner) {
        var elt = document.createElement(type);
        function addInner(inr) {
            if (typeof inr == "string") {
                var txt = document.createTextNode(inr);
                elt.appendChild(txt);
            } else {
                elt.appendChild(inr);
            }
        }
        if (inner) {
            if (inner.length && typeof inner != "string") {
                for (var i=0; i<inner.length; i++)
                if (inner[i])
                    addInner(inner[i]);
            } else
                addInner(inner);
        }
        for (var x in attrib) {
            elt.setAttribute(x, attrib[x]);
        }
        return elt;
    }

    // function mkTag(type, attrib, inner) {
    //     var at = "";
    //     var locInner;
    //     for (var x in attrib) at += " "+x+'="'+attrib[x]+'"';
    //     if (inner && inner.length && 'string' != typeof inner) {
    //         locInner = "";
    //         for (var i=0; i<inner.length; i++)
    //             locInner += inner[i];
    //     } else
    //         locInner = inner;
    //     if ('string' == typeof locInner)
    //         return "<"+type+at+">"+locInner+"</"+type+">";
    //     else
    //         return "<"+type+at+" />";
    // }

    var lastTimeStamp;
    function timeStamp (where, args) {
        var thisTime = new Date().getTime();
        lastTimeStamp = lastTimeStamp || thisTime;
        var elapsed = thisTime - lastTimeStamp;
        where = where || "";
        if (where) where = " ("+where+")";
        if (console) console.log("TIMESTAMP elapsed (ms): "+elapsed+where, args);
    }

    function hasNeededVersion (need_version, has_version) {
        // if (console) console.log("hasNeededVersion ("+need_version+", "+has_version+")");
        if (!has_version) return false;
        if (!need_version) return true; // Since we have it.
        var need_p = need_version.split(".");
        var has_p = has_version.split(".");
        var need_len = need_p.length;
        var has_len = has_p.length;
        var minlen=Math.min(need_len, has_len);
        var maxlen=Math.min(need_len, has_len);
        for (var i=0; i<maxlen; i++) {
            if (i<minlen) {
                if (need_p[i]*1 > has_p[i]*1) {
                    return false;
                } if (need_p[i]*1 < has_p[i]*1) {
                    return true;
                }
            }
        }
        if (need_len > has_len) {
            return false;
        }
        return true;
    }

    function getConsoleBack () {
        // Some sites redefines window.console. Get orig console back
        // (works in Chrome, but not FF):
        var i = document.createElement('iframe');
        i.style.display = 'none';
        document.body.appendChild(i);
        window.console = i.contentWindow.console;
    }

    startTheBookmarklet(myOptions);

    function startTheBookmarklet(bmOpt)
    {
        if ("www.ncbi.nlm.nih.gov" == window.location.hostname)
            getConsoleBack ();
            
        var myUniqId = "bookmarkletFramework26536"; // For bookmarklet framework, same as in bookmarklet!
        function loadRestOfMyScriptsThenStart(b)
        {
            if (console) console.log("loadRestOfMyScriptsThenStart", b);
            if(b.length===0){
                // Give myBookmarklet an external name so we can call
                // it directly in the first bookmarklet part if this
                // file already have been loaded.
                var bookletFun = function() {
                    myArgs = window[myNamespace+"-myArgs"];
                    myDate = window[myNamespace+"-myDate"];
                    // console.log("serialize=", serialize);
                    if (typeof serialize == "function")
                        if (console) console.log("\n>>>>>>>>>>>>>>>>>>>>>>>>>> myArgs>>>>>>>>>>>>"
                                                 +serialize(myArgs)
                                                 +"<<<<<<<<<<<<<<<<<<<<<<<<<<<<");
                    myBookmarklet();
                }
                window[myNamespace] = bookletFun;
                // myBookmarklet();
                window[myNamespace]();
                return false
            }
            var next = b[0];
            timeStamp("A before getScript:("+next+")");
            var has_it = false;
            var eltsScripts = document.querySelectorAll('script[type="text/javascript"]');
            for (var i=1; i<eltsScripts.length; i++) {
                var src = this.getAttribute("src");
                if (next == src) has_it = true;
            }
            if (window[myUniqId]) {
                for (var i=0, len=window[myUniqId].length; i<len; i++) {
                    var src = window[myUniqId][i];
                    if (next == src) has_it = true;
                }
            }
            if (has_it) {
                loadRestOfMyScriptsThenStart(b.slice(1));
            } else {
                if (!window[myUniqId]) window[myUniqId] = [];
                window[myUniqId].push(next);
                jQuery.getScript(next,
                                 function(){ loadRestOfMyScriptsThenStart(b.slice(1))})
            }
        }
        function loadMyCssFiles(files)
        {
            timeStamp("before adding CSS files:", files);
            for (var i=1; i<files.length; i++) {
                var has_it = false;
                var sheets = document.querySelectorAll('link[rel="stylesheet"]');
                for (var i=1; i<sheets.length; i++) {
                    if (file == this.getAttribute("href")) has_it = true;
                }
                if (!has_it) {
                    var eltLink = mkElt("link", {href:file,rel:"stylesheet"}, null);
                    var eltParent =
                        document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0];
                    eltParent.appendChild(eltLink);
                }
            }
        }
        function loadMyStylesAndScripts()
        {
            timeStamp("loadMyStylesAndScripts");
            loadMyCssFiles(bmOpt.css);
            loadRestOfMyScriptsThenStart(bmOpt.js)
        }

        function loadScript(url, callback){
            var script = document.createElement("script")
            script.type = "text/javascript";
            if (script.readyState){  //IE
                script.onreadystatechange = function(){
                    if (script.readyState == "loaded" ||
                        script.readyState == "complete"){
                        script.onreadystatechange = null;
                        callback();
                    }
                };
            } else {  //Others
                script.onload = function(){
                    callback();
                };
            }
            script.src = url;
            document.getElementsByTagName("head")[0].appendChild(script);
        }


        if (!(typeof myNamespace == "string" && 0 != myNamespace.length))
            throw "ERROR: myNamespace must be defined in Your part of the bookmarklet .js file!";
        // if (console) console.log("myNamespace="+myNamespace);

        lastTimeStamp = undefined;
        timeStamp("\n\n=========== Starting ============================");
        var need_new_jq = false;
        if (bmOpt.jqpath) {
            need_new_jq = true;
            var has_jq;
            if (typeof jQuery != "undefined") {
                has_jq = true;
                need_new_jq = !hasNeededVersion(bmOpt.jquery, jQuery().jquery);
            }
        }
        if (need_new_jq) {
            timeStamp("Will load a new jQuery and run jQuery.noConflict() if needed.");
            loadScript(bmOpt.jqpath,
                       function() {
                           if (!has_jq) jQuery.noConflict();
                           loadMyStylesAndScripts();
                       });
        } else {
            loadMyStylesAndScripts();
        }
    };
})();

//// For Emacs, please don't remove.
// Local Variables:
// coding: utf-8
// End:
