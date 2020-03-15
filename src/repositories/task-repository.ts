import { AxiosResponse } from 'axios'
import { API_BASE_URL } from 'react-native-dotenv'
import Repository from './repository'
import { IApiTask } from '../models/task'

const baseUrl = `${API_BASE_URL}/v1/tasks`

const repository = Repository

export { repository as Repository }

export default {
  setHeaderAuthorization(value) {
    repository.defaults.headers.Authorization = value
  },

  getList(params: unknown): Promise<AxiosResponse<Array<IApiTask>>> {
    const url = baseUrl

    return repository.get(url, { params })
  },

  get(id: number): Promise<AxiosResponse<IApiTask>> {
    const url = `${baseUrl}/${id}`

    return repository.get(url)
  }
}
