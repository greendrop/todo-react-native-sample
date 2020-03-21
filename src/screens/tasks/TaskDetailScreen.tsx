import React, { FC, useEffect } from 'react'
import {
  useNavigation,
  useIsFocused,
  DrawerActions
} from '@react-navigation/native'
import { Container } from 'native-base'
import AuthContainer from '../../containers/auth-container'
import TaskDetailContainer from '../../containers/task-detail-container'
import TaskDetailHeaderComponent from '../../components/organisms/TaskDetailHeaderComponent'
import TaskDetailBodyComponent from '../../components/organisms/TaskDetailBodyComponent'

const TaskDetailScreen: FC = () => {
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
      <Container>
        <TaskDetailHeaderComponent />
        <TaskDetailBodyComponent />
      </Container>
    </TaskDetailContainer.Provider>
  )
}

export default TaskDetailScreen
