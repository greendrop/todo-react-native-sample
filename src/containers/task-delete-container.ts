import { useState } from 'react'
import { createContainer } from 'unstated-next'
import { AxiosError } from 'axios'
import TaskRepository from '../repositories/task-repository'
import AuthContainer from './auth-container'

const useTaskDelete = () => {
  const [isDeleting, setIsDeleting] = useState<boolean>(false)
  const [isError, setIsError] = useState<boolean>(false)
  const [errorStatus, setErrorStatus] = useState<number | null>(null)
  const [errorData, setErrorData] = useState<string | null>(null)
  const authContainer = AuthContainer.useContainer()

  const deleteTask = async (id: number) => {
    setIsDeleting(true)
    setIsError(false)
    TaskRepository.setHeaderAuthorization(
      `Bearer ${authContainer.token.accessToken}`
    )
    await TaskRepository.delete(id)
      .catch((error: AxiosError) => {
        setIsError(true)
        setErrorStatus(error.response.status)
        setErrorData(error.response.data)
        if (error.response.status === 401) {
          authContainer.setIsUnauthorized(true)
        }
      })
      .finally(() => {
        setIsDeleting(false)
      })
  }

  return {
    isDeleting,
    setIsDeleting,
    isError,
    setIsError,
    errorStatus,
    setErrorStatus,
    errorData,
    setErrorData,
    deleteTask
  }
}

const TaskDeleteContainer = createContainer(useTaskDelete)

export default TaskDeleteContainer
