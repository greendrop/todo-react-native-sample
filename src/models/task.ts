export interface ITask {
  id: number
  title: string
  description: string | null
  done: boolean
  createdAt: Date | null
  updatedAt: Date | null
}

export interface IApiTask {
  id: number
  title: string
  description: string | null
  done: boolean
  createdAt: string | null
  updatedAt: string | null
}

export interface ITaskForm {
  title: string
  description: string | null
  done: boolean
}

export const convertApiTaskToTask = (apiTask: IApiTask): ITask => {
  return {
    id: apiTask.id,
    title: apiTask.title,
    description: apiTask.description,
    done: apiTask.done,
    createdAt: apiTask.createdAt ? new Date(apiTask.createdAt) : null,
    updatedAt: apiTask.updatedAt ? new Date(apiTask.updatedAt) : null
  }
}

export const convertTaskToTaskForm = (task: ITask): ITaskForm => {
  return {
    title: task.title,
    description: task.description,
    done: task.done
  }
}
