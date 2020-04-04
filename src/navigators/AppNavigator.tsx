import React, { FC } from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import DrawerContent from '../components/organisms/DrawerContent'
import TaskstNavigator from './TasksNavigator'
import SignInScreen from '../screens/SignInScreen'

const Drawer = createDrawerNavigator()

const AppNavigator: FC = () => {
  return (
    <Drawer.Navigator
      backBehavior="none"
      drawerContent={props => <DrawerContent {...props} />}
    >
      <Drawer.Screen name="Tasks" component={TaskstNavigator} />
      <Drawer.Screen name="SignIn" component={SignInScreen} />
    </Drawer.Navigator>
  )
}

export default AppNavigator
