import { RandomNumberProvider } from '../ports/randomNumberProvider'
import { IdProvider } from '../ports/IdProvider'
import { Die, DieDTO } from './Die'

export class Dice {
  private readonly AMOUNT_OF_DICE = 10
  private readonly dice: Die[]

  constructor(
    private randomNumberProvider: RandomNumberProvider,
    private idProvider: IdProvider,
  ) {
    this.dice = this.initializeDice()
  }

  roll(): DieDTO[] {
    return this.dice.map((die) => {
      const randomNumber = this.randomNumberProvider.generate()
      die.roll(randomNumber)
      return die.toDTO()
    })
  }

  private initializeDice(): Die[] {
    return Array(this.AMOUNT_OF_DICE).fill(this.generateDie())
  }

  private generateDie() {
    const newId = this.idProvider.getNew()
    return new Die(newId)
  }
}
