import { useState } from 'react'
import { createContainer } from 'unstated-next'
import { AxiosError } from 'axios'
import { IOAuth2Token } from '../models/oauth2-token'
import { IUser } from '../models/user'
import OAuth2Client from '../lib/oauth2-client'
import UserRepository from '../repositories/user-repository'

const initialToken: IOAuth2Token = {
  accessToken: '',
  refreshToken: '',
  createdAt: null,
  expiresAt: null
}

const initialUser: IUser = {
  id: 0,
  email: '',
  createdAt: null,
  updatedAt: null
}

const useAuth = () => {
  const [token, setToken] = useState<IOAuth2Token>(initialToken)
  const [user, setUser] = useState<IUser>(initialUser)
  const [isFetching, setIsFetching] = useState<boolean>(false)
  const [isError, setIsError] = useState<boolean>(false)
  const [errorStatus, setErrorStatus] = useState<number | null>(null)
  const [errorData, setErrorData] = useState<string | null>(null)

  const getAuthorizationUrl = (): string => {
    return OAuth2Client.getAuthorizationUrl()
  }

  const isRedirectUrlWithCode = (url: string): boolean => {
    return OAuth2Client.isRedirectUrlWithCode(url)
  }

  const getCodeFromUrl = (url: string): string => {
    return OAuth2Client.getCodeFromUrl(url)
  }

  const clearToken = () => {
    setToken(initialToken)
  }

  const fetchTokenAndUserByCode = async (code: string) => {
    setIsFetching(true)
    setIsError(false)
    setErrorStatus(null)
    setErrorData(null)
    await OAuth2Client.getAccessTokenByCode(code)
      .then(async response => {
        const data = response.data
        const fetchedToken = {
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
          createdAt: new Date(data.createdAt * 1000),
          expiresAt: new Date((data.createdAt + data.expiresIn) * 1000)
        }
        UserRepository.setHeaderAuthorization(
          `Bearer ${fetchedToken.accessToken}`
        )
        await UserRepository.getMe()
          .then(response => {
            const data = response.data
            setToken(fetchedToken)
            setUser({
              id: data.id,
              email: data.email,
              createdAt: new Date(data.createdAt),
              updatedAt: new Date(data.updatedAt)
            })
          })
          .catch((error: AxiosError) => {
            setIsError(true)
            setErrorStatus(error.response.status)
            setErrorData(error.response.data)
          })
      })
      .catch((error: AxiosError) => {
        setIsError(true)
        setErrorStatus(error.response.status)
        setErrorData(error.response.data)
      })
      .finally(() => {
        setIsFetching(false)
      })
  }

  const isValidToken = (): boolean => {
    return (
      token.accessToken !== '' &&
      token.expiresAt !== null &&
      token.expiresAt >= new Date()
    )
  }

  const fetchUser = async () => {
    setIsFetching(true)
    setIsError(false)
    setErrorStatus(null)
    setErrorData(null)
    UserRepository.setHeaderAuthorization(`Bearer ${token.accessToken}`)
    await UserRepository.getMe()
      .then(response => {
        const data = response.data
        setUser({
          id: data.id,
          email: data.email,
          createdAt: new Date(data.createdAt),
          updatedAt: new Date(data.updatedAt)
        })
      })
      .catch((error: AxiosError) => {
        setIsError(true)
        setErrorStatus(error.response.status)
        setErrorData(error.response.data)
      })
      .finally(() => {
        setIsFetching(false)
      })
  }

  const clearUser = () => {
    setUser(initialUser)
  }

  const isSignedIn = () => {
    return isValidToken() && user.id !== 0
  }

  const signOut = () => {
    clearToken()
    clearUser()
  }

  return {
    token,
    setToken,
    user,
    setUser,
    isFetching,
    setIsFetching,
    isError,
    setIsError,
    errorStatus,
    setErrorStatus,
    errorData,
    setErrorData,
    getAuthorizationUrl,
    isRedirectUrlWithCode,
    getCodeFromUrl,
    clearToken,
    fetchTokenAndUserByCode,
    isValidToken,
    fetchUser,
    clearUser,
    isSignedIn,
    signOut
  }
}

const AuthContainer = createContainer(useAuth)

export default AuthContainer
