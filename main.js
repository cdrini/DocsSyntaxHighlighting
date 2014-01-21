//Data Definitions
// Style: Dictionary with any keys from fgcolor, bgcolor, bold, italic, fontfamily, etc.

// Styles
// TO-DO: Include Error correction (like when using ” instead of ")
//        Change the word 'skin' to 'style'

//UI Menu
var ui = DocumentApp.getUi();

function onOpen() {
  ui.createMenu('Syntax Coloring')
	  .addSubMenu(ui.createMenu('C')
				 .addItem('Notepad++', 'cnotepadpp'))
      .addSubMenu(ui.createMenu('JavaScript')
                 .addItem('Codecademy', 'jscodecademy')
                 .addItem('Google Apps', 'jsgoogle')
                 .addItem('Notepad++', 'jsnotepadpp'))
      .addSubMenu(ui.createMenu('Python')
          .addItem('Notepad++', 'pythonnotepadpp'))
      .addSubMenu(ui.createMenu('Racket')
          .addItem('Dr Racket', 'racketdrracket')
          .addItem('HtDP', 'racketHtDP')
          .addItem('UW Computer Science', 'racketUWCS'))
      .addToUi();
}

function cnotepadpp(){coloredCode('c', 'notepadpp')};
function racketdrracket(){coloredCode('racket', 'drracket')};
function racketHtDP(){coloredCode('racket', 'HtDP')};
function racketUWCS(){coloredCode('racket', 'UWCS')};
function jsgoogle(){coloredCode('javascript', 'google')};
function jsnotepadpp(){coloredCode('javascript', 'notepadpp')};
function pythonnotepadpp(){coloredCode('python', 'notepadpp')};
function jscodecademy(){coloredCode('javascript', 'codecademyLabs')};

// Some useful functions
Array.prototype.contains = function(query){
    return (this.indexOf(query) !== -1);
}
String.prototype.contains = function(query){
    return (this.indexOf(query) !== -1);
}

// parser: String String (listof String) -> (listof String)
// Splits the string str at every character in breaks, returning
// string with the break characters as separate chunks. Any element
// in multichar (which must start with one of the breaks) will remain
// together.
function parser(str, breaks, multichar){
    var result = [];
    var current = "";
    var mode = '';
    var multiPossib = [];
    var multiPossib2= [];
    var multiIndex;
    if(!multichar){var multichar = [];}
    
	//cycle through the characters
    for(var c = 0; c < str.length; c++){
        var char = str[c];
        
        if(mode == 'decimal'){
            if(isOneOf(numbers)(char)){
                current = current + char;
            }
            else if(isOneOf(breaks)(char)){
                result = result.concat(current);
                result = result.concat(parser(str.slice(c,str.length), breaks, multichar));
                return result;
            }
            else{
                result = result.concat(current[0], parser(str.slice(c-current.length+1,str.length), breaks, multichar));
                return result;
            }
        }
		else if(mode == 'multi'){
			for (var j = 0; j < multiPossib.length; j++){
                if (multiIndex < multiPossib[j].length && char == multiPossib[j][multiIndex]){
                    multiPossib2 = multiPossib2.concat(multiPossib[j]);
                }
			}
            multiIndex = multiIndex++;
            if(multiPossib2.length === 0){ // aka, no possibilites left
					result = result.concat(current);
					result = result.concat(parser(str.slice(c,str.length), breaks, multichar));
                    return result;
					}
            else{
                multiPossib = multiPossib2;
                multiPossib2 = [];
                current = current + char;
            }
		}
        else if(char === '.'){
            if(current) result = result.concat(current);
            mode = 'decimal';
            current = char;
        }
		else if(breaks.indexOf(char) != -1){
			if(current) result = result.concat(current);
			for(var m = 0; m < multichar.length; m++){
				if(char == multichar[m][0]){
					mode = 'multi';
					multiPossib = multiPossib.concat(multichar[m]);
					multiIndex = 1;
                    current = char;
				}
			}
			if(multiPossib.length === 0){
				result = result.concat(char);
				current = '';
			}
		}
		else{
			current = current + char;
		}
	}
    if(current) result = result.concat(current);
    return result;
}

function coloredCode(lang, skin) {

  // TO-DO: Support partial paragraph selections

  // Grab selection. If none, alert and exit
  var selection = DocumentApp.getActiveDocument().getSelection();
  if (!selection) {
    ui.alert('Cannot find a selection in the document.');
    return;
  }
  
  var selectedElements = selection.getSelectedElements();
  
  var mode = '';
  var glideStart, glideEndChars, glideStyle, glideStartStyle, glideEndStyle, glideCount;
  
  //iterating through selected elements
  for (var i = 0; i < selectedElements.length; i++) {
    var selectedElement = selectedElements[i];
    
    var paragraph = selectedElement.getElement().editAsText();
    var paragraphText = paragraph.getText();
    if(paragraphText.length === 0) continue;
    var paragraphChunks = parser(paragraphText, languages[lang]['breaks'], languages[lang]['doubles']);
    
    var startI = 0;
    var endI = 0;
    var isLast;
    
    //Remove any styling
    format(paragraph, {bold:false, italic:false, fgcolor:'#000000', bgcolor:'#FFFFFF', fontFamily:'COURIER_NEW', fontSize:12});
    //Apply default style
    format(paragraph, languages[lang]['styles'][skin]['def']);
    
    //iterating through chunks
    for (var j = 0; j < paragraphChunks.length; ++j){
      var chunk = paragraphChunks[j];
      endI = startI + chunk.length - 1;
      isLast = (j === paragraphChunks.length - 1)
      
      //iterating rules of a languages
      for (var k = 0; k < languages[lang]['styles'][skin]['rules'].length; k++){
        var currentRule = languages[lang]['styles'][skin]['rules'][k];
        
        // the predicate function that will be applied to each chunk
        var chunkCheck = currentRule[0];
        // the style for the current rule
        var style = currentRule[1];
        
        if(mode === 'glide'){
          
          // glide has finished
          if((typeof glideCount !== 'undefined' && glideCount === 0)
             || (typeof glideEndChars !== 'undefined' && glideEndChars.contains(chunk))
          || (typeof glideEndChars !== 'undefined' && isLast && glideEndChars.contains('\r'))){
            format(paragraph, glideStyle, glideStart, endI);
            if(typeof glideEndStyle !== 'undefined' && !(typeof glideEndChars !== 'undefined' && isLast && !glideEndChars.contains(chunk))){
              format(paragraph, glideEndStyle, startI, endI);
            }
            mode = '';
            delete(glideCount);
            delete(glideEndChars);
            var glideCount, glideEndChars;
          }
          else if(isLast){
            format(paragraph, glideStyle, glideStart, endI);
          }
          
          if(typeof glideCount !== 'undefined'){
            glideCount = glideCount - 1;
          }
          break;
          
        }
        
        else if (chunkCheck(chunk)){
          //if formatting only the current chunk
          if(typeof currentRule[2] === 'undefined'){
            format(paragraph, style, startI, endI);
            break;
          }
          
          if (typeof currentRule[2] === 'number') glideCount = currentRule[2]-1;
          else glideEndChars = currentRule[2];
          glideStyle = currentRule[1];
          
          glideStartStyle = currentRule[3];
          glideStart = startI;
          mode = 'glide';
          
          // we can't start glide if we're at the end of a paragraph
          if(isLast && typeof glideEndChars !== 'undefined' && glideEndChars.contains('\r')){
            format(paragraph, glideStyle, startI, endI);
            mode = '';
          }
          
          if(typeof glideStartStyle !== 'undefined'){
            format(paragraph, glideStartStyle, startI, endI);
            glideStart = endI + 1;
          }
          glideEndStyle = currentRule[4];
          break;
        }
      }
      startI = endI + 1
    }
  }
}