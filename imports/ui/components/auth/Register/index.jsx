import React, {Component} from 'react';
import {Link,Redirect} from 'react-router-dom';
import {
  Typography,
  Button,
  Card,
  CardContent,
  TextField,
  withStyles,
  LinearProgress
} from '@material-ui/core';
import {Accounts} from 'meteor/accounts-base';
import {withFormik,Form} from 'formik';
import {validateRegister} from '../../../helpers/validate';
import styles from '../Login/styles';

class Register extends Component {
  render() {
    const {classes, values, touched, errors, handleChange, handleBlur,status,handleSubmit,isSubmitting}  = this.props;
    if(status && status.success) {
      return <Redirect to="/dashboard"/>;
    }
    return (
      <div className={classes.container}>
        <Typography variant="display2" align="center">Sign Up</Typography>
        <Card className={classes.form}>
          <CardContent>
            <Form onSubmit={handleSubmit}>
              <TextField
                className={classes.formItem}
                id="name"
                label="Name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.name && touched.name}
                helperText={touched.name && errors.name}
                fullWidth
              />
              <TextField
                className={classes.formItem}
                id="email"
                label="Email"
                type="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.email && touched.email}
                helperText={touched.email && errors.email}
                fullWidth
              />
              <TextField
                className={classes.formItem}
                id="password"
                label="Password"
                type="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.password && touched.password}
                helperText={touched.password && errors.password}
                fullWidth
              />
              <TextField
                className={classes.formItem}
                id="confirmPassword"
                label="Confirm password"
                type="password"
                value={values.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.confirmPassword && touched.confirmPassword}
                helperText={touched.confirmPassword && errors.confirmPassword}
                fullWidth
              />
              {status && status.error &&
                <Typography
                  color="error"
                  variant="headline"
                  className={classes.formError}
                >
                  {status.error}
                </Typography>
              }
              <div className={classes.controls}>
                <Button type="submit" variant="contained" color="primary" fullWidth>Create account</Button>
                {isSubmitting && <LinearProgress/>}
              </div>
              <div className={classes.controls}>
                <Button variant="text" color="primary">Use Facebook</Button>
                <Button variant="text" color="primary">Use Github</Button>
              </div>
              <div className={classes.controls}>
                <Link to="/login" className={classes.loginBtn}>
                  <Button variant="outlined" fullWidth>
                    Login
                  </Button>
                </Link>
              </div>
            </Form>
          </CardContent>
        </Card>
      </div>
    )
  }
}

export default withFormik({
  mapPropsToValues: () => ({ name: '', email: '', password: '', confirmPassword: '' }),
  validate: validateRegister,
  handleSubmit: ({name,email,password},{setStatus}) => {
    Accounts.createUser({
      username: name,
      email,
      password
    }, (err) => {
      if (err) {
        setStatus({
          error: err.reason
        });
      }
      else {
        setStatus({
          success: true
        });
      }
    });
  }
})(withStyles(styles)(Register));
