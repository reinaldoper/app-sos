import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    color: '#fff',
    marginBottom: 40,
    fontWeight: 'bold',
  },
  animContainer: {
    alignSelf: 'center',
    marginVertical: 20,
  },
  button: {
    backgroundColor: '#e60000',
    padding: 40,
    borderRadius: 100,
    elevation: 10,
  },
  text: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
  },
  footer: {
    marginTop: 20,
    color: '#ccc',
    fontSize: 16,
  },
});

export default styles;