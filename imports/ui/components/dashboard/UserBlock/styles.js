export default ({spacing}) => ({
  container: {
    display: 'flex',
    alignItems: 'center'
  },
  block: {
    textTransform: 'capitalize',
    display: 'flex',
    alignItems: 'center',
    marginLeft: spacing.unit * 3
  },
  avatar: {
    marginRight: spacing.unit
  },
  name: {
    color: '#fff'
  }
});