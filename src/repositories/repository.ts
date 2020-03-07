import axios, {
  AxiosRequestConfig,
  AxiosInstance,
  AxiosTransformer
} from 'axios'
import camelcaseKeys from 'camelcase-keys'
import snakecaseKeys from 'snakecase-keys'
import qs from 'qs'
import { API_BASE_URL } from 'react-native-dotenv'

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

const createRepository = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: API_BASE_URL,
    paramsSerializer,
    transformRequest: [convertRequest, ...defaultTransformRequest()],
    transformResponse: [...defaultTransformResponse(), convertResponse]
  })
  instance.interceptors.request.use(snakeParams)

  return instance
}

export default createRepository()
