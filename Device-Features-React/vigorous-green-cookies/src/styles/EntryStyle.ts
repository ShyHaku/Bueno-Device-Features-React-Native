import { StyleSheet } from 'react-native';

const AddEntryStyle = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginVertical: 10,
    resizeMode: 'cover',
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  saveButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    width: '40%',
  },
  cancelButton: {
    backgroundColor: 'red',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    width: '40%',
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    marginTop: 10,
    fontSize: 14,
    textAlign: 'center',
  },
  textContainer: {
    marginTop: 20,
    padding: 10,
    borderRadius: 6,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
  text: {
    fontSize: 14,
  },
  loadingIndicator: {
    marginTop: 20,
  },
});

export default AddEntryStyle;