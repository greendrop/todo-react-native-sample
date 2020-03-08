import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { Container, Content, Text, List, ListItem } from 'native-base'

const routes = ['SignIn']

const DrawerContentComponent = ({
  navigation
}: {
  navigation: ReturnType<typeof useNavigation>
}) => {
  return (
    <Container>
      <List
        dataArray={routes}
        keyExtractor={data => data}
        renderRow={data => {
          return (
            <ListItem button onPress={() => navigation.navigate(data)}>
              <Text>{data}</Text>
            </ListItem>
          )
        }}
      />
    </Container>
  )
}

export default DrawerContentComponent
