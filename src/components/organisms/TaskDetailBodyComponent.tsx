import React, { FC, useEffect, useState } from 'react'
import { RefreshControl } from 'react-native'
import { useIsFocused, useRoute } from '@react-navigation/native'
import { Content, Spinner } from 'native-base'
import TaskDetailContainer from '../../containers/task-detail-container'
import TaskDetailComponent from '../molecules/TaskDetailComponent'

type Params = {
  id: number
}

const TaskDetailBodyComponent: FC = () => {
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false)
  const isFocused = useIsFocused()
  const route = useRoute()
  const taskDetailContainer = TaskDetailContainer.useContainer()

  useEffect(() => {
    if (isFocused) {
      taskDetailContainer.fetchTaskById((route.params as Params).id)
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
            await taskDetailContainer.fetchTaskById((route.params as Params).id)
            setIsRefreshing(false)
          }}
        />
      }
    >
      {!taskDetailContainer.isFetching && (
        <TaskDetailComponent task={taskDetailContainer.task} />
      )}
      {taskDetailContainer.isFetching && <Spinner />}
    </Content>
  )
}

export default TaskDetailBodyComponent
