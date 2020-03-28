import React, { FC, useState, useEffect, useRef } from 'react'
import {
  BackHandler,
  NativeEventSubscription,
  NativeModules
} from 'react-native'
import {
  useNavigation,
  useIsFocused,
  DrawerActions
} from '@react-navigation/native'
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
import { WebView } from 'react-native-webview'
import AuthContainer from '../containers/auth-container'

let backHandler: NativeEventSubscription | null = null

const SignInScreen: FC = () => {
  const navigation = useNavigation()
  const authContainer = AuthContainer.useContainer()
  const [initialUrl, setInitialUrl] = useState<string>('')
  const [url, setUrl] = useState<string>('')
  const [canGoBack, setCanGoBack] = useState<boolean>(false)
  const webViewRef = useRef<WebView>(null)
  const isFocused = useIsFocused()

  useEffect(() => {
    if (isFocused) {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      NativeModules.Networking.clearCookies(() => {})
      setInitialUrl(`${authContainer.getAuthorizationUrl()}&t=${Date.now()}`)
      if (backHandler) {
        backHandler.remove()
        backHandler = null
      }
      backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
        if (webViewRef.current && canGoBack) {
          webViewRef.current.goBack()

          return true
        }

        return false
      })
    } else {
      if (backHandler) {
        backHandler.remove()
        backHandler = null
      }
    }
  }, [isFocused, canGoBack])

  useEffect(() => {
    if (authContainer.isRedirectUrlWithCode(url)) {
      const code = authContainer.getCodeFromUrl(url)
      authContainer.fetchTokenAndUserByCode(code)
    }
  }, [url])

  useEffect(() => {
    if (authContainer.isSignedIn()) {
      navigation.dispatch(DrawerActions.jumpTo('Tasks'))
    }
  }, [authContainer.isSignedIn()])

  return (
    <Container>
      <Header>
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
          <Title>Sign in</Title>
        </Body>
        <Right />
      </Header>
      <Content contentContainerStyle={{ flex: 1 }}>
        <WebView
          ref={webViewRef}
          source={{ uri: initialUrl }}
          style={{ flex: 1 }}
          onNavigationStateChange={async event => {
            setCanGoBack(event.canGoBack)
            setUrl(event.url)
          }}
        />
      </Content>
    </Container>
  )
}

export default SignInScreen
