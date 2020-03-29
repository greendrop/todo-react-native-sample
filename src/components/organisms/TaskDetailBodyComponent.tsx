import React, { FC, useEffect, useState } from 'react'
import { RefreshControl } from 'react-native'
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native'
import { Content, Spinner, Button, Text } from 'native-base'
import TaskDetailContainer from '../../containers/task-detail-container'
import TaskDetailComponent from '../molecules/TaskDetailComponent'

type Params = {
  id: number
}

const TaskDetailBodyComponent: FC = () => {
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false)
  const isFocused = useIsFocused()
  const navigation = useNavigation()
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
        <>
          <TaskDetailComponent task={taskDetailContainer.task} />

          <Button
            block
            light
            style={{ marginTop: 10 }}
            onPress={async () => {
              navigation.navigate('EditTask', {
                id: taskDetailContainer.task.id
              })
            }}
          >
            <Text>Edit</Text>
          </Button>
        </>
      )}
      {taskDetailContainer.isFetching && <Spinner />}
    </Content>
  )
}

export default TaskDetailBodyComponent
