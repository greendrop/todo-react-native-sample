import React from 'react'
import { cleanup, render, wait } from '@testing-library/react-native'
import TaskDetailHeader from '../../../components/organisms/TaskDetailHeader'

jest.mock('@react-navigation/native')

afterEach(cleanup)

describe('TaskDetailHeader', () => {
  it('renders', async () => {
    const { queryByTestId } = render(<TaskDetailHeader />)
    await wait(() => expect(queryByTestId('header')).toBeTruthy())
  })
})
