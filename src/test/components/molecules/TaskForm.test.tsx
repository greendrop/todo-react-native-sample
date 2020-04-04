import React from 'react'
import { cleanup, render } from '@testing-library/react-native'
import TaskForm from '../../../components/molecules/TaskForm'
import TaskFormContainer from '../../../containers/task-form-container'

jest.mock('../../../containers/task-form-container')
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mockedTaskFormContainer: jest.Mocked<typeof TaskFormContainer> = TaskFormContainer as any

afterEach(cleanup)

describe('TaskForm', () => {
  test('renders', () => {
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
      }
    })

    const { getByTestId } = render(<TaskForm />)
    const title = getByTestId('title')
    expect(title.props.value).toBe('Title')
    const description = getByTestId('description')
    expect(description.props.value).toBe('Description')
    const done = getByTestId('done')
    expect(done.props.value).toBe(true)
  })
})
