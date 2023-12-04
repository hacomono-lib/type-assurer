export class TypeAssertionError extends Error {
  constructor(message: string, public readonly actualData: unknown, opt?: ErrorOptions) {
    super(message, opt)
    this.name = 'TypeAssertionError'
  }
}
