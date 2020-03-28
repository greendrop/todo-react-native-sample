import React, { FC } from 'react'
import { Form, Item, Label, Input, Switch } from 'native-base'
import { ITask } from '../../models/task'
import { datetime } from '../../lib/filters'

type Props = {
  task: ITask
}

const TaskDetailComponent: FC<Props> = props => {
  return (
    <Form>
      <Item stackedLabel>
        <Label>Title</Label>
        <Input editable={false} value={props.task.title} />
      </Item>
      <Item stackedLabel>
        <Label>Description</Label>
        <Input editable={false} multiline value={props.task.description} />
      </Item>
      <Item stackedLabel>
        <Label>Done</Label>
        <Switch
          style={{ alignSelf: 'flex-start', paddingTop: 20, paddingLeft: 10 }}
          value={props.task.done}
        />
      </Item>
      <Item stackedLabel>
        <Label>Created at</Label>
        <Input editable={false} value={datetime(props.task.createdAt)} />
      </Item>
      <Item stackedLabel>
        <Label>Updated at</Label>
        <Input editable={false} value={datetime(props.task.updatedAt)} />
      </Item>
    </Form>
  )
}

export default TaskDetailComponent
