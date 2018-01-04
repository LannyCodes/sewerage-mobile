export const SwitchTypes = (theme) => {
  return ({
    _base: {
      container: {
        width: 52,
        height: 32,
        overflow: 'hidden',
        justifyContent: 'center',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#666',
        onColor: '#666',
        offColor: {
          android: 'red',
          ios: 'green'
        }
      },
      thumb: {
        position: 'absolute',
        height: 32,
        width: 32,
        borderWidth: 1,
        borderColor: 'black',
        backgroundColor:'black',
        borderRadius: 16,
      }
    },
    selected: {
      thumb: {
        borderColor: '#666',
      },
      container: {
        borderColor: '#666',
      }
    }
  })
};