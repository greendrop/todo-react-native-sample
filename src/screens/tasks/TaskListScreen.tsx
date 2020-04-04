import React, { FC, useEffect } from 'react'
import {
  useNavigation,
  useIsFocused,
  DrawerActions
} from '@react-navigation/native'
import { Container } from 'native-base'
import AuthContainer from '../../containers/auth-container'
import TaskListContainer from '../../containers/task-list-container'
import TaskListHeader from '../../components/organisms/TaskListHeader'
import TaskListBody from '../../components/organisms/TaskListBody'

const TaskListScreen: FC = () => {
  const navigation = useNavigation()
  const authContainer = AuthContainer.useContainer()
  const isFocused = useIsFocused()

  useEffect(() => {
    if (isFocused && !authContainer.isSignedIn()) {
      navigation.dispatch(DrawerActions.jumpTo('SignIn'))
    }
  }, [authContainer.isSignedIn()])

  return (
    <TaskListContainer.Provider>
      <Container>
        <TaskListHeader />
        <TaskListBody />
      </Container>
    </TaskListContainer.Provider>
  )
}

export default TaskListScreen
