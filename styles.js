import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 40,
  },
  inputContainer: {
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 50,
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#BDBDBD',
    borderRadius: 10,
    marginVertical: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#121212',
    borderRadius: 10,
    height: 50,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: '#F5F5F5',
    fontSize: 18,
    fontWeight: 'bold',
  },
  signupButton: {
    borderColor: '#30475E',
    borderWidth: 1,
    borderRadius: 10,
    height: 50,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  signupButtonText: {
    color: '#121212',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
