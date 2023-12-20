export class TypeAssertionError extends Error {
  public readonly actualData: unknown

  constructor(message: string, _actualData: unknown, opt?: ErrorOptions) {
    super(message, opt)
    this.actualData = _actualData
    this.name = 'TypeAssertionError'
  }
}
