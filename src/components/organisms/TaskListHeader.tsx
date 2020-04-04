import React, { FC } from 'react'
import { useNavigation, DrawerActions } from '@react-navigation/native'
import { Header, Title, Left, Button, Icon, Body, Right } from 'native-base'

const TaskListHeader: FC = () => {
  const navigation = useNavigation()

  return (
    <Header testID="header">
      <Left>
        <Button
          transparent
          onPress={() => {
            navigation.dispatch(DrawerActions.openDrawer())
          }}
        >
          <Icon type="FontAwesome5" name="bars" />
        </Button>
      </Left>
      <Body>
        <Title>Task list</Title>
      </Body>
      <Right />
    </Header>
  )
}

export default TaskListHeader
