import { RandomnessProvider } from '../ports/randomnessProvider'
import { IdProvider } from '../ports/IdProvider'
import { Die } from './Die'

export class Dice {
  private readonly AMOUNT_OF_DICE = 10
  public dies: Die[]
  constructor(
    private readonly idProvider: IdProvider,
    public isTenzies: boolean = false,
    dies?: Die[],
  ) {
    this.dies = dies || this.initializeDice()
  }

  roll(randomnessProvider: RandomnessProvider): Dice {
    this.dies = this.dies.map((die) => {
      if (!die.props.isHeld) die.roll(randomnessProvider)
      return die
    })
    return this
  }

  public initializeDice(): Die[] {
    return Array(this.AMOUNT_OF_DICE)
      .fill(undefined) // needed to avoid generating die with the same id
      .map(() => this.generateDie())
  }

  private generateDie() {
    const newId = this.idProvider.getNew()
    return new Die(newId)
  }
}
