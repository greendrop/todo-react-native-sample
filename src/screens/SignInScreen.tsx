import React, { Component, createRef } from 'react'
import { BackHandler, NativeEventSubscription } from 'react-native'
import { useNavigation, DrawerActions } from '@react-navigation/native'
import {
  Container,
  Header,
  Title,
  Left,
  Button,
  Icon,
  Body,
  Right,
  Content
} from 'native-base'
import { WebView, WebViewNavigation } from 'react-native-webview'
import AuthContainer from '../containers/auth-container'

type Props = {
  navigation: ReturnType<typeof useNavigation>
  authContainer: ReturnType<typeof AuthContainer.useContainer>
}

type State = {
  codeUri: string
  canGoBack: boolean
  canGoForward: boolean
  loading: boolean
  url: string
}

class SignInScreenContent extends Component<Props, State> {
  private webViewRef = createRef<WebView>()
  private backHandler: NativeEventSubscription

  constructor(props: Props) {
    super(props)

    this.state = {
      codeUri: this.props.authContainer.getAuthorizationUrl(),
      canGoBack: false,
      canGoForward: false,
      loading: false,
      url: ''
    }
  }

  componentDidMount() {
    this.backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackPress
    )
  }

  componentWillUnmount() {
    this.backHandler.remove()
  }

  handleBackPress = () => {
    if (this.webViewRef.current && this.state.canGoBack) {
      this.webViewRef.current.goBack()

      return true
    }

    return false
  }

  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => {
                this.props.navigation.dispatch(DrawerActions.openDrawer())
              }}
            >
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
            <Title>Sign in</Title>
          </Body>
          <Right />
        </Header>
        <Content contentContainerStyle={{ flex: 1 }}>
          <WebView
            ref={this.webViewRef}
            source={{ uri: this.state.codeUri }}
            style={{ flex: 1 }}
            onNavigationStateChange={this.onNavigationStateChange.bind(this)}
          />
        </Content>
      </Container>
    )
  }

  async onNavigationStateChange(event: WebViewNavigation) {
    const beforeUrl = this.state.url
    this.setState({
      canGoBack: event.canGoBack,
      canGoForward: event.canGoForward,
      loading: event.loading,
      url: event.url
    })
    if (
      beforeUrl !== event.url &&
      this.props.authContainer.isRedirectUrlWithCode(event.url)
    ) {
      const code = this.props.authContainer.getCodeFromUrl(event.url)
      await this.props.authContainer.getAccessTokenFromCode(code).then()
      if (this.props.authContainer.isValidToken()) {
        await this.props.authContainer.getUser()
      }
    }
  }
}

const SignInScreen: React.FC<Props> = () => {
  const navigation = useNavigation()
  navigation.dispatch
  const authContainer = AuthContainer.useContainer()

  return (
    <SignInScreenContent
      navigation={navigation}
      authContainer={authContainer}
    />
  )
}

export default SignInScreen
