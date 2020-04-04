import React from 'react'
import { cleanup, render } from '@testing-library/react-native'
import TaskListItem from '../../../components/molecules/TaskListItem'
import { ITask } from '../../../models/task'

jest.mock('@react-navigation/native')

afterEach(cleanup)

describe('TaskDetail', () => {
  test('renders', () => {
    const task: ITask = {
      id: 1,
      title: 'Title',
      description: 'Description',
      done: true,
      createdAt: new Date('2020/01/01 12:00'),
      updatedAt: new Date('2020/01/01 13:00')
    }

    const { getByTestId } = render(<TaskListItem task={task} />)
    const title = getByTestId('title')
    expect(title.props.children).toBe('Title')
  })
})
