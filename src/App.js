import { Console } from "@woowacourse/mission-utils";
import { Random } from "@woowacourse/mission-utils";
import Lotto from "./Lotto.js";

// 로또 번호 통계
const lottoStats = {
  3: 0,
  4: 0,
  5: 0,
  "5+": 0,
  6: 0,
};

// 로또 번호 상금
const prize = {
  3: 5_000,
  4: 50_000,
  5: 1_500_000,
  "5+": 30_000_000,
  6: 2_000_000_000,
};

Object.freeze(prize);

class App {
  async play() {
    try {
      const buyingPrice = await Console.readLineAsync("구입금액을 입력해 주세요.\n");
      const buyingLottosCount = this.#calculateMaxLottosToBuy(buyingPrice);
      Console.print(`${buyingLottosCount}개를 구매했습니다.`);

      const lottos = Array.from({ length: buyingLottosCount }, (_, i) => {
        const lotto = new Lotto(this.#pickRandomLottoNumbers());
        Console.print(lotto.lottoNumbers);
        return lotto.lottoNumbers;
      });

      const winningLottoNumbers = this.#inputWinningNumbers(
        await Console.readLineAsync("당첨 번호를 입력해주세요.\n")
      );
      const winningLottoBonusNumber = this.#isValidBonusNumber(
        winningLottoNumbers,
        await Console.readLineAsync("보너스 번호를 입력해주세요.\n")
      );

      lottos.forEach((lotto) =>
        this.#correctLotto(lotto, winningLottoNumbers, winningLottoBonusNumber)
      );

      Console.print("당첨 통계\n---");
      this.#statistics(buyingPrice);
    } catch (error) {
      Console.print(error);
    }
  }

  #calculateMaxLottosToBuy(buyingPrice) {
    const price = Number(buyingPrice);

    if (price % 1000 != 0 || !(price % 1 === 0)) {
      throw new Error("[ERROR] 1000원 단위의 숫자로 입력하세요.");
    }

    if (price <= 0) {
      throw new Error("[ERROR] 로또를 구매하려면 1000원 이상 입력해주세요!");
    }

    return Math.floor(price / 1000);
  }

  #pickRandomLottoNumbers() {
    return Random.pickUniqueNumbersInRange(1, 45, 6);
  }

  #isValidLottoNumber(rawNumber) {
    const number = Number(rawNumber);

    if (isNaN(number) || 1 > number || number > 45 || !(number % 1 === 0)) {
      throw new Error("[ERROR] 1부터 45 사이의 정수를 원합니다.");
    }

    return number;
  }

  #isValidBonusNumber(lottoNumbers, rawNumber) {
    if (lottoNumbers.includes(this.#isValidLottoNumber(rawNumber))) {
      throw new Error("[ERROR] 보너스 숫자는 당첨 번호와 중복될 수 없습니다.");
    }

    return;
  }

  #inputWinningNumbers(rawNumbers) {
    const lotto = rawNumbers.split(",").filter((num) => this.#isValidLottoNumber(num));

    return new Lotto(lotto).lottoNumbers;
  }

  #correctLotto(numbers, lottoNumbers, lottoBonusNumber) {
    const correctLottos = numbers.filter((num) => lottoNumbers.includes(num));

    if (correctLottos.length == 5) {
      const remainingNumber = numbers.find((num) => !lottoNumbers.includes(num));

      if (remainingNumber == lottoBonusNumber) {
        return (lottoStats["5+"] += 1);
      }
    }

    lottoStats[`${correctLottos.length}`] += 1;
  }

  #statistics(buyingPrice) {
    let sumPrize = 0;

    Object.entries(prize).forEach(([key, money]) => {
      if (key == "5+") {
        sumPrize += lottoStats["5+"] * money;
        return;
      }

      sumPrize += lottoStats[key] * money;
    });

    Console.print(`3개 일치 (5,000원) - ${lottoStats["3"]}개`);
    Console.print(`4개 일치 (50,000원) - ${lottoStats["4"]}개`);
    Console.print(`5개 일치 (1,500,000원) - ${lottoStats["5"]}개`);
    Console.print(`5개 일치, 보너스 볼 일치 (30,000,000원) - ${lottoStats["5+"]}개`);
    Console.print(`6개 일치 (2,000,000,000원) - ${lottoStats["6"]}개`);

    const ROI = ((sumPrize - buyingPrice) / buyingPrice) * 100;
    Console.print(`총 수익률은 ${ROI.toFixed(1)}%입니다.`);
  }
}

export default App;
