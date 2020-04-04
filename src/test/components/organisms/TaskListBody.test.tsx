import React from 'react'
import { cleanup, render, wait } from '@testing-library/react-native'
import TaskListBody from '../../../components/organisms/TaskListBody'
import TaskListContainer from '../../../containers/task-list-container'

jest.mock('@react-navigation/native')
jest.mock('../../../containers/task-list-container')
/* eslint-disable @typescript-eslint/no-explicit-any */
const mockedTaskListContainer: jest.Mocked<typeof TaskListContainer> = TaskListContainer as any
/* eslint-enable @typescript-eslint/no-explicit-any */

afterEach(cleanup)

describe('TaskDetail', () => {
  describe('renders', () => {
    describe('when fetching task', () => {
      it('displays spinner', async () => {
        mockedTaskListContainer.useContainer.mockReset()
        mockedTaskListContainer.useContainer.mockReturnValue({
          ...mockedTaskListContainer.useContainer(),
          isFetching: true,
          tasks: []
        })

        const { queryByTestId } = render(<TaskListBody />)
        await wait(() => expect(queryByTestId('spinner')).toBeTruthy())
      })
    })

    describe('when fetched task', () => {
      it('displays task list', async () => {
        mockedTaskListContainer.useContainer.mockReset()
        mockedTaskListContainer.useContainer.mockReturnValue({
          ...mockedTaskListContainer.useContainer(),
          isFetching: false,
          tasks: [
            {
              id: 1,
              title: 'Title',
              description: 'Description',
              done: true,
              createdAt: new Date('2020/01/01 12:00'),
              updatedAt: new Date('2020/01/01 13:00')
            }
          ],
          isLastFetched: () => {
            return true
          }
        })

        const { queryByTestId } = render(<TaskListBody />)
        await wait(() => expect(queryByTestId('taskList')).toBeTruthy())
      })
    })
  })
})
