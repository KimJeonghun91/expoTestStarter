import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import BasicScreen from '../../app/(tabs)/index';

/* 
*  // * testID 대신 accessibilityLabel 사용
*  const { getByLabelText, getByTestId } = render(<BasicScreen />);
*  getByLabelText (o) , getByTestId (x)
*/ 


describe('BasicScreen Unit Tests', () => {
  // Test: Verify the welcome text is rendered correctly
  test('환영 텍스트가 올바르게 렌더링 되는지 확인', () => {
    const { getByText } = render(<BasicScreen />);
    expect(getByText('Welcome!')).toBeTruthy();
  });

  // Test: Verify the message updates when the button is pressed
  test('버튼 클릭 시 메시지가 업데이트되는지 확인', () => {
    const { getByLabelText, getByText } = render(<BasicScreen />);
    const button = getByLabelText('update-button');

    // Verify initial message
    expect(getByText('Welcome!')).toBeTruthy();

    // Click the update button
    fireEvent.press(button);

    // Verify updated message
    expect(getByText('정상 TEXT')).toBeTruthy();
  });

  // Test: Verify that entering text in the TextInput updates the state correctly
  test('이름 입력 시 TextInput의 값이 업데이트 되는지 확인', () => {
    const { getByLabelText } = render(<BasicScreen />);
    const nameInput = getByLabelText('name-input');

    // Simulate user typing '홍길동' into the TextInput
    fireEvent.changeText(nameInput, '홍길동');

    // Verify that the TextInput's value has been updated
    expect(nameInput.props.value).toBe('홍길동');
  });

  // Test: Verify selecting each gender radio button updates the state correctly
  describe('성별 라디오 버튼 테스트', () => {
    test('남성 라디오 버튼 선택 시 상태가 업데이트 되는지 확인', () => {
      const { getByLabelText } = render(<BasicScreen />);
      const genderMale = getByLabelText('gender-male');
      const genderFemale = getByLabelText('gender-female');
      const genderOther = getByLabelText('gender-other');

      // Initially, no radio button should be selected
      expect(genderMale.props.accessibilityState?.selected).toBe(false);
      expect(genderFemale.props.accessibilityState?.selected).toBe(false);
      expect(genderOther.props.accessibilityState?.selected).toBe(false);

      // Select 'Male'
      fireEvent.press(genderMale);

      // Verify 'Male' is selected and others are not
      expect(genderMale.props.accessibilityState?.selected).toBe(true);
      expect(genderFemale.props.accessibilityState?.selected).toBe(false);
      expect(genderOther.props.accessibilityState?.selected).toBe(false);
    });

    test('여성 라디오 버튼 선택 시 상태가 업데이트 되는지 확인', () => {
      const { getByLabelText } = render(<BasicScreen />);
      const genderMale = getByLabelText('gender-male');
      const genderFemale = getByLabelText('gender-female');
      const genderOther = getByLabelText('gender-other');

      // Select 'Female'
      fireEvent.press(genderFemale);

      // Verify 'Female' is selected and others are not
      expect(genderMale.props.accessibilityState?.selected).toBe(false);
      expect(genderFemale.props.accessibilityState?.selected).toBe(true);
      expect(genderOther.props.accessibilityState?.selected).toBe(false);
    });

    test('기타 라디오 버튼 선택 시 상태가 업데이트 되는지 확인', () => {
      const { getByLabelText } = render(<BasicScreen />);
      const genderMale = getByLabelText('gender-male');
      const genderFemale = getByLabelText('gender-female');
      const genderOther = getByLabelText('gender-other');

      // Select 'Other'
      fireEvent.press(genderOther);

      // Verify 'Other' is selected and others are not
      expect(genderMale.props.accessibilityState?.selected).toBe(false);
      expect(genderFemale.props.accessibilityState?.selected).toBe(false);
      expect(genderOther.props.accessibilityState?.selected).toBe(true);
    });
  });

  // Test: Verify toggling the agreement checkbox updates the state correctly
  test('동의 체크박스를 토글하고 상태가 업데이트 되는지 확인', () => {
    const { getByLabelText } = render(<BasicScreen />);
    const agreeCheckbox = getByLabelText('agree-checkbox');

    // Initially, the checkbox should not be checked
    expect(agreeCheckbox.props.accessibilityState?.checked).toBe(false);

    // Check the checkbox
    fireEvent.press(agreeCheckbox);
    expect(agreeCheckbox.props.accessibilityState?.checked).toBe(true);

    // Uncheck the checkbox
    fireEvent.press(agreeCheckbox);
    expect(agreeCheckbox.props.accessibilityState?.checked).toBe(false);
  });

  // Test: Verify entering text, selecting radio buttons, and toggling checkbox together
  test('모든 입력 필드를 올바르게 조작하는지 통합 테스트', () => {
    const { getByLabelText, getByText } = render(<BasicScreen />);
    const nameInput = getByLabelText('name-input');
    const genderMale = getByLabelText('gender-male');
    const agreeCheckbox = getByLabelText('agree-checkbox');
    const button = getByLabelText('update-button');

    // Enter name
    fireEvent.changeText(nameInput, '홍길동');
    expect(nameInput.props.value).toBe('홍길동');

    // Select 'Male'
    fireEvent.press(genderMale);
    expect(genderMale.props.accessibilityState?.selected).toBe(true);

    // Check the agreement checkbox
    fireEvent.press(agreeCheckbox);
    expect(agreeCheckbox.props.accessibilityState?.checked).toBe(true);

    // Click the update button
    fireEvent.press(button);

    // Verify the message updates
    expect(getByText('정상 TEXT')).toBeTruthy();
  });
});