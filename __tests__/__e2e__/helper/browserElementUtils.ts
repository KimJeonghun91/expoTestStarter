export const TimeoutDuration = {
  SHORT: 3000,
  MEDIUM: 10000,
  LONG: 30000,
} as const;

export type TimeoutValue = typeof TimeoutDuration[keyof typeof TimeoutDuration];

interface ElementParams {
  selector: string;
  timeout?: TimeoutValue;
}

interface ElementValueParams extends ElementParams {
  value: string;
}

interface ElementMessageParams extends ElementParams {
  expectedMsg: string;
}

interface IncrementAndDecrementParams extends ElementParams {
  buttonSelector: string;
}

class BrowserElementUtils {
  private readonly defaultTimeout = TimeoutDuration.MEDIUM;

  // 요소가 화면에 표시될 때까지 대기
  async findElement({ selector, timeout = this.defaultTimeout }: ElementParams) {
    const element = await browser.$(`~${selector}`);
    await element.waitForDisplayed({ timeout });
    expect(element);
    return element;
  }

  // 요소 대기 및 클릭
  async waitAndClick({ selector, timeout = this.defaultTimeout }: ElementParams) {
    const element = await this.findElement({ selector, timeout });
    await element.click();
    return element;
  }

  // 요소의 텍스트 가져오기
  async getElementText({ selector, timeout = this.defaultTimeout }: ElementParams) {
    const element = await this.findElement({ selector, timeout });
    return await element.getText();
  }

  // 요소에 값을 설정
  async setElementValue({ selector, timeout = this.defaultTimeout, value }: ElementValueParams) {
    const element = await this.findElement({ selector, timeout });
    await element.setValue(value);
    await browser.pause(1000);
    return element;
  }


  // * [검증] 요소의 존재 여부
  async verifyExists({ selector, timeout = this.defaultTimeout }: ElementParams) {
    const element = await this.findElement({ selector, timeout });
    return expect(element);
  }

  // * [검증] 요소가 화면에 표시되지 않는지 확인
  async verifyNotDisplayed({ selector, timeout = this.defaultTimeout }: ElementParams) {
    const element = await browser.$(`~${selector}`);
    await browser.pause(timeout);
    expect(element).not.toBeDisplayed();
  }

  // * [검증] 요소의 텍스트와 검증 메시지 일치 여부
  async verifyText({ selector, expectedMsg, timeout = this.defaultTimeout }: ElementMessageParams) {
    const element = await this.findElement({ selector, timeout });
    return expect(await element.getText()).toBe(expectedMsg);
  }

  // * [검증] 요소의 텍스트와 검증 메시지 불일치 검사
  async verifyNotText({ selector, expectedMsg, timeout = this.defaultTimeout }: ElementMessageParams) {
    const element = await this.findElement({ selector, timeout });
    return expect(await element.getText()).not.toEqual(expectedMsg);
  }

  // * [검증] number 증감 확인
  async verifyToggleCount({ selector, buttonSelector, timeout = this.defaultTimeout }: IncrementAndDecrementParams) {
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

export default new BrowserElementUtils();
