import React, { FC } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import TaskListScreen from '../screens/tasks/TaskListScreen'
import TaskDetailScreen from '../screens/tasks/TaskDetailScreen'
import NewTaskScreen from '../screens/tasks/NewTaskScreen'

const Stack = createStackNavigator()

const TaskListNavigator: FC = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="TaskList" component={TaskListScreen} />
      <Stack.Screen name="TaskDetail" component={TaskDetailScreen} />
      <Stack.Screen name="NewTask" component={NewTaskScreen} />
    </Stack.Navigator>
  )
}

export default TaskListNavigator
