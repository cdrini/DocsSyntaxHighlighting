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

languages.scheme = {};
languages.scheme.breaks = " ()[]\r\"'\t\\;#|’‘";
languages.scheme.doubles = ["#\\", '#|', '|#', '\\"', '...'];
languages.scheme.keywords = ['and', 'begin', 'call-with-curent-continuation', 'call-with-input-file', 'call/cc', 'case', 'case-lambda', 'class', 'cond', 'define', 'define-class', 'define-struct', 'define-syntax', 'delay', 'do', 'dynamic-wind', 'else', 'exit-handler', 'field', 'for-each', 'if', 'import', 'inherit', 'init-field', 'interface', 'lambda', 'let', 'let*', 'let*-values', 'let-syntax', 'let-values', 'let/ec', 'letrec', 'letrec-syntax', 'local', 'map', 'mixin', 'opt-lambda', 'or', 'override', 'protect', 'provide', 'public', 'rename', 'require', 'require-for-syntax', 'syntax', 'syntax-case', 'syntax-error', 'syntax-rules', 'unit/sig', 'unless', 'when', 'with-syntax'];
languages.scheme.commentLine = ';';
languages.scheme.builtin = ['+', '-', '*', '/', 'cons', 'list', 'empty?', 'first', 'rest', '<', '>', 'equal?', '=', '<=', '>=', 'build-list', 'filter', 'quicksort', 'map', 'andmap', 'ormap', 'foldr', 'foldl', 'assf', 'zero?', 'add1', 'sub1'];
languages.scheme.styles = {};

languages.javascript = {};
languages.javascript.breaks = " {}()/[].\r'\",;=-+*/\t";
languages.javascript.doubles = ["//", '/*', '*/', '\\"'];
languages.javascript.keywords = ['abstract', 'boolean', 'break', 'byte', 'case', 'catch', 'char', 'class', 'const', 'continue', 'debugger', 'default', 'delete', 'do', 'double', 'else', 'enum', 'export', 'extends', 'final', 'finally', 'float', 'for', 'function', 'goto', 'if', 'implements', 'import', 'in', 'instanceof', 'int', 'interface', 'long', 'native', 'new', 'package', 'private', 'protected', 'public', 'return', 'short', 'static', 'super', 'switch', 'synchronized', 'this', 'throw', 'throws', 'transient', 'try', 'typeof', 'var', 'void', 'volatile', 'while', 'with'];
languages.javascript.styles = {};

languages.python = {};
languages.python.breaks = " ()[]{}:.\t\"+-/*=\r!#'";
languages.python.doubles = ['"""', '+=', '!='];
languages.python.keywords = ['and', 'as', 'assert', 'break', 'class', 'continue', 'def', 'del', 'elif', 'else', 'except', 'exec', 'False', 'finally', 'for', 'from', 'global', 'if', 'import', 'in', 'is', 'lambda', 'None', 'not', 'or', 'pass', 'print', 'raise', 'return', 'triple', 'True', 'try', 'while', 'with', 'yield'];
languages.python.styles = {};

// [ 0:chunkCheck, 1:style(inclusive), 2:endChars or endCount, 3:startCharStyle, 4:endCharStyle ]

languages.python.styles.notepadpp = {};
languages.python.styles.notepadpp.def = {fontSize:10};
languages.python.styles.notepadpp.rules = [[isEqualTo('def'), {}, 1, {fgcolor:'#0000FF', bold:true}, {fgcolor:'#FF00FF'}],
                                           [isOneOf(languages.python.keywords), {fgcolor:'#0000FF', bold:true}],
                                           [isOneOf('()[]+-*/=<>.,'.split('').concat('+=', '!=')), {fgcolor:'#000080', bold:true}],
                                           [isNumber, {fgcolor:'#FF0000'}],
                                           [isEqualTo("'"), {fgcolor:'#808080'}, "'\r"],
                                           [isEqualTo('"'), {fgcolor:'#808080'}, '"\r'],
                                           [isEqualTo('"""'), {fgcolor:'#808080'}, ['"""']],
                                           [isEqualTo('#'), {fgcolor:'#008000'}, '\r']];

languages.scheme.styles.drracket = {};
languages.scheme.styles.drracket.call = function() {coloredCode('scheme', 'drracket')};
languages.scheme.styles.drracket.def = {fgcolor:'#262680', fontSize:10};
languages.scheme.styles.drracket.rules = [[isOneOf('()[]'), {fgcolor:'#843c24'}], // formatting is only one chunk long
                                          [isEqualTo(';'), {fgcolor:'#c2741f'}, '\r'], //formatting will include \r
                                          [isEqualTo('#'), {fgcolor:'#000000'}, '\r'],
                                          [isEqualTo('#|'), {fgcolor:'#c2741f'}, ['|#']],
                                          [isEqualTo('#\\'), {fgcolor:'#298026'}, 0],
                                          [isNumber, {fgcolor:'#298026'}],
                                          [isEqualTo("'"), {fgcolor:'#298026'}],
                                          [isEqualTo('"'), {fgcolor:'#298026'}, '"\r']];

languages.scheme.styles.UWCS = {};
languages.scheme.styles.UWCS.def = {fgcolor:'#0000FF', fontFamily:'ARIAL', fontSize:12};
languages.scheme.styles.UWCS.rules = [[isOneOf('()[]?'), {fgcolor:'#59439B'}],
                                      [isOneOf(languages.scheme.keywords), {fgcolor:'#FF0000'}],
                                      [isEqualTo(';'), {fgcolor:'#59439B'}, '\r'],
                                      [isEqualTo('#|'), {fgcolor:'#59439B'}, ['|#']],
                                      [isOneOf(['...', 'empty']), {fgcolor:'#59439B'}],
                                      [isNumber, {fgcolor:'#231F20'}],
                                      [isOneOf("'‘’"), {fgcolor:'#231F20'}, 0, {fgcolor:'#59439B'}],
                                      [isEqualTo('#\\'), {fgcolor:'#231f20'}, 0],
                                      [isEqualTo('"'), {fgcolor:'#231F20'}, '"\r', {fgcolor:'#59439B'}, {fgcolor:'#59439B'}]];

languages.scheme.styles.HtDP = {};
languages.scheme.styles.HtDP.def = {fgcolor:'#000080', fontSize:10};
languages.scheme.styles.HtDP.rules = [[isOneOf('()[]'), {fgcolor:'#A52A2A'}],
                                      [isOneOf(languages.scheme.keywords), {fgcolor:'#A52A2A', bold:true}],
                                      [isEqualTo(';'), {fgcolor:'#008080'}, '\r'],
                                      [isOneOf(languages.scheme.builtin), {fgcolor:'#A52A2A'}],
                                      [isOneOf(['...', "'"]), {fgcolor:'#A52A2A'}],
                                      [isNumber, {fgcolor:'#008000'}],
                                      [isEqualTo('"'), {fgcolor:'#008000'}, '"\r']];

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