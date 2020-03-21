import React, { FC, useState, useEffect } from 'react'
import { AppLoading } from 'expo'
import * as Font from 'expo-font'
import { Ionicons } from '@expo/vector-icons'
import { NavigationContainer } from '@react-navigation/native'
import AppNavigator from './navigators/AppNavigator'
import AuthContainer from './containers/auth-container'
import storage from './lib/storage'
import { IOAuth2Token } from './models/oauth2-token'
import { IUser } from './models/user'

const AppContent: FC = () => {
  const [isLoadedFont, setIsLoadedFont] = useState<boolean>(false)
  const [isLoadedStorage, setIsLoadedStorage] = useState<boolean>(false)
  const [isFetchedToken, setIsFetchedToken] = useState<boolean>(false)
  const [isReady, setIsReady] = useState<boolean>(false)
  const authContainer = AuthContainer.useContainer()

  useEffect(() => {
    const f = async () => {
      await Font.loadAsync({
        Roboto: require('native-base/Fonts/Roboto.ttf'),
        // eslint-disable-next-line @typescript-eslint/camelcase
        Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
        ...Ionicons.font
      })
      setIsLoadedStorage(true)
    }
    f()
  }, [])

  useEffect(() => {
    const f = async () => {
      await storage
        .load({
          key: 'authContainer.token'
        })
        .then(ret => {
          const token: IOAuth2Token = {
            accessToken: ret.accessToken,
            refreshToken: ret.refreshToken,
            createdAt: ret.createdAt ? new Date(ret.createdAt) : null,
            expiresAt: ret.expiresAt ? new Date(ret.expiresAt) : null
          }
          authContainer.setToken(token)
        })
        .catch(_err => {}) // eslint-disable-line @typescript-eslint/no-empty-function

      await storage
        .load({
          key: 'authContainer.user'
        })
        .then(ret => {
          const user: IUser = {
            id: ret.id,
            email: ret.email,
            createdAt: ret.createdAt ? new Date(ret.createdAt) : null,
            updatedAt: ret.updatedAt ? new Date(ret.updatedAt) : null
          }
          authContainer.setUser(user)
        })
        .catch(_err => {}) // eslint-disable-line @typescript-eslint/no-empty-function

      setIsLoadedFont(true)
    }
    f()
  }, [])

  useEffect(() => {
    if (isLoadedStorage) {
      const f = async () => {
        if (authContainer.token.refreshToken !== '') {
          await authContainer.fetchTokenByRefreshToken(
            authContainer.token.refreshToken
          )
        }
        setIsFetchedToken(true)
      }
      f()
    }
  }, [isLoadedStorage])

  useEffect(() => {
    if (isLoadedFont && isLoadedStorage && isFetchedToken) {
      setIsReady(true)
    }
  }, [isLoadedFont, isLoadedStorage, isFetchedToken])

  useEffect(() => {
    if (isReady && authContainer.isNeedRefresh()) {
      const f = async () => {
        if (authContainer.token.refreshToken !== '') {
          await authContainer.fetchTokenByRefreshToken(
            authContainer.token.refreshToken
          )
        }
      }
      f()
    }
  }, [authContainer.isNeedRefresh()])

  useEffect(() => {
    if (isReady && authContainer.isUnauthorized) {
      authContainer.signOut()
    }
  }, [authContainer.isUnauthorized])

  useEffect(() => {
    if (isReady) {
      storage.save({
        key: 'authContainer.token',
        data: authContainer.token,
        expires: null
      })
    }
  }, [authContainer.token])

  useEffect(() => {
    if (isReady) {
      storage.save({
        key: 'authContainer.user',
        data: authContainer.user,
        expires: null
      })
    }
  }, [authContainer.user])

  return (
    <>
      {!isReady && <AppLoading />}
      {isReady && (
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      )}
    </>
  )
}

export default AppContent
