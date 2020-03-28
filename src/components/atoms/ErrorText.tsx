import React, { FC, ComponentProps } from 'react'
import { Text } from 'native-base'

const ErrorText: FC<ComponentProps<typeof Text>> = props => {
  return <Text style={{ color: '#ed2f2f' }} {...props} />
}

export default ErrorText
