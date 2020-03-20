import { useState } from 'react'
import { createContainer } from 'unstated-next'
import { AxiosError } from 'axios'
import { ITask, convertApiTaskToTask } from '../models/task'
import TaskRepository from '../repositories/task-repository'
import AuthContainer from './auth-container'

const initialTasks: Array<ITask> = []
const initialTotalCount = 0
const initialPage = 1
const initialPerPage = 10
const initialMaxPage = 1

const useTaskList = () => {
  const [tasks, setTasks] = useState<Array<ITask>>(initialTasks)
  const [totalCount, setTotalCount] = useState<number>(initialTotalCount)
  const [page, setPage] = useState<number>(initialPage)
  const [perPage, setPerPage] = useState<number>(initialPerPage)
  const [maxPage, setMaxPage] = useState<number>(initialMaxPage)
  const [isFetching, setIsFetching] = useState<boolean>(false)
  const [isError, setIsError] = useState<boolean>(false)
  const [errorStatus, setErrorStatus] = useState<number | null>(null)
  const [errorData, setErrorData] = useState<string | null>(null)
  const authContainer = AuthContainer.useContainer()

  const clearTasks = () => {
    setPage(initialPage)
    setTasks(initialTasks)
    setTotalCount(initialTotalCount)
    setMaxPage(initialMaxPage)
  }

  const fetchTasks = async () => {
    clearTasks()
    setIsFetching(true)
    setIsError(false)
    const params = {
      page: page,
      perPage: perPage
    }
    TaskRepository.setHeaderAuthorization(
      `Bearer ${authContainer.token.accessToken}`
    )
    await TaskRepository.getList(params)
      .then(response => {
        setTasks(response.data.map(data => convertApiTaskToTask(data)))
        setTotalCount(Number(response.headers.totalCount))
        setMaxPage(totalCount === 0 ? 1 : Math.ceil(page / perPage))
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

  const fetchAdditionalTasks = async () => {
    setIsFetching(true)
    setIsError(false)
    const params = {
      page: page + 1,
      perPage: perPage
    }
    TaskRepository.setHeaderAuthorization(
      `Bearer ${authContainer.token.accessToken}`
    )
    await TaskRepository.getList(params)
      .then(response => {
        const additionalTasks = response.data.map(data =>
          convertApiTaskToTask(data)
        )
        setTasks(tasks.concat(additionalTasks))
        setPage(page + 1)
        setTotalCount(Number(response.headers.totalCount))
        setMaxPage(totalCount === 0 ? 1 : Math.ceil(page / perPage))
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

  const isLastFetched = () => page >= maxPage

  return {
    tasks,
    setTasks,
    totalCount,
    setTotalCount,
    page,
    setPage,
    perPage,
    setPerPage,
    maxPage,
    setMaxPage,
    isFetching,
    setIsFetching,
    isError,
    setIsError,
    errorStatus,
    setErrorStatus,
    errorData,
    setErrorData,
    clearTasks,
    fetchTasks,
    fetchAdditionalTasks,
    isLastFetched
  }
}

const TaskListContainer = createContainer(useTaskList)

export default TaskListContainer
