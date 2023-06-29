export class TypeAssertionError extends Error {
  constructor(message: string, public readonly actualData: unknown) {
    super(message)
    this.name = 'TypeAssertionError'
  }
}
