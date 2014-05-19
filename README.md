# w-plus #

Bookmarklet to simplify searching.

For more information please look at

http://dl.dropboxusercontent.com/u/848981/it/cw/cw.html


# Building #

The bookmarklet must be built before it can be used. Plovr
(http://plovr.com) is used for building.

The parameters are in the file src/build/cw.plovr.js

## Adding the CSS ##

The definition for CSS are in the file cw.css. However since this is a
bookmarklet it can't be used directly. It must be converted to a
function that is added to the bookmarklet. This can be done in Emacs
using the nXhtml library, with the function jsut-jquery-css-to-js.

An example of the converted CSS is in the src/build directory.

nXhtml can be found at https://github.com/lborgman/nxhtml.
