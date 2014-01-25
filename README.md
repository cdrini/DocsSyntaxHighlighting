#Google Docs Syntax Coloring

This script allows Google Docs to perform Syntax Highlighting on a given selected text.

Currently Supported Languages:
* C
* JavaScript
* Python
* Racket

## To Install:
1. Open a Google Docs Document
2. Go to Tools -> Script Manager...
3. Click 'New'
4. Select 'Blank Project'
5. Copy the contents of 'quickInstall.js' into Code.gs, replacing default text
6. Go to File -> Save
7. Return to your document, and refresh it. The 'Syntax Coloring' menu should now have appeared.

## To try the (beta) sidebar:
1. Complete the above
2. Go to Tools -> Script Manager again
3. Go to File -> New -> HTML File
4. Name the file 'langSelector' (without the quotes)
5. Paste the contents of langSelector.html into the file
6. Save and refresh your document