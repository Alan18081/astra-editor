import React,{Component} from 'react';
import CodeMirror from 'react-codemirror';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/xml/xml';
import 'codemirror/mode/css/css';
import {Paper,Grid,withStyles} from '@material-ui/core';

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
    javascript: ''
  };
  frame = React.createRef();
  handleChangeHtml = newCode => {
    this.setState({
      html: newCode
    });
    this.frame.current.contentDocument.body.innerHTML = newCode;
  };
  handleChangeCss = newCode => {
    this.setState({
      css: newCode
    });
    const iframeHead = this.frame.current.contentDocument.head;
    const currentStyle = iframeHead
      .getElementsByTagName('style')[0];
    if(currentStyle) {
      currentStyle.innerHTML = newCode;
    }
    else {
      const style = document.createElement('style');
      style.innerHTML = newCode;
      this.frame.current.contentDocument.head.appendChild(style);
    }
  };
  handleChangeJavascript = newCode => {
    this.setState({
      javascript: newCode
    });
    const f = new Function(newCode);
    try {
      f();
    }
    catch(err) {
      
    }
    finally {
      f();
    }
  };
  render() {
    const {classes} = this.props;
    return (
      <div>
        <Paper className={classes.frameWrapper}>
          <iframe ref={this.frame} className={classes.frame}></iframe>
        </Paper>
        <Grid container className={classes.row}>
          <Grid item md={4} className={classes.column}>
            <Paper>
              <CodeMirror
                value={this.state.html}
                onChange={this.handleChangeHtml}
                options={{
                  mode: 'xml',
                  smartIndent: true,
                  lineNumbers: true,
                  allowDropFileTypes: ['text/html']
                }}
                className={classes.editor}
              />
            </Paper>
          </Grid>
          <Grid item md={4} className={classes.column}>
            <Paper>
              <CodeMirror
                value={this.state.css}
                onChange={this.handleChangeCss}
                options={{
                  mode: 'css',
                  smartIndent: true,
                  lineNumbers: true,
                  allowDropFileTypes: ['text/css']
                }}
                className={classes.editor}
              />
            </Paper>
          </Grid>
          <Grid item md={4} className={classes.column}>
            <Paper>
              <CodeMirror
                value={this.state.javascript}
                onChange={this.handleChangeJavascript}
                options={{
                  mode: 'javascript',
                  smartIndent: true,
                  lineNumbers: true,
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