import React from 'react'
import { StyleSheet } from 'react-native'
import { cleanup, render } from '@testing-library/react-native'
import ErrorText from '../../../components/atoms/ErrorText'

afterEach(cleanup)

describe('ErrorText', () => {
  test('renders', () => {
    const { getByTestId } = render(<ErrorText>Message</ErrorText>)
    const text = getByTestId('text')
    const textStyle = StyleSheet.flatten(text.props.style)
    expect(textStyle.color).toEqual('#ed2f2f')
    expect(text.props.children).toEqual('Message')
  })
})
