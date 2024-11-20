import { AC_LABELS } from "@/constants/AccessibilityLabels";
import VerifyUtils from "../VerifyUtils";

class AdvanceScreenHelper extends VerifyUtils {
  public async performLogin(id: string, password: string) {
    await this.setElementValue({ selector: AC_LABELS.ADVANCE_INPUT_USER_ID, value: id });
    await this.setElementValue({ selector: AC_LABELS.ADVANCE_INPUT_USER_PW, value: password });
    await this.waitAndClick({ selector: AC_LABELS.ADVANCE_BUTTON_LOGIN });
    await browser.pause(1000);
  }

  public async verifyLoginErrorMessage(expectedMsg: string) {
    await this.verifyText({ selector: AC_LABELS.ERROR_MESSAGE_LOGIN, expectedMsg: expectedMsg });
    await browser.pause(1000);
  }

  public async pressAdvanceTab() {
    await this.waitAndClick({ selector: AC_LABELS.ADVANCE_TAB });
  }
}

export const advanceScreenHelper = new AdvanceScreenHelper();