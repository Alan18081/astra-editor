import React,{Component} from 'react';
import {Paper,Grid,withStyles} from '@material-ui/core';
import check from 'syntax-error';
import options from './codemirrorConfig';

import EditorPage from '../EditorPage/index';
import Chat from '../../chat/Chat/index';

import styles from './styles';

class Editor extends Component {
  state = {
    html: '',
    css: '',
    javascript: ''
  };
  frame = React.createRef();
  // static getDerivedStateFromProps({project}) {
  //   const {html,css,javascript} = project;
  //   return {
  //     html,
  //     css,
  //     javascript
  //   }
  // }
  componentDidMount() {
    this.frameHead = this.frame.current.contentDocument.head;
    this.frameBody = this.frame.current.contentDocument.body;
    const {html,css,javascript} = this.props.project;
    this.handleChangeHtml(null,null,html);
    this.handleChangeCss(null,null,css);
    this.handleChangeJavascript(null,null,javascript);
  }
  handleChangeHtml = (editor,data,newCode) => {
    this.setState({
      html: newCode
    });
    this.frameBody.innerHTML = newCode;
    console.log(editor);
    console.log(data);
  };
  handleChangeCss = (editor,data,newCode) => {
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
  handleChangeJavascript = (editor,data,newCode) => {
    this.setState({
      javascript: newCode
    });
    try {
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
    }
    catch(err) {

    }
  };
  render() {
    const {classes,project} = this.props;
    return (
      <div className={classes.container}>
        <Grid container className={classes.row}>
          <EditorPage
            mode="xml"
            options={options}
            fileTypes={['text/html']}
            code={this.state.html}
            handleChange={this.handleChangeHtml}
            type="html"
            projectId={project._id}
            ext="html"
          />
          <EditorPage
            mode="css"
            options={options}
            fileTypes={['text/css']}
            code={this.state.css}
            handleChange={this.handleChangeCss}
            type="css"
            projectId={project._id}
            ext="css"
          />
          <EditorPage
            mode="javascript"
            options={options}
            fileTypes={[
              'application/javascript',
              'application/x-javascript',
              'application/ecmascript'
            ]}
            code={this.state.javascript}
            handleChange={this.handleChangeJavascript}
            type="javascript"
            projectId={project._id}
            ext="js"
          />
          <Grid item md={6} sm={12} xs={12} className={classes.frameGrid}>
            <Paper className={classes.frameWrapper}>
              <iframe ref={this.frame} className={classes.frame} id="active-content"></iframe>
            </Paper>
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default withStyles(styles)(Editor);