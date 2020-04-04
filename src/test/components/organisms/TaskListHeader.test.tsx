import React from 'react'
import { cleanup, render, wait } from '@testing-library/react-native'
import TaskListHeader from '../../../components/organisms/TaskListHeader'

jest.mock('@react-navigation/native')

afterEach(cleanup)

describe('TaskListHeader', () => {
  it('renders', async () => {
    const { queryByTestId } = render(<TaskListHeader />)
    await wait(() => expect(queryByTestId('header')).toBeTruthy())
  })
})
