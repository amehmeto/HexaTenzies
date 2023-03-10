import { RandomnessProvider } from '../ports/randomnessProvider'
import { IdProvider } from '../ports/IdProvider'
import { Die } from './Die'

export class Dice {
  private readonly AMOUNT_OF_DICE = 10
  public dies: Die[]
  constructor(
    private readonly idProvider: IdProvider,
    public isTenzies: boolean = false,
    public attempts: number = -1,
    dies?: Die[],
  ) {
    this.dies = dies || this.initializeDice()
  }

  roll(randomnessProvider: RandomnessProvider): Dice {
    this.dies = this.dies.map((die) => {
      if (!die.props.isHeld) die.roll(randomnessProvider)
      return die
    })
    this.attempts++
    return this
  }

  checkTenzies() {
    if (this.areAllDiesHeld() && this.areAllDiesSameValue())
      this.isTenzies = true
  }

  private areAllDiesHeld() {
    return this.dies.every((die) => die.props.isHeld)
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

  private areAllDiesSameValue() {
    const firstValue = this.dies[0].props.value

    return this.dies.every((die) => die.props.value === firstValue)
  }

  hold(dieToBeHeldId: string) {
    const dieToBeHeldIndex = this.dies.findIndex(die => die.id === dieToBeHeldId)
    const previouslyCorrectHeldDie = this.dies.find(die => die.props.isHeld && die.props.isCorrect)
    this.dies[dieToBeHeldIndex].hold(previouslyCorrectHeldDie?.props.value)
  }
}
