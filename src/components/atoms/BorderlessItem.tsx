import React, { FC, ComponentProps } from 'react'
import { Item } from 'native-base'

const BorderlessItem: FC<ComponentProps<typeof Item>> = props => {
  return (
    <Item style={{ borderColor: 'transparent' }} {...props} testID="item" />
  )
}

export default BorderlessItem
