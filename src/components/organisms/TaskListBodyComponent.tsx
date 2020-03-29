import React, { FC, useEffect, useState } from 'react'
import { RefreshControl } from 'react-native'
import { useNavigation, useIsFocused } from '@react-navigation/native'
import { Content, Spinner, Fab, Icon, Text } from 'native-base'
import TaskListContainer from '../../containers/task-list-container'
import TaskListItemComponent from '../molecules/TaskListItemComponent'

const TaskListBodyComponent: FC = () => {
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false)
  const navigation = useNavigation()
  const isFocused = useIsFocused()
  const taskListContainer = TaskListContainer.useContainer()

  useEffect(() => {
    if (isFocused) {
      taskListContainer.fetchTasks()
    }
  }, [isFocused])

  return (
    <Content contentContainerStyle={{ flex: 1 }}>
      <Content
        padder
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={async () => {
              setIsRefreshing(true)
              await taskListContainer.fetchTasks()
              setIsRefreshing(false)
            }}
          />
        }
        onScrollEndDrag={() => {
          if (!taskListContainer.isLastFetched()) {
            taskListContainer.fetchAdditionalTasks()
          }
        }}
      >
        {taskListContainer.tasks.map(task => {
          return <TaskListItemComponent key={task.id} task={task} />
        })}
        {!taskListContainer.isFetching &&
          !taskListContainer.isLastFetched() && (
            <Text style={{ alignSelf: 'center', margin: 10 }}>Lead more</Text>
          )}
        {taskListContainer.isFetching && <Spinner />}
      </Content>
      <Fab>
        <Icon
          type="FontAwesome5"
          name="plus"
          onPress={() => navigation.navigate('NewTask')}
        />
      </Fab>
    </Content>
  )
}

export default TaskListBodyComponent
