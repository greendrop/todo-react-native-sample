import React, { FC } from 'react'
import { Form, Item, Label, Input, Textarea, Switch } from 'native-base'
import { ITask } from '../../models/task'
import { datetime } from '../../lib/filters'

type Props = {
  task: ITask
}

const TaskDetail: FC<Props> = props => {
  return (
    <Form testID="taskDetail">
      <Item stackedLabel>
        <Label>Title</Label>
        <Input editable={false} value={props.task.title} testID="title" />
      </Item>
      <Item stackedLabel>
        <Label>Description</Label>
        <Textarea
          rowSpan={
            props.task.description
              ? props.task.description.split('\n').length
              : 1
          }
          bordered={false}
          underline={false}
          editable={false}
          style={{ alignSelf: 'stretch', marginLeft: -10, marginTop: 10 }}
          value={props.task.description}
          testID="description"
        />
      </Item>
      <Item stackedLabel>
        <Label>Done</Label>
        <Switch
          disabled
          style={{ alignSelf: 'flex-start', marginTop: 5, marginLeft: 5 }}
          value={props.task.done}
          testID="done"
        />
      </Item>
      <Item stackedLabel>
        <Label>Created at</Label>
        <Input
          editable={false}
          value={datetime(props.task.createdAt)}
          testID="createdAt"
        />
      </Item>
      <Item stackedLabel>
        <Label>Updated at</Label>
        <Input
          editable={false}
          value={datetime(props.task.updatedAt)}
          testID="updatedAt"
        />
      </Item>
    </Form>
  )
}

export default TaskDetail
