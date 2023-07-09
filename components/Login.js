import React, {useState} from 'react'
import { View, TextInput, Button, StyleSheet, Alert, FlatList, StatusBar } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import { toggleAuthentication } from '../redux/reducers/authentication'

function Login() {
    const dispatch = useDispatch();
    const isLogged = useSelector(state => {
        console.log(state);
        return state.isAuthenticatedValue
    })
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleLogin = () => {
        // Perform login logic here, such as validating credentials
    
        if (email === 'user@example.com' && password === 'password') {
            dispatch(toggleAuthentication());
          Alert.alert('Login Successful');
        } else {
          Alert.alert('Invalid credentials');
        }
      };
  return (
    <View>
      <View style={styles.header}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Button title="Login" onPress={handleLogin} />
      </View>
      {/* Other components go here */}
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#212040',
      alignItems: 'center',
      justifyContent: 'center',
    },
    header: {
      height: 150,
    },
    input: {
      width: '100%',
      height: 40,
      marginBottom: 12,
      paddingHorizontal: 8,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 4,
    },
  });

export default Login