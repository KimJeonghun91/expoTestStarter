import React, { useState } from 'react';
import { Button, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AC_LABELS } from '@/constants/AccessibilityLabels';
import { SafeUser } from '@/server/api/types/user';
import { userService } from '@/server/api/services/userService';
import { ERROR_MSG } from '@/constants/msg';

interface LoginState {
  userId: string;
  userPw: string;
  isLoading: boolean;
  currentUser: SafeUser | null;
  errorMessage: string;
}

export default function AdvanceScreen() {
  const [state, setState] = useState<LoginState>({
    userId: '',
    userPw: '',
    isLoading: false,
    currentUser: null,
    errorMessage: '',
  });

  const updateState = (updates: Partial<LoginState>) => {
    setState(prev => ({ ...prev, ...updates }));
  };

  const validateInputs = (): boolean => {
    if (!state.userId.trim() && !state.userPw.trim()) {
      updateState({ errorMessage: ERROR_MSG.REQUIRED_ID_AND_PASSWORD });
      return false;
    } else if (!state.userId.trim()) {
      updateState({ errorMessage: ERROR_MSG.REQUIRED_ID });
      return false;
    } else if (!state.userPw.trim()) {
      updateState({ errorMessage: ERROR_MSG.REQUIRED_PASSWORD });
      return false;
    }
    updateState({ errorMessage: '' }); // 모든 입력이 정상적이면 에러 메시지 초기화
    return true;
  };

  const handleLogin = async (): Promise<void> => {
    if (!validateInputs()) return;

    try {
      updateState({ isLoading: true, errorMessage: '' });

      const result = await userService.userLogin(state.userId, state.userPw);

      if (result.success && result.user) {
        updateState({
          currentUser: result.user,
          userId: '',
          userPw: '',
          errorMessage: '로그인 성공',
        });
      } else {
        updateState({ errorMessage: result.message });
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '로그인 처리 중 오류가 발생했습니다.';
      updateState({ errorMessage });
    } finally {
      updateState({ isLoading: false });
    }
  };

  return (
    <SafeAreaView edges={['top']}>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <View style={styles.titleContainer}>
          <ThemedText type="title">Advance</ThemedText>
          <ThemedText>로그인 예제 입니다.</ThemedText>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="아이디를 입력해주세요."
            value={state.userId}
            onChangeText={(userId) => updateState({ userId })}
            autoCapitalize="none"
            autoCorrect={false}
            accessibilityLabel={AC_LABELS.ADVANCE_INPUT_USER_ID}
            accessible
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="비밀번호를 입력해주세요."
            secureTextEntry
            value={state.userPw}
            onChangeText={(userPw) => updateState({ userPw })}
            autoCapitalize="none"
            autoCorrect={false}
            accessibilityLabel={AC_LABELS.ADVANCE_INPUT_USER_PW}
            accessible
          />
        </View>

        <View style={styles.inputContainer}>
          <Button
            title={state.isLoading ? "처리중..." : "로그인"}
            onPress={handleLogin}
            disabled={state.isLoading}
            accessibilityLabel={AC_LABELS.ADVANCE_BUTTON_LOGIN}
          />
        </View>

        {state.errorMessage ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText} accessibilityLabel={AC_LABELS.ERROR_MESSAGE_LOGIN} accessible>{state.errorMessage}</Text>
          </View>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    gap: 5,
    marginBottom: 30,
  },
  inputContainer: {
    marginVertical: 8,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  errorContainer: {
    marginTop: 15,
    padding: 10,
    backgroundColor: '#ffebee',
    borderRadius: 4,
  },
  errorText: {
    color: '#d32f2f',
    textAlign: 'center',
  },
});
