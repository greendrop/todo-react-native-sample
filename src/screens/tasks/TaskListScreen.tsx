import React, { FC, useEffect } from 'react'
import {
  useNavigation,
  useIsFocused,
  DrawerActions
} from '@react-navigation/native'
import { Container } from 'native-base'
import AuthContainer from '../../containers/auth-container'
import TaskListContainer from '../../containers/task-list-container'
import TaskListHeaderComponent from '../../components/organisms/TaskListHeaderComponent'
import TaskListBodyComponent from '../../components/organisms/TaskListBodyComponent'

const TaskListScreen: FC = () => {
  const navigation = useNavigation()
  const authContainer = AuthContainer.useContainer()
  const isFocused = useIsFocused()

  useEffect(() => {
    if (isFocused) {
      if (!authContainer.isSignedIn()) {
        navigation.dispatch(DrawerActions.jumpTo('SignIn'))
      }
    }
  }, [isFocused])

  return (
    <TaskListContainer.Provider>
      <Container>
        <TaskListHeaderComponent />
        <TaskListBodyComponent />
      </Container>
    </TaskListContainer.Provider>
  )
}

export default TaskListScreen
