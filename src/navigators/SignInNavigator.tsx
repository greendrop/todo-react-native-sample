import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import SignInScreen from '../screens/SignInScreen'

const SignInNavigator = createStackNavigator(
  {
    SignIn: { screen: SignInScreen }
  },
  {
    headerMode: 'none'
  }
)

export default createAppContainer(SignInNavigator)
