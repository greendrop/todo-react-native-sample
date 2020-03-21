import React, { FC, useEffect, useState } from 'react'
import { RefreshControl } from 'react-native'
import { useIsFocused } from '@react-navigation/native'
import { Content, Spinner } from 'native-base'
import TaskListContainer from '../../containers/task-list-container'
import TaskListItemComponent from '../molecules/TaskListItemComponent'

const TaskListBodyComponent: FC = () => {
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false)
  const isFocused = useIsFocused()
  const taskListContainer = TaskListContainer.useContainer()

  useEffect(() => {
    if (isFocused) {
      taskListContainer.fetchTasks()
    }
  }, [isFocused])

  return (
    <Content
      padder
      contentContainerStyle={{ flex: 1 }}
      refreshControl={
        <RefreshControl
          refreshing={isRefreshing}
          onRefresh={async () => {
            setIsRefreshing(true)
            await taskListContainer.fetchTasks()
            setIsRefreshing(false)
          }}
        />
      }
    >
      {taskListContainer.tasks.map(task => {
        return <TaskListItemComponent key={task.id} task={task} />
      })}
      {taskListContainer.isFetching && <Spinner />}
    </Content>
  )
}

export default TaskListBodyComponent
