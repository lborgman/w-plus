// http://stackoverflow.com/questions/512528/set-cursor-position-in-html-textbox
// Seems to require that textarea is used for input.
// function doGetCaretPosition (ctrl) {

//     var CaretPos = 0;
//     // IE Support
//     if (document.selection) {

//         ctrl.focus ();
//         var Sel = document.selection.createRange ();

//         Sel.moveStart ('character', -ctrl.value.length);

//         CaretPos = Sel.text.length;
//     }
//     // Firefox support
//     else if (ctrl.selectionStart || ctrl.selectionStart == '0')
//         CaretPos = ctrl.selectionStart;

//     return (CaretPos);

// }
// http://stackoverflow.com/questions/1125292/how-to-move-cursor-to-end-of-contenteditable-entity/3866442#3866442
// http://stackoverflow.com/questions/21049233/how-to-move-the-carret-in-a-contenteditable-div-using-jquery/
function setEndOfContenteditable(contentEditableElement)
{
    var range,selection;
    if(document.createRange)//Firefox, Chrome, Opera, Safari, IE 9+
    {
        range = document.createRange();//Create a range (a range is a like the selection but invisible)
        range.selectNodeContents(contentEditableElement);//Select the entire contents of the element with the range
        range.collapse(false);//collapse the range to the end point. false means collapse to end rather than the start
        selection = window.getSelection();//get the selection object (allows you to change selection)
        selection.removeAllRanges();//remove any selections already made
        selection.addRange(range);//make the range you have just created the visible selection
    }
    else if(document.selection)//IE 8 and lower
    { 
        range = document.body.createTextRange();//Create a range (a range is a like the selection but invisible)
        range.moveToElementText(contentEditableElement);//Select the entire contents of the element with the range
        range.collapse(false);//collapse the range to the end point. false means collapse to end rather than the start
        range.select();//Select the range (make it the visible selection
    }
}
// function setCaretPositionJQ(ctrl, pos) {
//     console.log("setCaretPositionJQ to", pos, ctrl);
//     // e.which = 39;
//     ctrl.focus(); // This causes a window scroll???
//     var e = jQuery.Event("keypress", { keyCode : 39} );
//     jQuery(ctrl).trigger(e);
//     console.log("e=", e);
// }
// function setCaretPosition(ctrl, pos)
// {
//     console.log("setCaretPosition to", pos, ctrl);
//     if(ctrl.setSelectionRange)
//     {
//         ctrl.focus();
//         ctrl.setSelectionRange(pos,pos);
//     }
//     else if (ctrl.createTextRange) {
//         var range = ctrl.createTextRange();
//         range.collapse(true);
//         range.moveEnd('character', pos);
//         range.moveStart('character', pos);
//         range.select();
//     } else {
//         var kev = document.createEvent("KeyboardEvent");
//         if (kev.initKeyEvent)
//             kev.initKeyEvent("keypress",
//                              false, // don't bubble
//                              true, // cancelable
//                              null,
//                              false, // ctrl
//                              false, // shift
//                              false, // meta
//                              39, // keyCode, should be right arrow, fix-me
//                              0); // charCode
//         else {
//             kev.initKeyboardEvent("keypress",
//                                   false,
//                                   true,
//                                   null, // window,
//                                   0, // false,
//                                   false,
//                                   0, // false,
//                                   false,
//                                   39,
//                                   0);
//             kev.keyCode = 39;
//             console.log("kev=", kev);
//         }
//         ctrl.dispatchEvent(kev);
//     }
// }
// http://stackoverflow.com/questions/263743/how-to-get-caret-position-in-textarea
// function getCaret(el) { 
//   if (el.selectionStart) { 
//     return el.selectionStart; 
//   } else if (document.selection) { 
//     el.focus(); 

//     var r = document.selection.createRange(); 
//     if (r == null) { 
//       return 0; 
//     } 

//     var re = el.createTextRange(), 
//         rc = re.duplicate(); 
//     re.moveToBookmark(r.getBookmark()); 
//     rc.setEndPoint('EndToStart', re); 

//     return rc.text.length; 
//   }  
//   return 0; 
// }
