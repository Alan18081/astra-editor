import React, {Component} from 'react';
import {Link,Redirect} from 'react-router-dom';
import {
  Typography,
  Button,
  Card,
  CardContent,
  TextField,
  LinearProgress,
  withStyles
} from '@material-ui/core';
import {Meteor} from 'meteor/meteor';
import {withFormik,Form} from 'formik';
import {validateLogin} from '../../../helpers/validate';

import styles from './styles';

class Login extends Component {
  render() {
    const {classes, values, touched, errors, handleChange, handleBlur, handleSubmit, status,isSubmitting } = this.props;
    if(status && status.success) {
      return <Redirect to="/dashboard"/>;
    }
    return (
      <div className={classes.container}>
        <Typography variant="display2" align="center">Sign In</Typography>
        <Card className={classes.form}>
          <CardContent>
            <Form onSubmit={handleSubmit}>
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
              {status && status.error &&
                <Typography
                  color="error"
                  className={classes.formError}
                  variant="headline"
                >
                  {status.error}
                </Typography>
              }
              <div className={classes.controls}>
                <Button type="submit" variant="contained" color="primary" fullWidth>Login</Button>
                {isSubmitting && <LinearProgress/>}
              </div>
              <div className={classes.controls}>
                <Button variant="text" color="primary">Use Facebook</Button>
                <Button variant="text" color="primary">Use Github</Button>
              </div>
              <div className={classes.controls}>
                <Link to="/register" className={classes.createBtn}>
                  <Button variant="outlined" fullWidth>
                    Create account
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
  mapPropsToValues: () => ({ email: '', password: '' }),
  validate: validateLogin,
  handleSubmit: ({email,password},{setStatus}) => {
    Meteor.loginWithPassword({email},password, err => {
      if(err) {
        console.log(err);
        setStatus({
          error: err.reason
        });
      }
      else {
        setStatus({
          success: true
        })
      }
    })
  }
})(withStyles(styles)(Login));
