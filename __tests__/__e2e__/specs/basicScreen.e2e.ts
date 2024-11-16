describe('BasicScreen', () => {
  it('시작 메시지를 표시하고 버튼을 누르면 업데이트해야 합니다.', async () => {
    await browser.waitUntil(async () => {
      try {
        const element = await browser.$("~message-text");
        return await element.isDisplayed();
      } catch (error) {
        return false;
      }
    }, {
      timeout: 90000,
      timeoutMsg: 'message-text 요소를 찾을 수 없습니다.',
    });

    // 초기 웰컴 메시지 확인
    const messageText = await browser.$('~message-text');
    await expect(messageText).toHaveText('Welcome!');

    // 업데이트 버튼 클릭
    const updateButton = await browser.$("~update-button");
    await updateButton.click();

    // 업데이트된 메시지 확인
    await expect(messageText).toHaveText('정상 TEXT');
  });

  it('이름을 입력하고 확인해야 합니다.', async () => {
    const nameInput = await browser.$('~name-input');
    await nameInput.waitForDisplayed({ timeout: 5000 });

    // 이름 입력
    await nameInput.setValue('홍길동');

    // 입력된 값 확인
    const enteredName = await nameInput.getText(); // getAttribute('value') 대신 getText() 사용
    expect(enteredName).toBe('홍길동');
  });

  it('성별 라디오 버튼을 선택하고 확인해야 합니다.', async () => {
    let genderMale = await browser.$('~gender-male');
    let genderFemale = await browser.$('~gender-female');
    let genderOther = await browser.$('~gender-other');

    // 초기 상태 확인 (모두 선택되지 않음)
    let isSelectedMale = await genderMale.getAttribute('selected');
    let isSelectedFemale = await genderFemale.getAttribute('selected');
    let isSelectedOther = await genderOther.getAttribute('selected');

    expect(isSelectedMale).toBe('false');
    expect(isSelectedFemale).toBe('false');
    expect(isSelectedOther).toBe('false');

    // 'Male' 선택
    await genderMale.click();
    await browser.pause(500);

    // 요소를 다시 찾기
    genderMale = await browser.$('~gender-male');
    genderFemale = await browser.$('~gender-female');
    genderOther = await browser.$('~gender-other');

    isSelectedMale = await genderMale.getAttribute('selected');
    isSelectedFemale = await genderFemale.getAttribute('selected');
    isSelectedOther = await genderOther.getAttribute('selected');

    expect(isSelectedMale).toBe('true');
    expect(isSelectedFemale).toBe('false');
    expect(isSelectedOther).toBe('false');

    // 'Female' 선택
    await genderFemale.click();
    await browser.pause(500);

    // 요소를 다시 찾기
    genderMale = await browser.$('~gender-male');
    genderFemale = await browser.$('~gender-female');
    genderOther = await browser.$('~gender-other');

    isSelectedMale = await genderMale.getAttribute('selected');
    isSelectedFemale = await genderFemale.getAttribute('selected');
    isSelectedOther = await genderOther.getAttribute('selected');

    expect(isSelectedMale).toBe('false');
    expect(isSelectedFemale).toBe('true');
    expect(isSelectedOther).toBe('false');

    // 'Other' 선택
    await genderOther.click();
    await browser.pause(500);

    // 요소를 다시 찾기
    genderMale = await browser.$('~gender-male');
    genderFemale = await browser.$('~gender-female');
    genderOther = await browser.$('~gender-other');

    isSelectedMale = await genderMale.getAttribute('selected');
    isSelectedFemale = await genderFemale.getAttribute('selected');
    isSelectedOther = await genderOther.getAttribute('selected');

    expect(isSelectedMale).toBe('false');
    expect(isSelectedFemale).toBe('false');
    expect(isSelectedOther).toBe('true');
  });

  it('동의 체크박스를 토글 언토글하고 확인해야 합니다.', async () => {
    // 동의 체크박스 요소 찾기
    const agreeCheckbox = await browser.$('~agree-checkbox');
  
    // 체크박스가 표시될 때까지 기다림
    await agreeCheckbox.waitForDisplayed({ timeout: 5000 });
  
    // 초기 상태 확인 (선택되지 않음)
    let isChecked = await agreeCheckbox.getAttribute('checked');
    expect(isChecked).toBe('false');
  
    // 체크박스 토글 (선택)
    await agreeCheckbox.click();
    await browser.pause(500);
  
    // 상태 확인 (선택됨)
    isChecked = await agreeCheckbox.getAttribute('checked');
    expect(isChecked).toBe('true');
  
    // 체크박스 다시 토글 (선택 해제)
    await agreeCheckbox.click();
    await browser.pause(500);
    
    // 상태 확인 (선택되지 않음)
    isChecked = await agreeCheckbox.getAttribute('checked');
    expect(isChecked).toBe('false');
  });
});