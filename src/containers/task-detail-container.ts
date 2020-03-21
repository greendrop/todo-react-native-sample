import { useState } from 'react'
import { createContainer } from 'unstated-next'
import { AxiosError } from 'axios'
import { ITask, convertApiTaskToTask } from '../models/task'
import TaskRepository from '../repositories/task-repository'
import AuthContainer from './auth-container'

const initialTask: ITask = {
  id: 0,
  title: '',
  description: null,
  done: false,
  createdAt: null,
  updatedAt: null
}

const useTaskDetail = () => {
  const [task, setTask] = useState<ITask>(initialTask)
  const [isFetching, setIsFetching] = useState<boolean>(false)
  const [isError, setIsError] = useState<boolean>(false)
  const [errorStatus, setErrorStatus] = useState<number | null>(null)
  const [errorData, setErrorData] = useState<string | null>(null)
  const authContainer = AuthContainer.useContainer()

  const clearTask = () => {
    setTask(initialTask)
  }

  const fetchTaskById = async (id: number) => {
    clearTask()
    setIsFetching(true)
    setIsError(false)
    TaskRepository.setHeaderAuthorization(
      `Bearer ${authContainer.token.accessToken}`
    )
    await TaskRepository.get(id)
      .then(response => {
        setTask(convertApiTaskToTask(response.data))
      })
      .catch((error: AxiosError) => {
        setIsError(true)
        setErrorStatus(error.response.status)
        setErrorData(error.response.data)
        if (error.response.status === 401) {
          authContainer.setIsUnauthorized(true)
        }
      })
      .finally(() => {
        setIsFetching(false)
      })
  }

  return {
    task,
    setTask,
    isFetching,
    setIsFetching,
    isError,
    setIsError,
    errorStatus,
    setErrorStatus,
    errorData,
    setErrorData,
    clearTask,
    fetchTaskById
  }
}

const TaskDetailContainer = createContainer(useTaskDetail)

export default TaskDetailContainer
