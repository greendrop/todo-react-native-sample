import React, { FC } from 'react'
import AuthContainer from './containers/auth-container'
import AppContent from './AppContent'

const App: FC = () => {
  return (
    <AuthContainer.Provider>
      <AppContent />
    </AuthContainer.Provider>
  )
}

export default App
