import React, { FC } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Header, Title, Left, Button, Icon, Body, Right } from 'native-base'

const EditTaskHeader: FC = () => {
  const navigation = useNavigation()

  return (
    <Header testID="header">
      <Left>
        <Button transparent onPress={() => navigation.goBack()}>
          <Icon type="FontAwesome5" name="arrow-left" />
        </Button>
      </Left>
      <Body>
        <Title>Edit task</Title>
      </Body>
      <Right />
    </Header>
  )
}

export default EditTaskHeader
