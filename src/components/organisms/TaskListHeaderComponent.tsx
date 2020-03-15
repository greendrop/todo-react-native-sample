import React, { FC } from 'react'
import { useNavigation, DrawerActions } from '@react-navigation/native'
import { Header, Title, Left, Button, Icon, Body, Right } from 'native-base'

const TaskListHeaderComponent: FC = () => {
  const navigation = useNavigation()

  return (
    <Header>
      <Left>
        <Button
          transparent
          onPress={() => {
            navigation.dispatch(DrawerActions.openDrawer())
          }}
        >
          <Icon name="menu" />
        </Button>
      </Left>
      <Body>
        <Title>Task list</Title>
      </Body>
      <Right />
    </Header>
  )
}

export default TaskListHeaderComponent
