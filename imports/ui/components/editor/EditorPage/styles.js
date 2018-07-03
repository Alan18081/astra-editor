export default ({spacing: {unit},breakpoints}) => ({
  column: {
    padding: `0 ${unit}px 0`,
    marginBottom: unit * 2,
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
    right: unit,
    zIndex: 10
  }
})