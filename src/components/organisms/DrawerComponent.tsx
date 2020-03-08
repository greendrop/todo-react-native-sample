import React, { Component } from 'react'
import {
  DrawerContentComponentProps,
  DrawerContentOptions
} from '@react-navigation/drawer'
import { Container, Text, List, ListItem } from 'native-base'

const routes = ['SignIn']

type Props = DrawerContentComponentProps<DrawerContentOptions>

class DrawerComponentContent extends Component<Props> {
  render() {
    return (
      <Container>
        <List
          dataArray={routes}
          keyExtractor={data => data}
          renderRow={data => {
            return (
              <ListItem
                button
                onPress={() => this.props.navigation.navigate(data)}
              >
                <Text>{data}</Text>
              </ListItem>
            )
          }}
        />
      </Container>
    )
  }
}

const DrawerComponent: React.FC<DrawerContentComponentProps<
  DrawerContentOptions
>> = props => {
  return <DrawerComponentContent {...props} />
}

export default DrawerComponent
