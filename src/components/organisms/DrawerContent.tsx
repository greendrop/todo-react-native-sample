import React, { FC } from 'react'
import { DrawerActions } from '@react-navigation/native'
import {
  DrawerContentComponentProps,
  DrawerContentOptions
} from '@react-navigation/drawer'
import { Container, Content, Text, List, ListItem } from 'native-base'
import AuthContainer from '../../containers/auth-container'

const menus = [{ name: 'Tasks', title: 'Tasks' }]

type Props = DrawerContentComponentProps<DrawerContentOptions>

const DrawerContent: FC<Props> = props => {
  const authContainer = AuthContainer.useContainer()

  return (
    <Container>
      <Content contentContainerStyle={{ flex: 1 }}>
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
              testID="signIn"
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
              testID="signOut"
            >
              <Text>Sign out</Text>
            </ListItem>
          )}
        </List>
      </Content>
    </Container>
  )
}

export default DrawerContent
