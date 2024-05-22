import { cleanEnv, str } from 'envalid'

const validateEnv = () => {
  cleanEnv(process.env, {
    API_PORT: str(),
    API_DB_POSTGRE_URL: str(),
  })
}

export default validateEnv
