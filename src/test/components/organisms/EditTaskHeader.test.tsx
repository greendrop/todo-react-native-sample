import React from 'react'
import { cleanup, render, wait } from '@testing-library/react-native'
import EditTaskHeader from '../../../components/organisms/EditTaskHeader'

jest.mock('@react-navigation/native')

afterEach(cleanup)

describe('EditTaskHeader', () => {
  it('renders', async () => {
    const { queryByTestId } = render(<EditTaskHeader />)
    await wait(() => expect(queryByTestId('header')).toBeTruthy())
  })
})
