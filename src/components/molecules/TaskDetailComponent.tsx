import React, { FC } from 'react'
import { Card, CardItem, Body, H2, Text } from 'native-base'
import { ITask } from '../../models/task'

type Props = {
  task: ITask
}

const TaskDetailComponent: FC<Props> = props => {
  return (
    <Card>
      <CardItem header>
        <H2>{props.task.title}</H2>
      </CardItem>
      <CardItem>
        <Body>
          <Text>{props.task.description}</Text>
        </Body>
      </CardItem>
      <CardItem>
        <Body>
          <Text>{props.task.done}</Text>
        </Body>
      </CardItem>
    </Card>
  )
}

export default TaskDetailComponent
