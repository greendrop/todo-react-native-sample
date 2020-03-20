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
  const [isUnauthorized, setIsUnauthorized] = useState<boolean>(false)
  const [isError, setIsError] = useState<boolean>(false)
  const [errorStatus, setErrorStatus] = useState<number | null>(null)
  const [errorData, setErrorData] = useState<string | null>(null)
  const [isRefreshFetching, setIsRefreshFetching] = useState<boolean>(false)

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
            if (error.response.status === 401) {
              setIsUnauthorized(true)
            }
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

  const fetchTokenByRefreshToken = async (refreshToken: string) => {
    if (isRefreshFetching) {
      return
    }
    setIsRefreshFetching(true)
    setIsError(false)
    setErrorStatus(null)
    setErrorData(null)
    await OAuth2Client.getAccessTokenByRefreshToken(refreshToken)
      .then(async response => {
        const data = response.data
        const fetchedToken = {
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
          createdAt: new Date(data.createdAt * 1000),
          expiresAt: new Date((data.createdAt + data.expiresIn) * 1000)
        }
        setToken(fetchedToken)
      })
      .catch((error: AxiosError) => {
        setIsError(true)
        setErrorStatus(error.response.status)
        setErrorData(error.response.data)
        if (error.response.status === 401) {
          setIsUnauthorized(true)
        }
      })
      .finally(() => {
        setIsRefreshFetching(false)
      })
  }

  const fetchUser = async () => {
    setIsFetching(true)
    setIsUnauthorized(false)
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
        if (error.response.status === 401) {
          setIsUnauthorized(true)
        }
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
    setIsUnauthorized(false)
  }

  const isNeedRefresh = () => {
    if (!token.expiresAt) {
      return false
    }

    const date = new Date(token.expiresAt.getTime())
    date.setHours(date.getHours() - 1)

    return date <= new Date() ? true : false
  }

  return {
    token,
    setToken,
    user,
    setUser,
    isFetching,
    setIsFetching,
    isUnauthorized,
    setIsUnauthorized,
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
    fetchTokenByRefreshToken,
    fetchUser,
    clearUser,
    isSignedIn,
    signOut,
    isNeedRefresh
  }
}

const AuthContainer = createContainer(useAuth)

export default AuthContainer
