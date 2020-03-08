import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import DrawerContentComponent from '../components/organisms/DrawerContentComponent'
import SignInScreen from '../screens/SignInScreen'

const Drawer = createDrawerNavigator()

const AppNavigator: React.FC = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <DrawerContentComponent {...props} />}
    >
      <Drawer.Screen name="SignIn" component={SignInScreen} />
    </Drawer.Navigator>
  )
}

export default AppNavigator
