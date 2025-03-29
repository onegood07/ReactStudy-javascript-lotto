import Lotto from "../src/Lotto.js";

describe("로또 클래스 테스트", () => {
  test("로또 번호의 개수가 6개가 넘어가면 예외가 발생한다.", () => {
    expect(() => {
      new Lotto([1, 2, 3, 4, 5, 6, 7]);
    }).toThrowError("[ERROR] 로또 번호는 6개여야 합니다.");
  });

  test("로또 번호에 중복된 숫자가 있으면 예외가 발생한다.", () => {
    expect(() => {
      new Lotto([1, 2, 3, 4, 5, 5]);
    }).toThrowError("[ERROR] 로또 번호에 중복이 있으면 안됩니다.");
  });

  test("로또 번호의 범위가 1부터 45 이외의 숫자일 때 예외가 발생한다.", () => {
    expect(() => {
      new Lotto([0, 2, 3, 4, 5, 6]);
    }).toThrowError("[ERROR] 로또 번호의 범위는 1부터 45입니다.");
  });
});
