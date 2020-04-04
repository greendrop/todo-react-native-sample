import React, { FC } from 'react'
import { Form, Item, Label, Input, Textarea, Switch } from 'native-base'
import BorderlessItem from '../atoms/BorderlessItem'
import ErrorText from '../atoms/ErrorText'
import TaskFormContainer from '../../containers/task-form-container'

const TaskForm: FC = () => {
  const taskFormContainer = TaskFormContainer.useContainer()

  return (
    <Form testID="taskForm">
      <Item stackedLabel error={taskFormContainer.errors.title !== ''}>
        <Label>Title</Label>
        <Input
          value={taskFormContainer.taskForm.title}
          onChange={taskFormContainer.handleTitle}
          testID="title"
        />
      </Item>
      {taskFormContainer.errors.title !== '' && (
        <BorderlessItem>
          <ErrorText>{taskFormContainer.errors.title}</ErrorText>
        </BorderlessItem>
      )}
      <Item stackedLabel>
        <Label>Description</Label>
        <Textarea
          rowSpan={3}
          bordered={false}
          underline={false}
          style={{ alignSelf: 'stretch', marginLeft: -10, marginTop: 10 }}
          value={taskFormContainer.taskForm.description}
          onChange={taskFormContainer.handleDescription}
          testID="description"
        />
      </Item>
      <Item stackedLabel>
        <Label>Done</Label>
        <Switch
          style={{ alignSelf: 'flex-start', marginTop: 5, marginLeft: 5 }}
          value={taskFormContainer.taskForm.done}
          onValueChange={taskFormContainer.handleDone}
          testID="done"
        />
      </Item>
    </Form>
  )
}

export default TaskForm
