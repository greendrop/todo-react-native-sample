import React, { FC } from 'react'
import AuthContainer from './containers/auth-container'
import AppComponent from './AppContent'

const App: FC = () => {
  return (
    <AuthContainer.Provider>
      <AppComponent />
    </AuthContainer.Provider>
  )
}

export default App
