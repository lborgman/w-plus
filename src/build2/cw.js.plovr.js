// See http://www.plovr.com/options.html
{
    "id": "cw",
    // "fingerprint": true,
    "inputs": [
        "cw.js",
        "cw.css.js",
        "../popupMenu.js",
        "../caret-position.js",
        // "../serialize.js", // Uncomment to get a log of some things like myArgs.
    ],
    "paths": ".",
    "externs": [
        "cw-externs.js",
        "jquery-1.8.js" // jQuery is used in the page for updating!
    ],
    "custom-externs-only": false,
    "mode":"advanced",
    // "mode":"simple",
    // "mode":"whitespace",
    "output-file": "../../../Public/it/cw/cw-cld.js",
    "output-wrapper": "/* Copyright 2014 Lennart Borgman, CLDDATE */ (function(){%output%})();",
    "output-charset": "UTF-8"
}
