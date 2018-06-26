import React, {Component,Fragment} from 'react';
import {withFormik} from 'formik';
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
  },
  dialog: {
    width: 300
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
          <DialogTitle>New project</DialogTitle>
          <DialogContent>
            <TextField
              id="name"
              label="Name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.name && touched.name}
              helperText={touched.name && errors.name}
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
        </Dialog>
      </Fragment>
    )
  }
}

export default withFormik({
  mapPropsToValues: props => ({ name: ''}),
  validate: validateProject,
  handleSubmit: ({name}) => {

  }
})(withStyles(styles)(AddChannel));