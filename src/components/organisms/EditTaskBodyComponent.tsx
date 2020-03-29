import React, { FC, useState, useEffect } from 'react'
import { useNavigation, useIsFocused, useRoute } from '@react-navigation/native'
import { Content, Button, Text, Toast, Spinner } from 'native-base'
import TaskDetailContainer from '../../containers/task-detail-container'
import TaskUpdateContainer from '../../containers/task-update-container'
import TaskFormContainer from '../../containers/task-form-container'
import TaskFormComponent from '../molecules/TaskFormComponent'
import { convertTaskToTaskForm } from '../../models/task'

type Params = {
  id: number
}

const EditTaskBodyComponent: FC = () => {
  const [isUpdated, setIsUpdated] = useState<boolean>(false)
  const navigation = useNavigation()
  const isFocused = useIsFocused()
  const route = useRoute()
  const taskDetailContainer = TaskDetailContainer.useContainer()
  const taskFormContainer = TaskFormContainer.useContainer()
  const taskUpdateContainer = TaskUpdateContainer.useContainer()

  useEffect(() => {
    if (isFocused) {
      taskDetailContainer.fetchTaskById((route.params as Params).id)
    }
  }, [isFocused])

  useEffect(() => {
    if (isFocused && !taskDetailContainer.isFetching) {
      const taskForm = convertTaskToTaskForm(taskDetailContainer.task)
      taskFormContainer.setTaskForm(taskForm)
    }
  }, [isFocused, taskDetailContainer.isFetching])

  useEffect(() => {
    if (isUpdated) {
      setIsUpdated(false)
      Toast.show({ text: 'Updated Task.' })
      navigation.goBack()
    }
  }, [isUpdated])

  return (
    <Content contentContainerStyle={{ flex: 1 }}>
      <Content padder>
        {!taskDetailContainer.isFetching && (
          <>
            <TaskFormComponent />
            <Button
              block
              disabled={taskFormContainer.hasErrors()}
              style={{ marginTop: 10 }}
              onPress={async () => {
                if (taskFormContainer.isValid()) {
                  await taskUpdateContainer.updateTask(
                    taskDetailContainer.task.id,
                    taskFormContainer.taskForm
                  )
                  setIsUpdated(true)
                }
              }}
            >
              <Text>Update</Text>
            </Button>
          </>
        )}
        {taskDetailContainer.isFetching && <Spinner />}
      </Content>
    </Content>
  )
}

export default EditTaskBodyComponent
