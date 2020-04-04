import React from 'react'
import { cleanup, render, wait } from '@testing-library/react-native'
import EditTaskBody from '../../../components/organisms/EditTaskBody'
import TaskDetailContainer from '../../../containers/task-detail-container'
import TaskFormContainer from '../../../containers/task-form-container'

jest.mock('@react-navigation/native')
jest.mock('../../../containers/task-detail-container')
jest.mock('../../../containers/task-update-container')
jest.mock('../../../containers/task-form-container')
/* eslint-disable @typescript-eslint/no-explicit-any */
const mockedTaskDetailContainer: jest.Mocked<typeof TaskDetailContainer> = TaskDetailContainer as any
const mockedTaskFormContainer: jest.Mocked<typeof TaskFormContainer> = TaskFormContainer as any
/* eslint-enable @typescript-eslint/no-explicit-any */

afterEach(cleanup)

describe('TaskDetail', () => {
  describe('renders', () => {
    describe('when fetching task', () => {
      it('displays spinner', async () => {
        mockedTaskDetailContainer.useContainer.mockReset()
        mockedTaskDetailContainer.useContainer.mockReturnValue({
          ...mockedTaskDetailContainer.useContainer(),
          isFetching: true
        })

        const { queryByTestId } = render(<EditTaskBody />)
        await wait(() => expect(queryByTestId('spinner')).toBeTruthy())
      })
    })

    describe('when fetched task', () => {
      it('displays task form', async () => {
        mockedTaskDetailContainer.useContainer.mockReset()
        mockedTaskDetailContainer.useContainer.mockReturnValue({
          ...mockedTaskDetailContainer.useContainer(),
          isFetching: false
        })
        mockedTaskFormContainer.useContainer.mockReset()
        mockedTaskFormContainer.useContainer.mockReturnValue({
          ...mockedTaskFormContainer.useContainer(),
          taskForm: {
            title: 'Title',
            description: 'Description',
            done: true
          },
          errors: {
            base: '',
            title: '',
            description: '',
            done: ''
          },
          hasErrors: () => {
            return false
          }
        })

        const { queryByTestId } = render(<EditTaskBody />)
        await wait(() => expect(queryByTestId('taskForm')).toBeTruthy())
      })
    })
  })
})
