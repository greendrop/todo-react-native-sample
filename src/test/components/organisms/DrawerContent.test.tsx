import React from 'react'
import { cleanup, render, wait } from '@testing-library/react-native'
import DrawerContent from '../../../components/organisms/DrawerContent'
import AuthContainer from '../../../containers/auth-container'

jest.mock('@react-navigation/native')
jest.mock('../../../containers/auth-container')
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mockedAuthContainer: jest.Mocked<typeof AuthContainer> = AuthContainer as any

afterEach(cleanup)

describe('TaskDetail', () => {
  describe('renders', () => {
    describe('when un signed', () => {
      it('displays Sign in', async () => {
        mockedAuthContainer.useContainer.mockReset()
        mockedAuthContainer.useContainer.mockReturnValue({
          ...mockedAuthContainer.useContainer(),
          isSignedIn: () => {
            return false
          }
        })
        const { queryByTestId } = render(<DrawerContent />)
        await wait(() => expect(queryByTestId('signIn')).toBeTruthy())
      })
    })

    describe('when signed', () => {
      it('displays Sign out', async () => {
        mockedAuthContainer.useContainer.mockReset()
        mockedAuthContainer.useContainer.mockReturnValue({
          ...mockedAuthContainer.useContainer(),
          isSignedIn: () => {
            return true
          }
        })
        const { queryByTestId } = render(<DrawerContent />)
        await wait(() => expect(queryByTestId('signOut')).toBeTruthy())
      })
    })
  })
})
