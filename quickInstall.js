// STYLES BASES

function isOneOf(b) {return function(a) {return b.indexOf(a) != -1}}
function isEqualTo(a) {return function(b) {return a == b}}
function startsWithOneOf(b) {return function(a) {return b.indexOf(a[0]) != -1}}
function isComposedOf(atoms) { return function(lst) {
  if(lst.length ===0) return false;
  for(var i = 0; i < lst.length; i++){
    // If is present
    if (atoms.indexOf(lst[i]) !== -1) continue;
    else return false;
  }
  return true;
}}
var isNumber = function(lst) {
    if(lst[0] === '.') return isNumber(lst.slice(1,lst.length-1));
    else return isComposedOf(numbers)(lst);
    return result;
}

var numbers = '0123456789';

//Removes all elements equal to to_rem from this, modifying the original array.
Array.prototype.remove = function(to_rem){
    var index = this.indexOf(to_rem);
    var result = this;
    
    if(index !== -1){
        result.splice(index, 1);
        return result.remove(to_rem);
    }
    else{
        return result;
    }
}


languages = {};
// Format of a styling rule:
// [ 0:chunkCheck, 1:style(inclusive), 2:endChars or endCount, 3:startCharStyle, 4:endCharStyle ]

//*********** Racket ***************
languages.racket = {};
languages.racket.breaks = " ()[]\r\"'\t\\;#|’‘";
languages.racket.doubles = ["#\\", '#|', '|#', '\\"', '...', '#f', '#t', '#:'];
languages.racket.keywords = ['and', 'begin', 'call-with-curent-continuation', 'call-with-input-file', 'call/cc', 'case', 'case-lambda', 'class', 'cond', 'define', 'define-class', 'define-struct', 'define-syntax', 'delay', 'do', 'dynamic-wind', 'else', 'exit-handler', 'field', 'for-each', 'if', 'import', 'inherit', 'init-field', 'interface', 'lambda', 'let', 'let*', 'let*-values', 'let-syntax', 'let-values', 'let/ec', 'letrec', 'letrec-syntax', 'local', 'map', 'mixin', 'opt-lambda', 'or', 'override', 'protect', 'provide', 'public', 'rename', 'require', 'require-for-syntax', 'syntax', 'syntax-case', 'syntax-error', 'syntax-rules', 'unit/sig', 'unless', 'when', 'with-syntax'];
languages.racket.commentLine = ';';
languages.racket.builtin = ['+', '-', '*', '/', 'cons', 'list', 'empty?', 'first', 'rest', '<', '>', 'equal?', '=', '<=', '>=', 'build-list', 'filter', 'quicksort', 'map', 'andmap', 'ormap', 'foldr', 'foldl', 'assf', 'zero?', 'add1', 'sub1'];
languages.racket.styles = {};

languages.racket.styles.drracket = {};
languages.racket.styles.drracket.call = function() {coloredCode('racket', 'drracket')};
languages.racket.styles.drracket.def = {fgcolor:'#262680', fontSize:10};
languages.racket.styles.drracket.rules = [[isOneOf('()[]'), {fgcolor:'#843c24'}], // formatting is only one chunk long
                                          [isEqualTo(';'), {fgcolor:'#c2741f'}, '\r'], //formatting will include \r
                                          [isEqualTo('#'), {fgcolor:'#000000'}, '\r'],
                                          [isEqualTo('#|'), {fgcolor:'#c2741f'}, ['|#']],
                                          [isEqualTo('#\\'), {fgcolor:'#298026'}, 1],
                                          [isOneOf(['#t','#f']), {fgcolor:'#298026'}],
                                          [isNumber, {fgcolor:'#298026'}],
                                          [isEqualTo("'"), {fgcolor:'#298026'}],
                                          [isEqualTo('"'), {fgcolor:'#298026'}, '"\r']];

languages.racket.styles.UWCS = {};
languages.racket.styles.UWCS.def = {fgcolor:'#0000FF', fontFamily:'ARIAL', fontSize:12};
languages.racket.styles.UWCS.rules = [[isOneOf('()[]?'), {fgcolor:'#59439B'}],
                                      [isOneOf(languages.racket.keywords), {fgcolor:'#FF0000'}],
                                      [isEqualTo(';'), {fgcolor:'#59439B'}, '\r'],
                                      [isEqualTo('#|'), {fgcolor:'#59439B'}, ['|#']],
                                      [isOneOf(['...', 'empty']), {fgcolor:'#59439B'}],
                                      [isNumber, {fgcolor:'#231F20'}],
                                      [isOneOf("'‘’"), {fgcolor:'#231F20'}, 1, {fgcolor:'#59439B'}],
                                      [isEqualTo('#\\'), {fgcolor:'#231f20'}, 1],
                                      [isEqualTo('"'), {fgcolor:'#231F20'}, '"\r', {fgcolor:'#59439B'}, {fgcolor:'#59439B'}]];

languages.racket.styles.HtDP = {};
languages.racket.styles.HtDP.def = {fgcolor:'#000080', fontSize:10};
languages.racket.styles.HtDP.rules = [[isOneOf('()[]'), {fgcolor:'#A52A2A'}],
                                      [isOneOf(languages.racket.keywords), {fgcolor:'#A52A2A', bold:true}],
                                      [isEqualTo(';'), {fgcolor:'#008080'}, '\r'],
                                      [isOneOf(languages.racket.builtin), {fgcolor:'#A52A2A'}],
                                      [isOneOf(['...', "'"]), {fgcolor:'#A52A2A'}],
                                      [isNumber, {fgcolor:'#008000'}],
                                      [isEqualTo('"'), {fgcolor:'#008000'}, '"\r']];

//****************** JavaScript ************************

languages.javascript = {};
languages.javascript.breaks = " {}()/[].\r'\",;=-+*/\t";
languages.javascript.doubles = ["//", '/*', '*/', '\\"'];
languages.javascript.keywords = ['abstract', 'boolean', 'break', 'byte', 'case', 'catch', 'char', 'class', 'const', 'continue', 'debugger', 'default', 'delete', 'do', 'double', 'else', 'enum', 'export', 'extends', 'final', 'finally', 'float', 'for', 'function', 'goto', 'if', 'implements', 'import', 'in', 'instanceof', 'int', 'interface', 'long', 'native', 'new', 'package', 'private', 'protected', 'public', 'return', 'short', 'static', 'super', 'switch', 'synchronized', 'this', 'throw', 'throws', 'transient', 'try', 'typeof', 'var', 'void', 'volatile', 'while', 'with'];
languages.javascript.styles = {};

languages.javascript.styles.google = {};
languages.javascript.styles.google.def = {fontFamily:'DROID_SANS', fontSize:10};
languages.javascript.styles.google.rules = [[isOneOf(languages.javascript.keywords), {fgcolor:'#8C0088'}],
                                            [isNumber, {fgcolor:'#116644'}],
                                            [isOneOf(['true','false']), {fgcolor:'#221199'}],
                                            [isEqualTo("'"), {fgcolor:'#AA1111'}, "'\r"],
                                            [isEqualTo('"'), {fgcolor:'#AA1111'}, '"\r'],
                                            [isEqualTo('//'),{fgcolor:'#AA5500'}, '\r'],
                                            [isEqualTo('/*'),{fgcolor:'#AA5500'}, ['*/']]];

languages.javascript.styles.notepadpp = {};
languages.javascript.styles.notepadpp.def = {fontSize:10};
languages.javascript.styles.notepadpp.rules = [[isOneOf(languages.javascript.keywords.concat('prototype','true','false')), {fgcolor:'#000080', bold:true, italic:true}],
                                               [isNumber, {fgcolor:'#ff0000'}],
                                               [isEqualTo("'"), {fgcolor:'#808080'}, "'\r"],
                                               [isEqualTo('"'), {fgcolor:'#808080'}, '"\r'],
                                               [isEqualTo('//'), {fgcolor:'#008000'}, '\r'],
                                               [isEqualTo('/*'), {fgcolor:'#008000'}, ['*/']]];

languages.javascript.styles.codecademyLabs = {};
languages.javascript.styles.codecademyLabs.def = {fontSize:10};
languages.javascript.styles.codecademyLabs.rules = [[isOneOf(languages.javascript.keywords.concat('prototype','true','false')), {fgcolor:'#0000FF'}],
                                                    [isNumber, {fgcolor:'#4C8882'}],
                                                    [isEqualTo("'"), {fgcolor:'#036A07'}, "'\r"],
                                                    [isEqualTo('"'), {fgcolor:'#036A07'}, '"\r'],
                                                    [isEqualTo('//'), {fgcolor:'#4C886B'}, '\r'],
                                                    [isEqualTo('/*'), {fgcolor:'#4C886B'}, ['*/']]];

//****************** Python **********************

languages.python = {};
languages.python.breaks = " ()[]{}:.\t\"+-/*=\r!#'";
languages.python.doubles = ['"""', '+=', '!='];
languages.python.keywords = ['and', 'as', 'assert', 'break', 'class', 'continue', 'def', 'del', 'elif', 'else', 'except', 'exec', 'False', 'finally', 'for', 'from', 'global', 'if', 'import', 'in', 'is', 'lambda', 'None', 'not', 'or', 'pass', 'print', 'raise', 'return', 'triple', 'True', 'try', 'while', 'with', 'yield'];
languages.python.styles = {};

languages.python.styles.notepadpp = {};
languages.python.styles.notepadpp.def = {fontSize:10};
languages.python.styles.notepadpp.rules = [[isEqualTo('def'), {}, 2, {fgcolor:'#0000FF', bold:true}, {fgcolor:'#FF00FF'}],
                                           [isOneOf(languages.python.keywords), {fgcolor:'#0000FF', bold:true}],
                                           [isOneOf('()[]+-*/=<>.,'.split('').concat('+=', '!=')), {fgcolor:'#000080', bold:true}],
                                           [isNumber, {fgcolor:'#FF0000'}],
                                           [isEqualTo("'"), {fgcolor:'#808080'}, "'\r"],
                                           [isEqualTo('"'), {fgcolor:'#808080'}, '"\r'],
                                           [isEqualTo('"""'), {fgcolor:'#808080'}, ['"""']],
                                           [isEqualTo('#'), {fgcolor:'#008000'}, '\r']];



// format: Text Style Nat Nat -> Text
// Applies style to text from start to end 
function format(text, style, start, end){
  if(typeof(start) == 'undefined'){
    start = 0
    end = text.getText().length - 1
  }
  
  for (var key in style){
    switch (key){
      case "fgcolor":
        text.setForegroundColor(start, end, style.fgcolor);
        break;
      case "bgcolor":
        text.setBackgroundColor(start, end, style.bgcolor);
        break;
      case "bold":
        text.setBold(start, end, style.bold);
        break;
      case "italic":
        text.setItalic(start, end, style.italic);
        break;
      case "fontFamily":
        text.setFontFamily(start, end, DocumentApp.FontFamily[style.fontFamily]);
        break;
      case "fontSize":
        text.setFontSize(start, end, style.fontSize);
        break;
      default:
        break;
    } 
  }    
}

// MAIN


//Data Definitions
// Style: Dictionary with any keys from fgcolor, bgcolor, bold, italic, fontfamily, etc.

// Styles
// TO-DO: Include Error correction (like when using ” instead of ")
//        Change the word 'skin' to 'style'

//UI Menu
var ui = DocumentApp.getUi();

function onOpen() {
  ui.createMenu('Syntax Coloring')
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