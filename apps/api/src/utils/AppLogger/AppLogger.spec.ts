import { AppLogger } from './AppLogger'
import { IAppLogger, LoggerReturn, LoggerTypes } from '@repo/types/api'
import chalk from 'chalk'

describe('AppLogger', () => {
  const mockDate = new Date('2024-05-22T02:51:38.710Z')
  const originalDate = Date

  beforeAll(() => {
    global.Date = jest.fn(() => mockDate) as unknown as DateConstructor
  })

  afterAll(() => {
    global.Date = originalDate
  })

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should log success message with SERVER type', () => {
    const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {})
    const message = 'Server started successfully'

    const loggerParams: IAppLogger = {
      type: LoggerTypes.SERVER,
      logReturn: LoggerReturn.SUCCESS,
      logMessage: message,
    }

    AppLogger(loggerParams)

    expect(logSpy).toHaveBeenCalledWith(
      `[SERVER] [2024-05-22T02:51:38.710Z] ${chalk.greenBright(message)}`,
    )
  })

  it('should log error message with DATABASE_ERROR type', () => {
    const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {})
    const message = 'Database connection failed'

    const loggerParams: IAppLogger = {
      type: LoggerTypes.DATABASE_ERROR,
      logReturn: LoggerReturn.ERROR,
      logMessage: message,
    }

    AppLogger(loggerParams)

    expect(logSpy).toHaveBeenCalledWith(
      `[DATABASE_ERROR] [2024-05-22T02:51:38.710Z] ${chalk.redBright(message)}`,
    )
  })

  it('should log info message with INFO type', () => {
    const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {})
    const message = 'Fetching data from API'

    const loggerParams: IAppLogger = {
      type: LoggerTypes.INFO,
      logReturn: LoggerReturn.REQUEST,
      logMessage: message,
    }

    AppLogger(loggerParams)

    expect(logSpy).toHaveBeenCalledWith(`[INFO] [2024-05-22T02:51:38.710Z] ${chalk.cyan(message)}`)
  })

  it('should warn for unknown logReturn type', () => {
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {})
    const message = 'Unknown log return type'

    const loggerParams: IAppLogger = {
      type: LoggerTypes.INFO,
      logReturn: 'UNKNOWN' as LoggerReturn,
      logMessage: message,
    }

    AppLogger(loggerParams)

    expect(warnSpy).toHaveBeenCalledWith(`Unknown logReturn type: UNKNOWN`)
  })

  it('should warn for unknown logger type', () => {
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {})
    const message = 'Unknown logger type'

    const loggerParams: IAppLogger = {
      type: 'UNKNOWN' as LoggerTypes,
      logReturn: LoggerReturn.SUCCESS,
      logMessage: message,
    }

    AppLogger(loggerParams)

    expect(warnSpy).toHaveBeenCalledWith(`Unknown logger type: UNKNOWN`)
  })
})
