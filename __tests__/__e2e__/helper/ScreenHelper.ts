import { TimeoutDuration } from "./constants";
import { ElementParams, ElementValueParams, StateParams } from "./types";

export default abstract class ScreenHelper {
  readonly defaultTimeout = TimeoutDuration.MEDIUM;

  // 요소가 화면에 표시될 때까지 대기
  async findElement({ selector, timeout = this.defaultTimeout }: ElementParams) {
    const element = await browser.$(`~${selector}`);
    await element.waitForDisplayed({ timeout });
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

  // 요소의 state 가져오기
  async getElementState({ selector, timeout = this.defaultTimeout, state }: StateParams): Promise<'true' | 'false' | null> {
    const element = await this.findElement({ selector, timeout });
    return await element.getAttribute(state) as 'true' | 'false';
  }

  // 요소의 value 가져오기
  async getElementValue({ selector, timeout = this.defaultTimeout }: ElementParams) {
    const element = await this.findElement({ selector, timeout });
    return await element.getValue();
  }

  // 요소에 값을 설정
  async setElementValue({ selector, timeout = this.defaultTimeout, value }: ElementValueParams) {
    const element = await this.findElement({ selector, timeout });
    await element.setValue(value);
    await browser.pause(1000);
    return element;
  }
}
