interface HttpExceptionInterface {
  /**
     * HTTP error code associated with the exception.
     */
  errorCode: number

  /**
     * The error message associated with the exception.
     */
  message: string | any
}

export default HttpExceptionInterface
