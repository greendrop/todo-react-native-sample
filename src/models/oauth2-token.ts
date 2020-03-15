export interface IOAuth2Token {
  accessToken: string
  refreshToken: string
  createdAt: Date | null
  expiresAt: Date | null
}

export interface IApiOAuth2Token {
  accessToken: string
  refreshToken: string
  createdAt: number
  expiresIn: number
}

export class OAuth2Token implements IOAuth2Token {
  accessToken = ''
  refreshToken = ''
  createdAt: Date | null = null
  expiresAt: Date | null = null

  constructor(init?: Partial<OAuth2Token>) {
    if (init) {
      Object.assign(this, init)
    }
  }
}
