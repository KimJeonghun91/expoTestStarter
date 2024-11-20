import ScreenUtils from "./ScreenUtils";
import { ElementMessageParams, ElementParams, IncrementAndDecrementParams } from "./types";

export default class VerifyUtils extends ScreenUtils {
  // * [검증] 요소의 존재 여부
  protected async verifyExists({ selector, timeout = this.defaultTimeout }: ElementParams) {
    const element = await this.findElement({ selector, timeout });
    expect(element);
    return element;
  }

  // * [검증] 요소가 화면에 표시되지 않는지 확인
  protected async verifyNotDisplayed({ selector, timeout = this.defaultTimeout }: ElementParams) {
    const element = await browser.$(`~${selector}`);
    await browser.pause(timeout);
    expect(element).not.toBeDisplayed();
  }

  // * [검증] 요소의 텍스트와 검증 메시지 일치 여부
  protected async verifyText({ selector, expectedMsg, timeout = this.defaultTimeout }: ElementMessageParams) {
    const element = await this.findElement({ selector, timeout });
    return expect(await element.getText()).toBe(expectedMsg);
  }

  // * [검증] 요소의 텍스트와 검증 메시지 불일치 검사
  protected async verifyNotText({ selector, expectedMsg, timeout = this.defaultTimeout }: ElementMessageParams) {
    const element = await this.findElement({ selector, timeout });
    return expect(await element.getText()).not.toEqual(expectedMsg);
  }

  // * [검증] number 증감 확인
  protected async verifyToggleCount({ selector, buttonSelector, timeout = this.defaultTimeout }: IncrementAndDecrementParams) {
    const element = await this.findElement({ selector, timeout });
    const button = await this.findElement({ selector: buttonSelector, timeout });

    // 현재 숫자 가져오기
    let initialLikeCount = parseInt(await element.getText(), 10);

    // 클릭
    await button.click();
    await browser.pause(1000);

    // 숫자 증가 확인
    let increasedLikeCount = parseInt(await element.getText(), 10);
    expect(increasedLikeCount).toBe(initialLikeCount + 1);

    // 클릭 (취소)
    await button.click();
    await browser.pause(1000);

    // 숫자 감소 확인
    let decreasedLikeCount = parseInt(await element.getText(), 10);
    expect(decreasedLikeCount).toBe(initialLikeCount);
  }
}
