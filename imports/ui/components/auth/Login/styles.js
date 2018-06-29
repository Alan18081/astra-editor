export default theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh'
  },
  form: {
    width: 500,
    margin: `${theme.spacing.unit * 3}px auto 0`,
    '@media (max-width: 500px)': {
      width: '95%'
    }
  },
  formError: {
    marginBottom: theme.spacing.unit,
    textAlign: 'center'
  },
  formItem: {
    marginBottom: theme.spacing.unit * 2
  },
  controls: {
    marginTop: 10,
    display: 'flex',
    alignItems: 'flex-start'
  },
  btnIcon: {
    marginRight: theme.spacing.unit,
    fontSize: 20
  },
  loginBtn: {
    display: 'block',
    width: '100%'
  }
});