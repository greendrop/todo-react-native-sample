import React, { FC } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Card, CardItem, Text } from 'native-base'
import { ITask } from '../../models/task'

type Props = {
  task: ITask
}

const TaskListItemComponent: FC<Props> = props => {
  const navigation = useNavigation()

  return (
    <Card>
      <CardItem
        button
        onPress={() => {
          navigation.navigate('TaskDetail', { id: props.task.id })
        }}
      >
        <Text>{props.task.title}</Text>
      </CardItem>
    </Card>
  )
}

export default TaskListItemComponent
