import { Random } from "@woowacourse/mission-utils";
import { Console } from "@woowacourse/mission-utils";

Console.print("ddd");
console.log(Random.pickUniqueNumbersInRange(1, 45, 6));

class Lotto {
  #numbers;

  constructor(numbers) {
    this.#validate(numbers);
    this.#validateDuplicate(numbers);
    this.#numbers = numbers;
  }

  #validate(numbers) {
    if (numbers.length !== 6) {
      throw new Error("[ERROR] 로또 번호는 6개여야 합니다.");
    }
  }

  #validateDuplicate() {
    const set = new Set(numbers);
    if (set.length != 6) {
      throw new Error("[ERROR] 로또 번호에 중복이 있으면 안됩니다.");
    }
  }

  getLottoNumbers() {
    return this.#numbers.sort((a, b) => a - b);
  }
}

export default Lotto;
