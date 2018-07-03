export default ({spacing: {unit}}) => ({
  row: {
    marginLeft: unit * -1,
    marginRight: unit * -1
  },
  frame: {
    width: '100%',
    height: 300,
    border: 'none',
    resize: 'vertical',
    cursor: 'row-resize',
  },
  frameWrapper: {
    marginBottom: unit * 2,
  },
  frameGrid: {
    padding: `0 ${unit}px 0`
  }
});