export enum LoggerTypes {
  SERVER = 'SERVER',
  INFO = 'INFO',
  DATABASE_ERROR = 'DATABASE_ERROR',
}

export enum LoggerReturn {
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
  REQUEST = 'REQUEST',
}

export interface IAppLogger {
  type: LoggerTypes
  logReturn: LoggerReturn
  logMessage: string
}
