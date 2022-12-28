import { IdProvider } from '../../core/dice/ports/IdProvider'
import { v4 as uuid } from 'uuid'

export class UuidProvider implements IdProvider {
  getNew(): string {
    return uuid()
  }
}
