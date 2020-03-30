import assert from 'power-assert'
import { AxiosError } from 'axios'
import MockAdapter from 'axios-mock-adapter'
import camelcaseKeys from 'camelcase-keys'
import snakecaseKeys from 'snakecase-keys'
import { API_BASE_URL } from 'react-native-dotenv'
import TaskRepository, { Repository } from '../../repositories/task-repository'
import { ITaskForm } from '../../models/task'

describe('task-repository', () => {
  describe('getList', () => {
    test('success', async () => {
      const url = `${API_BASE_URL}/v1/tasks`
      const tasks = snakecaseKeys([
        {
          id: 1,
          title: 'title1',
          description: 'description1',
          done: false,
          createdAt: '2019-11-25T23:40:02.000+09:00',
          updatedAt: '2019-11-25T23:41:02.000+09:00'
        },
        {
          id: 2,
          title: 'title2',
          description: 'description2',
          done: true,
          createdAt: '2019-11-25T23:40:02.000+09:00',
          updatedAt: '2019-11-25T23:41:02.000+09:00'
        }
      ])
      const mockAdapter = new MockAdapter(Repository)
      mockAdapter.onGet(url).reply(200, tasks)
      await TaskRepository.getList({})
        .then(response => {
          assert.strictEqual(response.status, 200)
          assert.deepStrictEqual(
            response.data,
            camelcaseKeys(tasks, { deep: true })
          )
        })
        .catch((_error: AxiosError) => {
          throw new Error('failed')
        })
    })

    test('error', async () => {
      const url = `${API_BASE_URL}/v1/tasks`
      const mockAdapter = new MockAdapter(Repository)
      mockAdapter.onGet(url).reply(500, '')
      await TaskRepository.getList({})
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

  describe('get', () => {
    test('success', async () => {
      const url = `${API_BASE_URL}/v1/tasks/1`
      const task = snakecaseKeys({
        id: 1,
        title: 'title1',
        description: 'description1',
        done: false,
        createdAt: '2019-11-25T23:40:02.000+09:00',
        updatedAt: '2019-11-25T23:41:02.000+09:00'
      })
      const mockAdapter = new MockAdapter(Repository)
      mockAdapter.onGet(url).reply(200, task)
      await TaskRepository.get(1)
        .then(response => {
          assert.strictEqual(response.status, 200)
          assert.deepStrictEqual(
            response.data,
            camelcaseKeys(task, { deep: true })
          )
        })
        .catch((_error: AxiosError) => {
          throw new Error('failed')
        })
    })

    test('error', async () => {
      const url = `${API_BASE_URL}/v1/tasks/1`
      const mockAdapter = new MockAdapter(Repository)
      mockAdapter.onGet(url).reply(500, '')
      await TaskRepository.get(1)
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

  describe('create', () => {
    test('success', async () => {
      const url = `${API_BASE_URL}/v1/tasks`
      const taskForm: ITaskForm = {
        title: 'title1',
        description: 'description1',
        done: false
      }
      const task = snakecaseKeys({
        id: 1,
        title: 'title1',
        description: 'description1',
        done: false,
        createdAt: '2019-11-25T23:40:02.000+09:00',
        updatedAt: '2019-11-25T23:41:02.000+09:00'
      })
      const mockAdapter = new MockAdapter(Repository)
      mockAdapter.onPost(url).reply(201, task)
      await TaskRepository.create(taskForm)
        .then(response => {
          assert.strictEqual(response.status, 201)
          assert.deepStrictEqual(
            response.data,
            camelcaseKeys(task, { deep: true })
          )
        })
        .catch((_error: AxiosError) => {
          throw new Error('failed')
        })
    })

    test('error', async () => {
      const url = `${API_BASE_URL}/v1/tasks`
      const taskForm: ITaskForm = {
        title: 'title1',
        description: 'description1',
        done: false
      }
      const mockAdapter = new MockAdapter(Repository)
      mockAdapter.onPost(url).reply(500, '')
      await TaskRepository.create(taskForm)
        .then(_response => {
          throw new Error('failed')
        })
        .catch((error: AxiosError) => {
          if (error.response) {
            assert.deepStrictEqual(error.response.status, 500)
          }
        })
    })
  })

  describe('update', () => {
    test('success', async () => {
      const url = `${API_BASE_URL}/v1/tasks/1`
      const taskForm: ITaskForm = {
        title: 'title1',
        description: 'description1',
        done: false
      }
      const mockAdapter = new MockAdapter(Repository)
      mockAdapter.onPut(url).reply(204, '')
      await TaskRepository.update(1, taskForm)
        .then(response => {
          assert.strictEqual(response.status, 204)
        })
        .catch((_error: AxiosError) => {
          throw new Error('failed')
        })
    })

    test('error', async () => {
      const url = `${API_BASE_URL}/v1/tasks/1`
      const taskForm: ITaskForm = {
        title: 'title1',
        description: 'description1',
        done: false
      }
      const mockAdapter = new MockAdapter(Repository)
      mockAdapter.onPut(url).reply(500, '')
      await TaskRepository.update(1, taskForm)
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

  describe('delete', () => {
    test('success', async () => {
      const url = `${API_BASE_URL}/v1/tasks/1`
      const mockAdapter = new MockAdapter(Repository)
      mockAdapter.onDelete(url).reply(204, '')
      await TaskRepository.delete(1)
        .then(response => {
          assert.strictEqual(response.status, 204)
        })
        .catch((_error: AxiosError) => {
          throw new Error('failed')
        })
    })

    test('error', async () => {
      const url = `${API_BASE_URL}/v1/tasks/1`
      const mockAdapter = new MockAdapter(Repository)
      mockAdapter.onDelete(url).reply(500, '')
      await TaskRepository.delete(1)
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
