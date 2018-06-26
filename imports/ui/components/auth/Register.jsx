import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {
  Typography,
  Button,
  Card,
  CardContent,
  TextField
} from '@material-ui/core';
import {Accounts} from 'meteor/accounts-base';
import jss from 'react-jss';
import {withFormik,Form} from 'formik';
import {validateRegister} from '../../helpers/validate';

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

class Register extends Component {
  render() {
    const {classes, values, touched, errors, handleChange, handleBlur,handleSubmit } = this.props;
    console.log(values,errors);
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
              <div className={classes.controls}>
                <Button type="submit" variant="contained" color="primary" fullWidth>Create account</Button>
              </div>
              <div className={classes.controls}>
                <Button variant="text" color="primary">Use Facebook</Button>
                <Button variant="text" color="primary">Use Github</Button>
              </div>
              <div className={classes.controls}>
                <Link to="/login">
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
  handleSubmit: ({name,email,password}) => {
    Accounts.createUser({username: name, email,password}, err => {
      console.log(err);
      console.log('User created');
    });
  }
})(jss(styles)(Register));
