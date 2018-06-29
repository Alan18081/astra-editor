export default ({breakpoints}) => ({
  container: {
    display: 'flex',
    [breakpoints.down('xs')] : {
      flexDirection: 'column',
      alignItems: 'center'
    }
  },
});