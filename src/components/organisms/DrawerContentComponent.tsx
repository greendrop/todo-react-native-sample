import React from 'react'
import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState
} from 'react-navigation'
import { Container, Content, Text, List, ListItem } from 'native-base'

const routes = ['SignIn']

interface IProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>
}

class DrawerContentComponent extends React.Component<IProps> {
  render() {
    return (
      <Container>
        <Content>
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
        </Content>
      </Container>
    )
  }
}

export default DrawerContentComponent
