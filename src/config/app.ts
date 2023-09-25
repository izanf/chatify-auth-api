export const {
  PORT = 8080,
  JWT_SECRET = 'jwtsecret'
} = process.env
export const IS_DEVELOPMENT = process.env.NODE_ENV === 'development'
