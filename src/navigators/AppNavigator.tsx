import React from 'react'
import { createAppContainer } from 'react-navigation'
import { createDrawerNavigator } from 'react-navigation-drawer'
import DrawerContentComponent from '../components/organisms/DrawerContentComponent'
import SignInNavigator from './SignInNavigator'

const AppNavigator = createDrawerNavigator(
  {
    SignIn: { screen: SignInNavigator }
  },
  {
    contentComponent: props => <DrawerContentComponent {...props} />
  }
)

export default createAppContainer(AppNavigator)
