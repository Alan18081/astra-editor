import React, {Component} from 'react';
import {Dialog,DialogTitle,DialogContent,TextField,DialogActions} from '@material-ui/core';
import {withFormik,Form} from 'formik';

class FilenameForm extends Component {
  submit = async event => {
    event.preventDefault();
    this.props.save(this.props.values.name);
  };
  render() {
    const {values,handleChange,handleBlur,errors,touched} = this.props;
    return (
      <Dialog
        open={this.props.open}
        onClose={this.handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">File name</DialogTitle>
        <Form onSubmit={this.submit}>
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
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleClose} color="primary" variant="contained">
              Save
            </Button>
          </DialogActions>
        </Form>
      </Dialog>
    );
  }
}

export default withFormik({
  mapPropsToValues: () => ({
    name: ''
  })
})(FilenameForm);