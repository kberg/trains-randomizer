// http://indiegamr.com/generate-repeatable-random-numbers-in-js/

export interface RandomNumberGenerator {
  next(): number
}

export class SeededRandomNumberGenerator implements RandomNumberGenerator {
  private seed: number;
  constructor(seed: number) {
    this.seed = seed;
  }

  next(): number {
    this.seed = (this.seed * 9301 + 49297) % 233280;
    var rnd = this.seed / 233280;
    return rnd;
  }
}
