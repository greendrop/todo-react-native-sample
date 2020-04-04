import React from 'react'
import { cleanup, render, wait } from '@testing-library/react-native'
import TaskDetailBody from '../../../components/organisms/TaskDetailBody'
import TaskDetailContainer from '../../../containers/task-detail-container'

jest.mock('@react-navigation/native')
jest.mock('../../../containers/task-detail-container')
jest.mock('../../../containers/task-delete-container')
/* eslint-disable @typescript-eslint/no-explicit-any */
const mockedTaskDetailContainer: jest.Mocked<typeof TaskDetailContainer> = TaskDetailContainer as any
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

        const { queryByTestId } = render(<TaskDetailBody />)
        await wait(() => expect(queryByTestId('spinner')).toBeTruthy())
      })
    })

    describe('when fetched task', () => {
      it('displays task detail', async () => {
        mockedTaskDetailContainer.useContainer.mockReset()
        mockedTaskDetailContainer.useContainer.mockReturnValue({
          ...mockedTaskDetailContainer.useContainer(),
          isFetching: false,
          task: {
            id: 1,
            title: 'Title',
            description: 'Description',
            done: true,
            createdAt: new Date('2020/01/01 12:00'),
            updatedAt: new Date('2020/01/01 13:00')
          }
        })

        const { queryByTestId } = render(<TaskDetailBody />)
        await wait(() => expect(queryByTestId('taskDetail')).toBeTruthy())
      })
    })
  })
})
