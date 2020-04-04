import React from 'react'
import { cleanup, render, wait } from '@testing-library/react-native'
import NewTaskBody from '../../../components/organisms/NewTaskBody'
import TaskFormContainer from '../../../containers/task-form-container'

jest.mock('@react-navigation/native')
jest.mock('../../../containers/task-create-container')
jest.mock('../../../containers/task-form-container')
/* eslint-disable @typescript-eslint/no-explicit-any */
const mockedTaskFormContainer: jest.Mocked<typeof TaskFormContainer> = TaskFormContainer as any
/* eslint-enable @typescript-eslint/no-explicit-any */

afterEach(cleanup)

describe('NewTaskBody', () => {
  describe('renders', () => {
    it('displays task form', async () => {
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

      const { queryByTestId } = render(<NewTaskBody />)
      await wait(() => expect(queryByTestId('taskForm')).toBeTruthy())
    })
  })
})
