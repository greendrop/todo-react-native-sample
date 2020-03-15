import {
  OAUTH2_CLIENT_ID,
  OAUTH2_CLIENT_SECRET,
  OAUTH2_ACCESS_TOKEN_URL,
  OAUTH2_AUTHORIZATION_URL,
  OAUTH2_REDIRECT_URL
} from 'react-native-dotenv'
import camelcaseKeys from 'camelcase-keys'
import snakecaseKeys from 'snakecase-keys'
import qs from 'qs'
import Url from 'url'
import axios, {
  AxiosRequestConfig,
  AxiosTransformer,
  AxiosResponse
} from 'axios'
import { IApiOAuth2Token } from '../models/oauth2-token'

const snakeParams = (config: AxiosRequestConfig): AxiosRequestConfig => {
  if (config.params) {
    config.params = snakecaseKeys(config.params)
  }

  return config
}

const convertResponse = (data: unknown, headers?: unknown): unknown => {
  if (headers) {
    Object.assign(headers, camelcaseKeys(headers, { deep: true }))
  }

  return data ? camelcaseKeys(data, { deep: true }) : data
}

const convertRequest = (data: unknown, _headers?: unknown): unknown => {
  return data ? snakecaseKeys(data) : data
}

const paramsSerializer = (params: unknown) => {
  return qs.stringify(params, { arrayFormat: 'brackets' })
}

const defaultTransformRequest = (): AxiosTransformer[] => {
  const { transformRequest } = axios.defaults
  if (!transformRequest) {
    return []
  } else if (Array.isArray(transformRequest)) {
    return transformRequest
  } else {
    return [transformRequest]
  }
}

const defaultTransformResponse = (): AxiosTransformer[] => {
  const { transformResponse } = axios.defaults
  if (!transformResponse) {
    return []
  } else if (Array.isArray(transformResponse)) {
    return transformResponse
  } else {
    return [transformResponse]
  }
}

const axiosInstance = axios.create({
  paramsSerializer,
  transformRequest: [convertRequest, ...defaultTransformRequest()],
  transformResponse: [...defaultTransformResponse(), convertResponse]
})
axiosInstance.interceptors.request.use(snakeParams)

export default {
  getAuthorizationUrl: (): string => {
    const params = {
      protocol: 'oauth2',
      responseType: 'code',
      clientId: OAUTH2_CLIENT_ID,
      redirectUri: OAUTH2_REDIRECT_URL,
      scope: []
    }
    qs.stringify(params, { arrayFormat: 'brackets' })
    const url = `${OAUTH2_AUTHORIZATION_URL}?${qs.stringify(
      snakecaseKeys(params),
      { arrayFormat: 'brackets' }
    )}`

    return url
  },

  isRedirectUrlWithCode: (url: string): boolean => {
    const parse = Url.parse(url, true)
    if (url.indexOf(OAUTH2_REDIRECT_URL) === 0 && parse.query.code) {
      return true
    }

    return false
  },

  getCodeFromUrl: (url: string): string => {
    const parse = Url.parse(url, true)

    return parse.query.code
  },

  getAccessTokenByCode: (
    code: string
  ): Promise<AxiosResponse<IApiOAuth2Token>> => {
    const params = {
      grantType: 'authorization_code',
      code: code,
      clientId: OAUTH2_CLIENT_ID,
      clientSecret: OAUTH2_CLIENT_SECRET,
      redirectUri: OAUTH2_REDIRECT_URL
    }

    return axiosInstance.post(OAUTH2_ACCESS_TOKEN_URL, params)
  }
}
