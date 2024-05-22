import type { Config } from 'jest'

const config: Config = {
  rootDir: './',
  moduleFileExtensions: ['js', 'json', 'ts'],
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  moduleNameMapper: {
    '^~/(@)(.*)$': '<rootDir>/src/$2',
  },
  modulePathIgnorePatterns: ['<rootDir>/dist'],
  testEnvironment: 'node',
}

export default config
