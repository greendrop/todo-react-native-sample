import React, { FC, useState, useEffect } from 'react'
import { useNavigation, useIsFocused } from '@react-navigation/native'
import { Content, Button, Text, Toast } from 'native-base'
import TaskCreateContainer from '../../containers/task-create-container'
import TaskFormContainer from '../../containers/task-form-container'
import TaskFormComponent from '../molecules/TaskFormComponent'

const NewTaskBodyComponent: FC = () => {
  const [isCreated, setIsCreated] = useState<boolean>(false)
  const navigation = useNavigation()
  const isFocused = useIsFocused()
  const taskFormContainer = TaskFormContainer.useContainer()
  const taskCreateContainer = TaskCreateContainer.useContainer()

  useEffect(() => {
    if (isFocused) {
      taskFormContainer.clearTaskForm()
    }
  }, [isFocused])

  useEffect(() => {
    if (isCreated) {
      setIsCreated(false)
      Toast.show({ text: 'Created Task.' })
      navigation.goBack()
    }
  }, [isCreated])

  return (
    <Content padder>
      <Content contentContainerStyle={{ flex: 1 }}>
        <TaskFormComponent />
        <Button
          block
          disabled={taskFormContainer.hasErrors()}
          style={{ marginTop: 10 }}
          onPress={async () => {
            if (taskFormContainer.isValid()) {
              await taskCreateContainer.createTask(taskFormContainer.taskForm)
              setIsCreated(true)
            }
          }}
        >
          <Text>Create</Text>
        </Button>
      </Content>
    </Content>
  )
}

export default NewTaskBodyComponent
