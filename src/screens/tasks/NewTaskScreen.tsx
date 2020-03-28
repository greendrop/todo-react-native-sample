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
import NewTaskHeaderComponent from '../../components/organisms/NewTaskHeaderComponent'
import NewTaskBodyComponent from '../../components/organisms/NewTaskBodyComponent'

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
          <NewTaskHeaderComponent />
          <NewTaskBodyComponent />
        </Container>
      </TaskFormContainer.Provider>
    </TaskCreateContainer.Provider>
  )
}

export default NewTaskScreen
