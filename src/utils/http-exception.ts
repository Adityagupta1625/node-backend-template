/**
 * Custom HTTP exception class extending the base Error class.
 */
class HttpException extends Error {
  /**
     * HTTP error code associated with the exception.
     */
  errorCode: number

  /**
     * Creates an instance of HttpException.
     * @param errorCode - The HTTP error code for the exception.
     * @param message - The error message associated with the exception.
     */
  constructor (
    errorCode: number,
    public readonly message: string | any
  ) {
    super(message)
    this.errorCode = errorCode
  }
}

// Export the HttpException class for use in other modules
export default HttpException
