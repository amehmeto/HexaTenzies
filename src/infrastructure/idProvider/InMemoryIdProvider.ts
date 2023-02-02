import { IdProvider } from '../../core/dice/ports/IdProvider'

export class InMemoryIdProvider implements IdProvider {
  private controlledRandomId: string = 'uuid'
  getNew(): string {
    return this.controlledRandomId
  }

  with(id: string): void {
    this.controlledRandomId = id
  }
}
