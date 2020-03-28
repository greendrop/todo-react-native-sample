import React, { FC } from 'react'
import { Root } from 'native-base'
import AuthContainer from './containers/auth-container'
import AppContent from './AppContent'

const App: FC = () => {
  return (
    <Root>
      <AuthContainer.Provider>
        <AppContent />
      </AuthContainer.Provider>
    </Root>
  )
}

export default App
