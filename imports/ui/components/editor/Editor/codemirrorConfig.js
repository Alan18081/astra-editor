import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/xml/xml';
import 'codemirror/mode/css/css';
import 'codemirror/addon/hint/html-hint';
import 'codemirror/addon/hint/css-hint';
import 'codemirror/addon/hint/javascript-hint';
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/edit/matchbrackets';
import 'codemirror/addon/edit/matchtags';
import 'codemirror/keymap/emacs';

export default  {
  smartIndent: true,
  lineNumbers: true,
  autoCloseBrackets: true,
  autoCloseTags: true,
  matchTags: true,
  matchBrackets: true,
  autoResize: true
}