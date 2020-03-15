import React, { FC } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import TaskListScreen from '../screens/tasks/TaskListScreen'

const Stack = createStackNavigator()

const TaskListNavigator: FC = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="TaskList" component={TaskListScreen} />
    </Stack.Navigator>
  )
}

export default TaskListNavigator
