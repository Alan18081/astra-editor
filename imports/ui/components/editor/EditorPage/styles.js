export default ({spacing: {unit},breakpoints}) => ({
  column: {
    padding: `0 ${unit}px 0`,
    [breakpoints.down('sm')]: {
      marginBottom: unit * 2
    },
    position: 'relative'
  },
  editor: {
    fontSize: 18
  },
  loader: {
    position: 'absolute',
    bottom: unit,
    right: unit
  },
  settings: {
    position: 'absolute',
    top: 0,
    right: unit
  }
})