import React, { FC } from 'react'
import { DrawerActions } from '@react-navigation/native'
import {
  DrawerContentComponentProps,
  DrawerContentOptions
} from '@react-navigation/drawer'
import { Container, Text, List, ListItem } from 'native-base'
import AuthContainer from '../../containers/auth-container'

const menus = [{ name: 'Tasks', title: 'Tasks' }]

type Props = DrawerContentComponentProps<DrawerContentOptions>

const DrawerComponent: FC<Props> = props => {
  const authContainer = AuthContainer.useContainer()

  return (
    <Container>
      <List>
        {menus.map(menu => {
          return (
            <ListItem
              key={menu.name}
              button
              onPress={() =>
                props.navigation.dispatch(DrawerActions.jumpTo(menu.name))
              }
            >
              <Text>{menu.title}</Text>
            </ListItem>
          )
        })}
        {!authContainer.isSignedIn() && (
          <ListItem
            key="SignIn"
            button
            onPress={() =>
              props.navigation.dispatch(DrawerActions.jumpTo('SignIn'))
            }
          >
            <Text>Sign in</Text>
          </ListItem>
        )}
        {authContainer.isSignedIn() && (
          <ListItem
            key="SignOut"
            button
            onPress={() => {
              authContainer.signOut()
              props.navigation.dispatch(DrawerActions.jumpTo('SignIn'))
            }}
          >
            <Text>Sign out</Text>
          </ListItem>
        )}
      </List>
    </Container>
  )
}

export default DrawerComponent
