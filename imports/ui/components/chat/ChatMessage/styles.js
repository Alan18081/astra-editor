export default ({spacing: {unit}}) => ({
  message: {
    alignItems: 'flex-start',
    width: 'auto'
  },
  mine: {
    alignSelf: 'flex-end'
  },
  strange: {
    alignSelf: 'flex-start'
  },
  content: {
    padding: unit
  },
  avatar: {
    marginRight: unit
  },
  avatarLast: {
    order: 1,
    marginRight: 0,
    marginLeft: unit
  }
});