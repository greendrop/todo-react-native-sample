import React from 'react'
import { cleanup, render } from '@testing-library/react-native'
import TaskDetail from '../../../components/molecules/TaskDetail'
import { ITask } from '../../../models/task'

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

    const { getByTestId } = render(<TaskDetail task={task} />)
    const title = getByTestId('title')
    expect(title.props.value).toBe('Title')
    const description = getByTestId('description')
    expect(description.props.value).toBe('Description')
    const done = getByTestId('done')
    expect(done.props.value).toBe(true)
    const createdAt = getByTestId('createdAt')
    expect(createdAt.props.value).toBe('2020/01/01 12:00')
    const updatedAt = getByTestId('updatedAt')
    expect(updatedAt.props.value).toBe('2020/01/01 13:00')
  })
})
