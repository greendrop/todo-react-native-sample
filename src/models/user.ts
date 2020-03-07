export interface IUser {
  id: number
  email: string
  createdAt: Date | null
  updatedAt: Date | null
}

export class User implements IUser {
  id = 0
  email = ''
  createdAt: Date | null = null
  updatedAt: Date | null = null

  constructor(init?: Partial<User>) {
    if (init) {
      Object.assign(this, init)
    }
  }
}
