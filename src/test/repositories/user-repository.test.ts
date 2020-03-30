import assert from 'power-assert'
import { AxiosError } from 'axios'
import MockAdapter from 'axios-mock-adapter'
import camelcaseKeys from 'camelcase-keys'
import snakecaseKeys from 'snakecase-keys'
import { OAUTH2_USERINFO_URL } from 'react-native-dotenv'
import UserRepository, { Repository } from '../../repositories/user-repository'

describe('user-repository', () => {
  describe('get', () => {
    test('success', async () => {
      const url = OAUTH2_USERINFO_URL
      const user = snakecaseKeys({
        id: 1,
        email: 'user1@example.com',
        createdAt: '2019-11-25T23:40:02.000+09:00',
        updatedAt: '2019-11-25T23:41:02.000+09:00'
      })
      const mockAdapter = new MockAdapter(Repository)
      mockAdapter.onGet(url).reply(200, user)
      await UserRepository.getMe()
        .then(response => {
          assert.strictEqual(response.status, 200)
          assert.deepStrictEqual(
            response.data,
            camelcaseKeys(user, { deep: true })
          )
        })
        .catch((_error: AxiosError) => {
          throw new Error('failed')
        })
    })

    test('error', async () => {
      const url = OAUTH2_USERINFO_URL
      const mockAdapter = new MockAdapter(Repository)
      mockAdapter.onGet(url).reply(500, '')
      await UserRepository.getMe()
        .then(_response => {
          throw new Error('failed')
        })
        .catch((error: AxiosError) => {
          if (error.response) {
            assert.strictEqual(error.response.status, 500)
          }
        })
    })
  })
})
