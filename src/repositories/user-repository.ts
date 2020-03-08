import { AxiosResponse } from 'axios'
import { OAUTH2_USERINFO_URL } from 'react-native-dotenv'
import Repository from './repository'
import { IUser } from '../models/user'

const repository = Repository

export { repository as Repository }

export default {
  getMe: (): Promise<AxiosResponse<IUser>> =>
    repository.get(OAUTH2_USERINFO_URL),

  setHeaderAuthorization(value) {
    repository.defaults.headers.Authorization = value
  }
}
