import React,{Component} from 'react';
import CodeMirror from 'react-codemirror';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/xml/xml';
import 'codemirror/mode/css/css';
import 'codemirror/addon/hint/html-hint';
import 'codemirror/addon/hint/css-hint';
import 'codemirror/addon/hint/javascript-hint';
import 'codemirror/addon/edit/closebrackets.js';
import 'codemirror/addon/edit/closetag.js';
import 'codemirror/addon/edit/matchbrackets.js';
import 'codemirror/addon/edit/matchtags.js';
import {Paper,Grid,withStyles} from '@material-ui/core';
import check from 'syntax-error';

const handleEval = code => {
  try {
    eval(code);
  }
  catch(err) {
    handleEval(code);
  }
};

const styles = theme => ({
  editor: {
    fontSize: 18
  },
  column: {
    padding: `0 ${theme.spacing.unit}px 0`
  },
  row: {
    marginLeft: theme.spacing.unit * -1,
    marginRight: theme.spacing.unit * -1
  },
  frame: {
    width: '100%',
    height: '40vh',
    border: 'none'
  },
  frameWrapper: {
    marginBottom: theme.spacing.unit * 2
  }
});

class Editor extends Component {
  state = {
    html: '',
    css: '',
    javascript: '',
    defaultEditorOptions: {
      smartIndent: true,
      lineNumbers: true,
      autoCloseBrackets: true,
      autoCloseTags: true,
      matchTags: true,
      matchBrackets: true
    }
  };
  frame = React.createRef();
  jsEditor = React.createRef();
  componentDidMount() {
    this.frameHead = this.frame.current.contentDocument.head;
    this.frameBody = this.frame.current.contentDocument.body;
  }
  handleChangeHtml = newCode => {
    this.setState({
      html: newCode
    });
    this.frameBody.innerHTML = newCode;
  };
  handleChangeCss = newCode => {
    this.setState({
      css: newCode
    });
    const currentStyle = this.frameHead
      .getElementsByTagName('style')[0];
    if(currentStyle) {
      currentStyle.innerHTML = newCode;
    }
    else {
      const style = document.createElement('style');
      style.innerHTML = newCode;
      this.frameHead.appendChild(style);
    }
  };
  handleChangeJavascript = newCode => {
    this.setState({
      javascript: newCode
    });
    const err = check(newCode);
    if(!err) {
      const currentScript = this.frameBody.getElementsByTagName('script')[0];
      const template = `function main() {  ${newCode} }`;
      if (currentScript) {
        this.frameBody.removeChild(currentScript);
      }
      const script = document.createElement('script');
      script.textContent = template;
      this.frameBody.appendChild(script);
      this.frame.current.contentWindow.main();
    }
  };
  render() {
    const {classes} = this.props;
    return (
      <div>
        <Paper className={classes.frameWrapper}>
          <iframe ref={this.frame} className={classes.frame} id="active-content"></iframe>
        </Paper>
        <Grid container className={classes.row}>
          <Grid item md={4} sm={12} className={classes.column}>
            <Paper>
              <CodeMirror
                value={this.state.html}
                onChange={this.handleChangeHtml}
                options={{
                  ...this.state.defaultEditorOptions,
                  mode: 'xml',
                  allowDropFileTypes: ['text/html']
                }}
                className={classes.editor}
              />
            </Paper>
          </Grid>
          <Grid item md={4} sm={12} className={classes.column}>
            <Paper>
              <CodeMirror
                value={this.state.css}
                onChange={this.handleChangeCss}
                options={{
                  ...this.state.defaultEditorOptions,
                  mode: 'css',
                  allowDropFileTypes: ['text/css']
                }}
                className={classes.editor}
              />
            </Paper>
          </Grid>
          <Grid item md={4} sm={12} className={classes.column}>
            <Paper>
              <CodeMirror
                name="jsEditor"
                value={this.state.javascript}
                onChange={this.handleChangeJavascript}
                options={{
                  ...this.state.defaultEditorOptions,
                  mode: 'javascript',
                  allowDropFileTypes: [
                    'application/javascript',
                    'application/x-javascript',
                    'application/ecmascript'
                  ]
                }}
                className={classes.editor}
              />
            </Paper>
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default withStyles(styles)(Editor);