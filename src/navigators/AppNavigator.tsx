import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import DrawerComponent from '../components/organisms/DrawerComponent'
import SignInScreen from '../screens/SignInScreen'

const Drawer = createDrawerNavigator()

const AppNavigator: React.FC = () => {
  return (
    <Drawer.Navigator drawerContent={props => <DrawerComponent {...props} />}>
      <Drawer.Screen name="SignIn" component={SignInScreen} />
    </Drawer.Navigator>
  )
}

export default AppNavigator
