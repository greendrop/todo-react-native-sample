import React from 'react'
import { cleanup, render, wait } from '@testing-library/react-native'
import NewTaskHeader from '../../../components/organisms/NewTaskHeader'

jest.mock('@react-navigation/native')

afterEach(cleanup)

describe('EditTaskHeader', () => {
  it('renders', async () => {
    const { queryByTestId } = render(<NewTaskHeader />)
    await wait(() => expect(queryByTestId('header')).toBeTruthy())
  })
})
