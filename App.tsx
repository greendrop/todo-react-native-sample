import React from 'react'
import { AppLoading } from 'expo'
import * as Font from 'expo-font'
import { Ionicons } from '@expo/vector-icons'
import { NavigationContainer } from '@react-navigation/native'
import AppNavigator from './src/navigators/AppNavigator'
import AuthContainer from './src/containers/auth-container'

interface IProps {}

interface IState {
  isReady: boolean
}

class App extends React.Component<IProps, IState> {
  constructor(props) {
    super(props)
    this.state = {
      isReady: false
    }
  }

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font
    })
    this.setState({ isReady: true })
  }

  render() {
    if (!this.state.isReady) {
      return <AppLoading />
    }

    return (
      <AuthContainer.Provider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </AuthContainer.Provider>
    )
  }
}

export default App
