import { useState } from 'react'
import { createContainer } from 'unstated-next'
import { AxiosError } from 'axios'
import { ITaskForm } from '../models/task'
import TaskRepository from '../repositories/task-repository'
import AuthContainer from './auth-container'

const useTaskCreate = () => {
  const [isCreating, setIsCreating] = useState<boolean>(false)
  const [isError, setIsError] = useState<boolean>(false)
  const [errorStatus, setErrorStatus] = useState<number | null>(null)
  const [errorData, setErrorData] = useState<string | null>(null)
  const authContainer = AuthContainer.useContainer()

  const createTask = async (taskForm: ITaskForm) => {
    setIsCreating(true)
    setIsError(false)
    TaskRepository.setHeaderAuthorization(
      `Bearer ${authContainer.token.accessToken}`
    )
    await TaskRepository.create(taskForm)
      .catch((error: AxiosError) => {
        setIsError(true)
        setErrorStatus(error.response.status)
        setErrorData(error.response.data)
        if (error.response.status === 401) {
          authContainer.setIsUnauthorized(true)
        }
      })
      .finally(() => {
        setIsCreating(false)
      })
  }

  return {
    isCreating,
    setIsCreating,
    isError,
    setIsError,
    errorStatus,
    setErrorStatus,
    errorData,
    setErrorData,
    createTask
  }
}

const TaskCreateContainer = createContainer(useTaskCreate)

export default TaskCreateContainer
