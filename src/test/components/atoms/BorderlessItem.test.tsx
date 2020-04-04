import React from 'react'
import { StyleSheet } from 'react-native'
import { cleanup, render } from '@testing-library/react-native'
import BorderlessItem from '../../../components/atoms/BorderlessItem'

afterEach(cleanup)

describe('BorderlessItem', () => {
  test('renders', () => {
    const { getByTestId } = render(<BorderlessItem />)
    const item = getByTestId('item')
    const itemStyle = StyleSheet.flatten(item.props.style)
    expect(itemStyle.borderColor).toEqual('transparent')
  })
})
