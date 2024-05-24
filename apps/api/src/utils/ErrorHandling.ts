export const ErrorHandling = (errorStatusCode: number, errorMessage: string) => {
  return {
    errorStatusCode: errorStatusCode,
    errorMessage: errorMessage,
  }
}
