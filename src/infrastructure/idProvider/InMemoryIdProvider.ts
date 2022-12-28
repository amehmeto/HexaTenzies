import { IdProvider } from '../../core/dice/ports/IdProvider'

export class InMemoryIdProvider implements IdProvider {
  getNew(): string {
    return 'uuid'
  }
}
