import { AC_LABELS } from "@/constants/AccessibilityLabels";
import { ERROR_MSG } from "@/constants/msg";
import utils from "../helper/browserElementUtils";

describe('AdvanceScreen', () => {
  beforeEach(async () => {
    // AdvanceScreen 탭 버튼 찾기
    await utils.waitAndClick({ selector: AC_LABELS.ADVANCE_TAB });
  });

  it('사용자 ID 또는 비밀번호가 비어있을 때 로그인 시 에러 메시지를 표시해야 합니다', async () => {

    // ID와 비밀번호 모두가 비어있는 경우
    await utils.setElementValue({ selector: AC_LABELS.ADVANCE_INPUT_USER_ID, value: '' });
    await utils.setElementValue({ selector: AC_LABELS.ADVANCE_INPUT_USER_PW, value: '' });
    await utils.waitAndClick({ selector: AC_LABELS.ADVANCE_BUTTON_LOGIN });
    await browser.pause(1000);

    // * 검증
    await utils.verifyText({selector: AC_LABELS.ERROR_MESSAGE_LOGIN, expectedMsg: ERROR_MSG.REQUIRED_ID_AND_PASSWORD});
    await browser.pause(1000);

    // ID만 비어있는 경우
    await utils.setElementValue({ selector: AC_LABELS.ADVANCE_INPUT_USER_ID, value: '' });
    await utils.setElementValue({ selector: AC_LABELS.ADVANCE_INPUT_USER_PW, value: 'password' });
    await utils.waitAndClick({ selector: AC_LABELS.ADVANCE_BUTTON_LOGIN });
    await browser.pause(1000);

    // * 검증
    await utils.verifyText({selector: AC_LABELS.ERROR_MESSAGE_LOGIN, expectedMsg: ERROR_MSG.REQUIRED_ID});
    await browser.pause(1000);

    // 비밀번호만 비어있는 경우
    await utils.setElementValue({ selector: AC_LABELS.ADVANCE_INPUT_USER_ID, value: 'userid' });
    await utils.setElementValue({ selector: AC_LABELS.ADVANCE_INPUT_USER_PW, value: '' });
    await utils.waitAndClick({ selector: AC_LABELS.ADVANCE_BUTTON_LOGIN });
    await browser.pause(1000);

    // * 검증
    await utils.verifyText({selector: AC_LABELS.ERROR_MESSAGE_LOGIN, expectedMsg: ERROR_MSG.REQUIRED_PASSWORD});
    await browser.pause(1000);
  });


  it('잘못된 아이디로 로그인 시 에러 메시지를 표시해야 합니다', async () => {
    await utils.setElementValue({ selector: AC_LABELS.ADVANCE_INPUT_USER_ID, value: 'wrongid' });
    await utils.setElementValue({ selector: AC_LABELS.ADVANCE_INPUT_USER_PW, value: 'wrongpassword' });
    await utils.waitAndClick({ selector: AC_LABELS.ADVANCE_BUTTON_LOGIN });
    await browser.pause(1000);

    // * 검증
    await utils.verifyText({selector: AC_LABELS.ERROR_MESSAGE_LOGIN, expectedMsg: ERROR_MSG.ID_NOT_FOUND});
    await browser.pause(1000);
  });

  it('잘못된 비밀번호로 로그인 시 에러 메시지를 표시해야 합니다', async () => {
    await utils.setElementValue({ selector: AC_LABELS.ADVANCE_INPUT_USER_ID, value: 'kjh1234' });
    await utils.setElementValue({ selector: AC_LABELS.ADVANCE_INPUT_USER_PW, value: 'wrongpassword' });
    await utils.waitAndClick({ selector: AC_LABELS.ADVANCE_BUTTON_LOGIN });
    await browser.pause(1000);

    // * 검증
    await utils.verifyText({selector: AC_LABELS.ERROR_MESSAGE_LOGIN, expectedMsg: ERROR_MSG.PASSWORD_INCORRECT});
    await browser.pause(1000);
  });

  it('올바른 자격 증명으로 로그인해야 합니다', async () => {
    await utils.setElementValue({ selector: AC_LABELS.ADVANCE_INPUT_USER_ID, value: 'kjh1234' });
    await utils.setElementValue({ selector: AC_LABELS.ADVANCE_INPUT_USER_PW, value: 'sfjAelskdf@lsd' });
    await utils.waitAndClick({ selector: AC_LABELS.ADVANCE_BUTTON_LOGIN });
    await browser.pause(1000);

    // * 검증
    await utils.verifyText({selector: AC_LABELS.ERROR_MESSAGE_LOGIN, expectedMsg: ERROR_MSG.LOGIN_SUECCESS});
    await browser.pause(1000);
  });
});