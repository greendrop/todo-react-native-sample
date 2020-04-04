import React, { FC, useEffect } from 'react'
import {
  useNavigation,
  useIsFocused,
  DrawerActions
} from '@react-navigation/native'
import { Container } from 'native-base'
import AuthContainer from '../../containers/auth-container'
import TaskCreateContainer from '../../containers/task-create-container'
import TaskFormContainer from '../../containers/task-form-container'
import NewTaskHeader from '../../components/organisms/NewTaskHeader'
import NewTaskBody from '../../components/organisms/NewTaskBody'

const NewTaskScreen: FC = () => {
  const navigation = useNavigation()
  const authContainer = AuthContainer.useContainer()
  const isFocused = useIsFocused()

  useEffect(() => {
    if (isFocused && !authContainer.isSignedIn()) {
      navigation.dispatch(DrawerActions.jumpTo('SignIn'))
    }
  }, [authContainer.isSignedIn()])

  return (
    <TaskCreateContainer.Provider>
      <TaskFormContainer.Provider>
        <Container>
          <NewTaskHeader />
          <NewTaskBody />
        </Container>
      </TaskFormContainer.Provider>
    </TaskCreateContainer.Provider>
  )
}

export default NewTaskScreen
