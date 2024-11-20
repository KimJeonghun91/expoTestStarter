import { ERROR_MSG } from "@/constants/msg";
import { advanceScreenHelper } from "../helper/screen/AdvanceScreenHelper";
import { gestureUtils } from "../helper/GestureUtils";

describe('AdvanceScreen', () => {
  beforeEach(async () => {
    // AdvanceScreen 탭 버튼 찾기
    await advanceScreenHelper.pressAdvanceTab();
  });

  it('사용자 ID 또는 비밀번호가 비어있을 때 로그인 시 에러 메시지를 표시해야 합니다', async () => {

    // 가려진 input창을 찾기 위해 스크롤
    await browser.pause(1000);
    await gestureUtils.swipe({ direction: 'up', distanceLevel: 5 });
    await browser.pause(1000);

    // ID와 비밀번호 모두가 비어있는 경우
    await advanceScreenHelper.performLogin('', '');
    await advanceScreenHelper.verifyLoginErrorMessage(ERROR_MSG.REQUIRED_ID_AND_PASSWORD);

    // ID만 비어있는 경우
    await advanceScreenHelper.performLogin('', 'password');
    await advanceScreenHelper.verifyLoginErrorMessage(ERROR_MSG.REQUIRED_ID);

    // 비밀번호만 비어있는 경우
    await advanceScreenHelper.performLogin('userid', '');
    await advanceScreenHelper.verifyLoginErrorMessage(ERROR_MSG.REQUIRED_PASSWORD);
  });

  it('잘못된 아이디로 로그인 시 에러 메시지를 표시해야 합니다', async () => {
    await advanceScreenHelper.performLogin('wrongid', 'wrongpassword');
    await advanceScreenHelper.verifyLoginErrorMessage(ERROR_MSG.ID_NOT_FOUND);
  });

  it('잘못된 비밀번호로 로그인 시 에러 메시지를 표시해야 합니다', async () => {
    await advanceScreenHelper.performLogin('kjh1234', 'wrongpassword');
    await advanceScreenHelper.verifyLoginErrorMessage(ERROR_MSG.PASSWORD_INCORRECT);
  });

  it('올바른 자격 증명으로 로그인해야 합니다', async () => {
    await advanceScreenHelper.performLogin('kjh1234', 'sfjAelskdf@lsd');
    await advanceScreenHelper.verifyLoginErrorMessage(ERROR_MSG.LOGIN_SUECCESS);
  });
});