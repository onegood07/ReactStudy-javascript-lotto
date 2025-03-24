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

  // 함수 - 로또 번호 6개인지 확인
  #validate(numbers) {
    if (numbers.length !== 6) {
      throw new Error("[ERROR] 로또 번호는 6개여야 합니다.");
    }
  }

  // 함수 - 로또 번호에 중복이 있는지 확인
  #validateDuplicate() {
    const set = new Set(numbers);
    if (set.length != 6) {
      throw new Error("[ERROR] 로또 번호에 중복이 있으면 안됩니다.");
    }
  }

  // 함수 - 1~45 범위의 로또 번호 6개 랜덤 부여
  pickRandomLottoNumbers() {
    return (this.#numbers = Random.pickUniqueNumbersInRange(1, 45, 6));
  }

  // 함수 - 오름차순 정렬된 로또 번호 6개 배열 호출
  getSortedLottoNumbers() {
    return this.#numbers.sort((a, b) => a - b);
  }
}

export default Lotto;
