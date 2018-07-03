import React, {Component} from 'react';
import {Dialog,DialogTitle,DialogContent,TextField,DialogActions,Button} from '@material-ui/core';
import {withFormik,Form} from 'formik';
import {validateFilename} from '../../../helpers/validate';

class FilenameForm extends Component {
  submit = async event => {
    event.preventDefault();
    this.props.save(this.props.values.name);
    this.props.close();
  };
  render() {
    const {values,handleChange,handleBlur,errors,touched,close} = this.props;
    return (
      <Dialog
        open={this.props.open}
        onClose={close}
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
            <Button onClick={close} color="primary">
              Cancel
            </Button>
            <Button type="submit" color="primary" variant="contained">
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
  }),
  validate: validateFilename
})(FilenameForm);