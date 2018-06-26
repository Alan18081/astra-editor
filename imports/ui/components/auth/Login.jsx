import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {
  Typography,
  Button,
  Card,
  CardContent,
  TextField
} from '@material-ui/core';
// import {Accounts} from 'meteor/accounts-base';
import {Meteor} from 'meteor/meteor';
import jss from 'react-jss';
import {withFormik,Form} from 'formik';
import {validateLogin} from '../../helpers/validate';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh'
  },
  form: {
    maxWidth: 600,
    margin: '20px auto 0'
  },
  formItem: {
    margin: {
      bottom: 10
    }
  },
  controls: {
    marginTop: 10,
    display: 'flex',
    alignItems: 'flex-start'
  }
};

class Login extends Component {
  render() {
    const {classes, values, touched, errors, handleChange, handleBlur, handleSubmit } = this.props;
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
              <div className={classes.controls}>
                <Button type="submit" variant="contained" color="primary" fullWidth>Login</Button>
              </div>
              <div className={classes.controls}>
                <Button variant="text" color="primary">Use Facebook</Button>
                <Button variant="text" color="primary">Use Github</Button>
              </div>
              <div className={classes.controls}>
                <Link to="/register">
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
  handleSubmit: ({email,password}) => {
    Meteor.loginWithPassword({email},password, err => {
      console.log(err);
      console.log('Authorized')
    })
  }
})(jss(styles)(Login));
