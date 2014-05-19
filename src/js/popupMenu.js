var evMenuLoopKeydown = null;

function execMenu(oo, callbackFinish, callbackKeydown) {
    unbindMenu(oo);
    function changeBackgroundColor(ths, color) {
        ths.style.cssText =
            ths.style.cssText
            .replace(/background-color:[^;]*/, "background-color:"+color+"!important;");
    }
    var menuId = "#"+oo["menu"];
    // var menu = jQuery(menuId);
    var menuElt = document.querySelector(menuId);

    ////////////////////////////////////////////
    ////// Mouse
    // Hover events
    // Fix-me: specific classnames!

    var menuAList = document.querySelectorAll(menuId+" a");
    for (var i=0; i<menuAList.length; i++) {
        menuAList[i].addEventListener("mouseover", function() {
            this.parentNode.classList.add("hover");
        });
        menuAList[i].addEventListener("mouseout", function() {
            this.parentNode.classList.remove("hover");
        });
    }
    
    ////////////////////////////////////////////
    ////// Keyboard
    var kbhoverElt = document.querySelector(menuId+" .kbhover");
    if (!kbhoverElt) 
        kbhoverElt = document.querySelector(menuId+" p"); // first
    kbhoverElt.classList.add("kbhover");
    changeBackgroundColor(kbhoverElt, "#ef0");

    if (!evMenuLoopKeydown)
    evMenuLoopKeydown = function(e) {
        // console.log("e", e);
        e.stopPropagation();
	switch( e.keyCode ) {
	case 38: // up
            callbackKeydown();
            var prev = document.querySelector(menuId+' p.kbhover');
            prev.classList.remove("kbhover");
            changeBackgroundColor(prev, "#fff");
            prev = prev.previousSibling;
            if (!prev) {
                var allP = document.querySelectorAll(menuId+" p");
                prev = allP[allP.length-1];
            } else
                while ("P" != prev.tagName) { prev = prev.previousSibling; }
            prev.classList.add("kbhover");
            changeBackgroundColor(prev, "#ef0");
            // prev.scrollIntoView(false);
            scrollInIfNeeded(prev);
            return false;
	    break;
	case 40: // down
            callbackKeydown();
            var next = document.querySelector(menuId+' p.kbhover');
            next.classList.remove("kbhover");
            changeBackgroundColor(next, "#fff");
            next = next.nextSibling;
            if (!next) {
                next = document.querySelector(menuId+" p");
            } else
                while ("P" != next.tagName) { next = next.nextSibling; }
            next.classList.add("kbhover");
            changeBackgroundColor(next, "#ef0");
            // next.scrollIntoView(false);
            scrollInIfNeeded(next);
            return false;
	    break;
	case 13: // enter
            callbackKeydown();
	    var aLink = document.querySelector(menuId+' p.kbhover A');
            //// https://developer.mozilla.org/en-US/docs/Web/API/document.createEvent
            var eventClick = new MouseEvent('click', {
                'view': window,
                'bubbles': true,
                'cancelable': true
            });
            var eventDown = new MouseEvent('mousedown', {
                'view': window,
                'bubbles': false,
                'cancelable': true
            });
            // aLink.onmousedown(); 
            var canceled = !aLink.dispatchEvent(eventDown);
            console.log("aLink eventdown canceled=", canceled);
            var canceled = !aLink.dispatchEvent(eventClick);
            if (canceled) {
                // A handler called preventDefault.
                console.log("aLink click canceled");
            } else {
                // None of the handlers called preventDefault.
                console.log("aLink click not canceled");
            }
            return false;
	    break;
	}
        // Fix-me: key still do not make it to the main window in GMail. Why???
        return true;
        // return false;
    };
    document.addEventListener("keydown", evMenuLoopKeydown);
    menuElt.focus();

}; // end execMenu

function scrollInIfNeeded(elt) {
    var eltBr = elt.getBoundingClientRect();
    if (eltBr.bottom > window.innerHeight) {
        console.log("scrolling up");
        elt.scrollIntoView(false);
    }
}

function unbindMenu(oo) {
    // console.log("unbindMenu");
    document.removeEventListener("keydown", evMenuLoopKeydown);
}; // unbindMenu
