class Lotto {
  #numbers;

  constructor(numbers) {
    this.#validate(numbers);
    this.#numbers = numbers;
  }

  #validate(numbers) {
    if (numbers.length !== 6) {
      throw new Error("[ERROR] 로또 번호는 6개여야 합니다.");
    }

    if (new Set(numbers).size != 6) {
      throw new Error("[ERROR] 로또 번호에 중복이 있으면 안됩니다.");
    }

    if (!numbers.every((number) => number >= 1 && number <= 45)) {
      throw new Error("[ERROR] 로또 번호의 범위는 1부터 45입니다.");
    }
  }

  get lottoNumbers() {
    return this.#numbers.sort((a, b) => a - b);
  }
}

export default Lotto;
