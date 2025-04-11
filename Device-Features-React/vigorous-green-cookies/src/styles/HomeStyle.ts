import { StyleSheet } from 'react-native';

const HomeStyle = StyleSheet.create({
  postContainer: {
    borderRadius: 10,
    marginBottom: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 400,
    borderRadius: 10,
  },
  addressOverlay: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    color: '#fff',
    padding: 5,
    borderRadius: 5,
    textAlign: 'center',
    marginHorizontal: 10,
  },
  removeButton: {
    padding: 10,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 2,
  },
  themeToggle: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 3,
    backgroundColor: 'transparent',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonContainer: {
    position: 'absolute',
    bottom: 10,
    left: 20,
    right: 20,
    alignItems: 'center',
    zIndex: 3,
  },
  addButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    elevation: 0,
    shadowOpacity: 0,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  flatListContainer: {
    paddingTop: 80,
    paddingBottom: 100,
    paddingHorizontal: 16,
  },
});

export default HomeStyle;
