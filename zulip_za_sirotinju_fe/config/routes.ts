const auth = "/auth"
const app = "/app"
const landing = "/home"

export const routes = {
  login: `${auth}/login`,
  register: `${auth}/register`,
  forgotPassword: `${auth}/forgot-password`,
  app: `${app}`,
  landing: `${landing}`,
  home: "/",
} as const
