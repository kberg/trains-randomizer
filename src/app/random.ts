// http://indiegamr.com/generate-repeatable-random-numbers-in-js/

export declare interface RNG {
    next(): number
}

export class Random2 {
  private static _unseeded = new class implements RNG{
    next(): number {
      return Math.random();
    }
  };

    
  static seeded(seed: number): RNG {
    return new SeededRandomNumberGenerator(seed);
  }
  static unseeded(): RNG {
    return Random2._unseeded;
  }
}

export class SeededRandomNumberGenerator implements RNG {
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
