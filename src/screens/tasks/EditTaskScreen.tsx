import React, { FC, useEffect } from 'react'
import {
  useNavigation,
  useIsFocused,
  DrawerActions
} from '@react-navigation/native'
import { Container } from 'native-base'
import AuthContainer from '../../containers/auth-container'
import TaskDetailContainer from '../../containers/task-detail-container'
import TaskUpdateContainer from '../../containers/task-update-container'
import TaskFormContainer from '../../containers/task-form-container'
import EditTaskHeaderComponent from '../../components/organisms/EditTaskHeaderComponent'
import EditTaskBodyComponent from '../../components/organisms/EditTaskBodyComponent'

const EditTaskScreen: FC = () => {
  const navigation = useNavigation()
  const authContainer = AuthContainer.useContainer()
  const isFocused = useIsFocused()

  useEffect(() => {
    if (isFocused && !authContainer.isSignedIn()) {
      navigation.dispatch(DrawerActions.jumpTo('SignIn'))
    }
  }, [authContainer.isSignedIn()])

  return (
    <TaskDetailContainer.Provider>
      <TaskUpdateContainer.Provider>
        <TaskFormContainer.Provider>
          <Container>
            <EditTaskHeaderComponent />
            <EditTaskBodyComponent />
          </Container>
        </TaskFormContainer.Provider>
      </TaskUpdateContainer.Provider>
    </TaskDetailContainer.Provider>
  )
}

export default EditTaskScreen
