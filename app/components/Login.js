import React, {Component} from 'react';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TextInput,
  Button,
  Alert,
  Image,
} from 'react-native';

/*
  var UserSchema = Schema({
  name: String,
  email: String,
  username: String,
  password: String
});
*/

class Login extends Component {
  state = {
    user: {
      username: undefined,
      password: undefined,
    },
    host: "niffler-rest-api.herokuapp.com",
  };

  login = () => {
    let {user, host} = this.state;

    if (!user.username && !user.password) {
      return Alert.alert('Error', 'fill the blanks');
    }

    user.gethash = true

    fetch(`http://${host}/api/login`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(user),
    })
      .then(res =>res.json())
      .then(json => {
        let {token, message} = json;
        if(message)throw message
        Alert.alert('Success', `you are in`, [{
            text: 'Okay',
            onPress: () => this.props.navigation.navigate('Profile',{token})
          }]);
      })
      .catch(err => {
        Alert.alert('Error', `Username/Password mismatch: ${err}`, [{text: 'Okay'}]);
      });
  };
  

  render() {
    return (
      <View style={styles.screen}>
        <Image
          style={styles.img}
          source={require('./../assets/pictures/niffler_login2.jpg')}
        />
        <Text style={styles.title}>Login</Text>

        <TextInput
          style={styles.input}
          placeholder="username"
          onChangeText={text =>
            this.setState({user: {...this.state.user, username: text}})
          }
          value={this.state.user.username}
        />
        <TextInput
          style={styles.input}
          placeholder="password"
          secureTextEntry={true}
          onChangeText={text =>
            this.setState({user: {...this.state.user, password: text}})
          }
          value={this.state.user.password}
        />
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button
              title="back"
              color="red"
              onPress={() => this.props.navigation.navigate('Welcome')}
            />
          </View>
          <View style={styles.button}>
            <Button
              title="Login"
              color="#DFBD54"
              onPress={() => this.login()}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: 400,
    height: 300,
  },
  title: {
    fontSize: 30,
    fontFamily: 'Shojumaru-Regular',
  },
  input: {
    marginTop: 10,
    height: 40,
    width: 250,
    backgroundColor: '#AFAFAF',
    paddingHorizontal: 10,
  },
  buttonContainer: {
    width: 300,
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    width: 100,
    justifyContent: 'space-between',
  },
});

export default Login;
