import React, { FC } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Header, Title, Left, Button, Icon, Body, Right } from 'native-base'

const TaskDetailHeaderComponent: FC = () => {
  const navigation = useNavigation()

  return (
    <Header>
      <Left>
        <Button transparent onPress={() => navigation.goBack()}>
          <Icon name="arrow-round-back" />
        </Button>
      </Left>
      <Body>
        <Title>Task Detail</Title>
      </Body>
      <Right />
    </Header>
  )
}

export default TaskDetailHeaderComponent
