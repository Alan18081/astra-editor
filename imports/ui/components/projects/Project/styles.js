export default ({spacing}) => ({
  container: {
    marginBottom: spacing.unit * 3
  },
  head: {
    marginBottom: spacing.unit * 2,
    display: 'flex',
    alignItems: 'center'
  },
  caption: {
    flexGrow: 1
  }
});