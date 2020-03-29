import React, { FC, useEffect, useState } from 'react'
import { RefreshControl, Alert } from 'react-native'
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native'
import { Content, Spinner, Button, Text, Toast } from 'native-base'
import TaskDetailContainer from '../../containers/task-detail-container'
import TaskDeleteContainer from '../../containers/task-delete-container'
import TaskDetailComponent from '../molecules/TaskDetailComponent'

type Params = {
  id: number
}

const TaskDetailBodyComponent: FC = () => {
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false)
  const [isDeleted, setIsDeleted] = useState<boolean>(false)
  const isFocused = useIsFocused()
  const navigation = useNavigation()
  const route = useRoute()
  const taskDetailContainer = TaskDetailContainer.useContainer()
  const taskDeleteContainer = TaskDeleteContainer.useContainer()

  useEffect(() => {
    if (isFocused) {
      taskDetailContainer.fetchTaskById((route.params as Params).id)
    }
  }, [isFocused])

  useEffect(() => {
    if (isDeleted) {
      setIsDeleted(false)
      Toast.show({ text: 'Deleted Task.' })
      navigation.goBack()
    }
  }, [isDeleted])

  return (
    <Content contentContainerStyle={{ flex: 1 }}>
      <Content
        padder
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={async () => {
              setIsRefreshing(true)
              await taskDetailContainer.fetchTaskById(
                (route.params as Params).id
              )
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

            <Button
              block
              danger
              style={{ marginTop: 10 }}
              onPress={() => {
                Alert.alert('Delete Task', 'Are you sure?', [
                  { text: 'Cancel', style: 'cancel' },
                  {
                    text: 'OK',
                    onPress: async () => {
                      await taskDeleteContainer.deleteTask(
                        taskDetailContainer.task.id
                      )
                      setIsDeleted(true)
                    }
                  }
                ])
              }}
            >
              <Text>Delete</Text>
            </Button>
          </>
        )}
        {taskDetailContainer.isFetching && <Spinner />}
      </Content>
    </Content>
  )
}

export default TaskDetailBodyComponent
