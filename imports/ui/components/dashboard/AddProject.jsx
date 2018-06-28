import React, {Component,Fragment} from 'react';
import {withFormik,Form} from 'formik';
import {Meteor} from 'meteor/meteor';
import {
  withStyles,
  Dialog,
  DialogActions,
  TextField,
  DialogContent,
  DialogTitle,
  Button
} from '@material-ui/core';
import {validateProject} from '../../helpers/validate';

import AddIcon from '@material-ui/icons/Add';

const styles = theme => ({
  btn: {
    position: 'fixed',
    bottom: 20,
    right: 20
  }
});

class AddChannel extends Component {
  state = {
    isOpen: false
  };
  handleClose = () => {
    this.setState({
      isOpen: false
    });
  };
  handleOpen = () => {
    this.setState({
      isOpen: true
    });
  };
  submit = async event => {
    event.preventDefault();
    try {
      await this.props.handleSubmit(event);
      this.setState({
        isOpen: false
      });
    }
    catch(err) {
      console.log(err);
    }
  };
  render() {
    const {classes,touched,errors,handleChange,handleBlur,values} = this.props;
    return (
      <Fragment>
        <Button
          variant="fab"
          color="secondary"
          aria-label="add"
          className={classes.btn}
          onClick={this.handleOpen}
        >
          <AddIcon/>
        </Button>
        <Dialog
          open={this.state.isOpen}
          onClose={this.handleClose}
          className={classes.dialog}
        >
          <Form onSubmit={this.submit}>
            <DialogTitle>New project</DialogTitle>
            <DialogContent>
              <TextField
                id="title"
                label="Title"
                value={values.title}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.title && touched.title}
                helperText={touched.title && errors.title}
                fullWidth
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose}>
                Close
              </Button>
              <Button variant="contained" type="submit" color="primary">
                Create
              </Button>
            </DialogActions>
          </Form>
        </Dialog>
      </Fragment>
    )
  }
}

export default withFormik({
  mapPropsToValues: props => ({ title: ''}),
  validate: validateProject,
  handleSubmit: ({title}) => {
    return new Promise((resolve,reject) => {
      Meteor.call('projects.create',title,err => {
        if(err) {
          reject(err);
        }
        else {
          resolve();
        }
      });
    });
  }
})(withStyles(styles)(AddChannel));