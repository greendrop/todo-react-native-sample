import React, { FC } from 'react'
import { Card, CardItem, Text } from 'native-base'
import { ITask } from '../../models/task'

type Props = {
  task: ITask
}

const TaskListItemComponent: FC<Props> = props => {
  return (
    <Card>
      <CardItem>
        <Text>{props.task.title}</Text>
      </CardItem>
    </Card>
  )
}

export default TaskListItemComponent
