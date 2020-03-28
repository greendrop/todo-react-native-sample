import React, { FC } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Header, Title, Left, Button, Icon, Body, Right } from 'native-base'

const NewTaskHeaderComponent: FC = () => {
  const navigation = useNavigation()

  return (
    <Header>
      <Left>
        <Button transparent onPress={() => navigation.goBack()}>
          <Icon type="FontAwesome5" name="arrow-left" />
        </Button>
      </Left>
      <Body>
        <Title>New task</Title>
      </Body>
      <Right />
    </Header>
  )
}

export default NewTaskHeaderComponent
